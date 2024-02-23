import os
import random
import uuid
from contextlib import asynccontextmanager
from typing import Annotated

import qrcode
import qrcode.image.svg
from app.database import (
    comments_collection,
    points_collection,
    proprietors_collection,
    redis_database,
)
from app.models import (
    Comment,
    CommentBase,
    Point,
    PointBase,
    PointID,
    PointUpdate,
    Proprietor,
    ProprietorBase,
    ProprietorID,
    ProprietorUpdate,
    Token,
)
from fastapi import FastAPI, HTTPException, Query, status, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse, Response
from fastapi_limiter import FastAPILimiter
import smtplib
from email.message import EmailMessage


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Startup
    await FastAPILimiter.init(redis_database)

    yield

    # Shutdown
    ...


debug_mode = os.getenv("DEBUG") is not None
app = FastAPI(lifespan=lifespan, debug=debug_mode)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


POINT_PRICE = 100 * 100
password_codes = {}


async def proprietorID_by_token(token: Token) -> ProprietorID:
    proprietorID = await redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wrong token")
    return ProprietorID(proprietorID)


def point_exist(pointID: PointID) -> bool:
    return points_collection.find_one({"id": pointID}) is not None


def point_by_id(pointID: PointID) -> Point:
    point = points_collection.find_one({"id": pointID})
    if point is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Wrong pointID"
        )
    return Point(**point)


def comments_by_pointID(pointID: PointID) -> list[Comment]:
    comments = comments_collection.find({"pointID": pointID})
    return [Comment(**x) for x in comments]


def proprietor_by_id(proprietorID: ProprietorID) -> Proprietor:
    proprietor_model = proprietors_collection.find_one({"id": proprietorID})
    if proprietor_model is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Proprietor not exist",
        )
    return Proprietor(**proprietor_model)


async def proprietor_by_token(token: Token) -> Proprietor:
    proprietorID = await proprietorID_by_token(token)
    return proprietor_by_id(proprietorID)


@app.post("/comments", tags=["Comments"])
async def post_comment(comment: CommentBase) -> None:
    if not point_exist(comment.pointID):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Wrong pointID"
        )
    comment = Comment(**comment.model_dump())
    comments_collection.insert_one(comment.model_dump())


@app.get("/comments/by/pointID", tags=["Comments"])
async def get_comments(token: Token, pointID: PointID) -> list[Comment]:
    proprietorID = await proprietorID_by_token(token)
    point = point_by_id(pointID)
    if point.owner != proprietorID:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Only owner can read comments"
        )
    return comments_by_pointID(pointID)


@app.post("/points", tags=["Points"])
async def post_point(token: Token, point: PointBase) -> None:
    proprietor = await proprietor_by_token(token)
    if proprietor.balance < POINT_PRICE:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Insufficient funds"
        )
    point = Point(**point.model_dump(), owner=proprietor.id)
    points_collection.insert_one(point.model_dump())
    proprietors_collection.update_one(
        {"id": proprietor.id},
        {"$push": {"points_id": point.id}, "$inc": {"balance": -POINT_PRICE}},
    )


@app.post("/files", tags=["Files"])
async def post_file(file: UploadFile) -> str:
    file.filename = str(uuid.uuid4())
    with open(f"/files/{file.filename}", "wb") as f:
        f.write(await file.read())
    return file.filename


@app.get("/files/{id}", tags=["Files"])
async def get_file(id: str) -> FileResponse:
    return FileResponse(f"/files/{id}")


@app.get("/points/{pointID}/qr", tags=["Points"])
async def get_point_qr(pointID: PointID) -> Response:
    if not point_exist(pointID):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Wrong pointID"
        )
    data = qrcode.make(
        f"http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai/point/{pointID}",
        image_factory=qrcode.image.svg.SvgImage,
    ).to_string(encoding="unicode")
    return Response(content=data, media_type="image/svg+xml")


@app.delete("/points", tags=["Points"])
async def delete_point(token: Token, pointID: PointID) -> None:
    if not point_exist(pointID):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Wrong pointID"
        )
    proprietorID = await proprietorID_by_token(token)
    if points_collection.find_one({"id": pointID, "owner": proprietorID}) is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Only owner can delete point"
        )
    comments_collection.delete_many({"pointID": pointID})
    proprietors_collection.update_one(
        {"id": proprietorID}, {"$pull": {"points_id": pointID}}
    )


@app.patch("/points", tags=["Points"])
async def patch_point(token: Token, pointID: PointID, updates: PointUpdate) -> None:
    proprietorID = await proprietorID_by_token(token)
    result = points_collection.update_one(
        {"id": pointID, "owner": proprietorID},
        {
            "$set": updates.model_dump(
                exclude_none=True,
                exclude={
                    "license_file_ids_append",
                    "license_file_ids_delete",
                    "accreditation_file_ids_append",
                    "accreditation_file_ids_delete",
                },
            ),
        },
    )
    if result.matched_count < 1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Wrong pointID"
        )
    points_collection.update_one(
        {"id": pointID, "owner": proprietorID},
        {
            "$push": {
                "license_file_ids": {"$each": updates.license_file_ids_append},
                "accreditation_file_ids": {
                    "$each": updates.accreditation_file_ids_append
                },
            },
        },
    )
    points_collection.update_one(
        {"id": pointID, "owner": proprietorID},
        {
            "$pull": {
                "license_file_ids": {"$in": updates.license_file_ids_delete},
                "accreditation_file_ids": {
                    "$in": updates.accreditation_file_ids_delete
                },
            },
        },
    )


@app.get("/points", tags=["Points"])
async def get_point(pointID: PointID) -> Point:
    return point_by_id(pointID)


@app.patch("/proprietors", tags=["Proprietors"])
async def patch_proprietor(token: Token, updates: ProprietorUpdate) -> None:
    proprietorID = await proprietorID_by_token(token)
    updates_dict = updates.model_dump(exclude_none=True)
    proprietors_collection.update_one({"id": proprietorID}, {"$set": updates_dict})


@app.get("/proprietors/by/id", tags=["Proprietors"])
async def get_proprietor_by_id(proprietorID: ProprietorID) -> Proprietor:
    return proprietor_by_id(proprietorID)


@app.get("/proprietors/by/token", tags=["Proprietors"])
async def get_proprietor_by_token(token: Token) -> Proprietor:
    return await proprietor_by_token(token)


@app.post("/proprietors", tags=["Proprietors"])
async def post_proprietor(proprietor: ProprietorBase) -> Token:
    p = proprietors_collection.find_one({"login": proprietor.login})
    if p is not None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Login already in use"
        )
    proprietor = Proprietor(**proprietor.model_dump())
    proprietors_collection.insert_one(proprietor.model_dump())
    token = str(uuid.uuid4())
    await redis_database.set(f"id:{proprietor.id}", token)
    await redis_database.set(f"token:{token}", proprietor.id)
    return Token(token)


@app.get("/proprietors/token", tags=["Proprietors"])
async def get_proprietor_token(login: str, password: str) -> Token:
    proprietor = proprietors_collection.find_one({"login": login, "password": password})
    if proprietor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Wrong login or password"
        )
    proprietor = Proprietor(**proprietor)
    token = str(uuid.uuid4())
    await redis_database.set(f"id:{proprietor.id}", token)
    await redis_database.set(f"token:{token}", proprietor.id)
    return Token(token)


@app.post("/payments/{proprietorID}", tags=["Payments"])
async def post_payment(
    proprietorID: ProprietorID, value: Annotated[int, Query(gt=0)]
) -> None:
    result = proprietors_collection.update_one(
        {"id": proprietorID}, {"$inc": {"balance": value}}
    )
    if result.matched_count < 1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Wrong proprietorID"
        )


@app.post("/password/reset/{proprietorID}", tags=["Proprietors"])
async def post_password_reset(proprietorID: ProprietorID) -> None:
    proprietor = proprietor_by_id(proprietorID)
    code = password_codes[proprietorID] = random.randrange(10000, 99999)
    message = EmailMessage()
    message.set_content(f"Код для сброса пароля: {code}")
    message["Subject"] = "Сброс пароля"
    message["From"] = "root@xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai"
    message["To"] = proprietor.email

    s = smtplib.SMTP("mailserver")
    s.send_message(message)
    s.quit()


@app.post("/password/change/{proprietorID}", tags=["Proprietors"])
async def post_password_change(
    proprietorID: ProprietorID, code: int, new_password=str
) -> None:
    proprietor = proprietor_by_id(proprietorID)
    if code != password_codes.get(proprietorID, None):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Wrong code")
    password_codes.pop(proprietorID)
    proprietors_collection.update_one(
        {"id": proprietor.id}, {"$set": {"password": new_password}}
    )


@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse("/docs")
