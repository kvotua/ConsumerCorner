import os
import qrcode
import qrcode.image.svg
import uuid
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, RedirectResponse
from fastapi_limiter import FastAPILimiter
from app.models import (
    ProprietorID,
    PointID,
    Token,
    CommentBase,
    Comment,
    ProprietorBase,
    PointUpdate,
    PointBase,
    Point,
    Proprietor,
    ProprietorUpdate,
)
from app.database import (
    proprietors_collection,
    points_collection,
    comments_collection,
    redis_database,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await FastAPILimiter.init(redis_database)
    yield


debug_mode = os.getenv("DEBUG") is not None
app = FastAPI(lifespan=lifespan, debug=debug_mode)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CODE_EXPIRES_SECONDS = 60 * 15


@app.post("/comments", tags=["Comments"])
async def post_comment(comment: CommentBase) -> None:
    point = points_collection.find_one({"id": comment.pointID})
    if point is None:
        raise HTTPException(status_code=404, detail="Wrong pointID")
    comment = Comment(**comment.model_dump())
    comments_collection.insert_one(comment.model_dump())


@app.get("/comments/by/pointID", tags=["Comments"])
async def get_comments(token: Token, pointID: PointID) -> list[Comment]:
    proprietorID = await redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    point = points_collection.find_one({"id": pointID})
    if point is None:
        raise HTTPException(status_code=404, detail="Wrong pointID")
    point = Point(**point)
    if point.owner != proprietorID:
        raise HTTPException(status_code=403)
    comments = comments_collection.find({"pointID": point.id})
    comments = [Comment(**x) for x in comments]
    return comments


@app.post("/points", tags=["Points"])
async def post_point(token: Token, point: PointBase) -> None:
    proprietorID = await redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    point = Point(**point.model_dump(), owner=proprietorID)
    points_collection.insert_one(point.model_dump())
    proprietors_collection.update_one(
        {"id": proprietorID}, {"$push": {"points_id": point.id}}
    )


@app.get("/points/{pointID}/qr", tags=["Points"])
async def get_point_qr(pointID: PointID) -> Response:
    data = qrcode.make(
        f"http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai/points/{pointID}",
        image_factory=qrcode.image.svg.SvgImage,
    ).to_string(encoding="unicode")
    return Response(content=data, media_type="image/svg+xml")


@app.delete("/points", tags=["Points"])
async def delete_point(token: Token, pointID: PointID) -> None:
    proprietorID = await redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    p = points_collection.find_one_and_delete({"id": pointID})
    if p is None:
        raise HTTPException(status_code=404, detail="Wrong pointID")
    comments_collection.delete_many({"pointID": pointID})
    proprietors_collection.update_one(
        {"id": proprietorID}, {"$pull": {"points_id": pointID}}
    )


@app.patch("/points", tags=["Points"])
async def patch_point(token: Token, pointID: PointID, updates: PointUpdate) -> None:
    proprietorID = await redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    result = points_collection.update_one(
        {"id": pointID}, {"$set": updates.model_dump(exclude_none=True)}
    )
    if result.matched_count < 1:
        raise HTTPException(status_code=404, detail="Wrong pointID")


@app.get("/points", tags=["Points"])
async def get_point(pointID: PointID) -> Point:
    point = points_collection.find_one({"id": pointID})
    if point is None:
        raise HTTPException(status_code=404, detail="Wrong pointID")
    point = Point(**point)
    return point


@app.patch("/proprietors", tags=["Proprietors"])
async def patch_proprietor(token: Token, updates: ProprietorUpdate) -> None:
    proprietorID = await redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    if updates.phone_number is not None and updates.code is None:
        raise HTTPException(
            status_code=400, detail="Code required for change phone number"
        )
    updates_dict = updates.model_dump(exclude_none=True)
    if updates.phone_number is not None:
        code = codes_collection.find_one_and_delete(
            {"phone_number": updates.phone_number,
                "value": updates_dict.pop("code")}
        )
        if code is None:
            raise HTTPException(status_code=400, detail="Wrong code")
    proprietors_collection.update_one(
        {"id": proprietorID}, {"$set": updates_dict})


@app.get("/proprietors/by/id", tags=["Proprietors"])
async def get_proprietor_by_id(proprietorID: ProprietorID) -> Proprietor:
    proprietor = proprietors_collection.find_one({"id": proprietorID})
    if proprietor is None:
        raise HTTPException(status_code=404, detail="Wrong proprietorID")
    proprietor = Proprietor(**proprietor)
    return proprietor


@app.get("/proprietors/by/token", tags=["Proprietors"])
async def get_proprietor(token: Token) -> Proprietor:
    proprietorID = await redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    proprietor = Proprietor(
        **proprietors_collection.find_one({"id": proprietorID}))
    return proprietor


@app.post("/proprietors", tags=["Proprietors"])
async def post_proprietor(proprietor: ProprietorBase) -> Token:
    p = proprietors_collection.find_one(
        {"login": proprietor.login})
    if p is not None:
        raise HTTPException(
            status_code=400, detail="Login already in use")
    proprietor = Proprietor(**proprietor.model_dump())
    proprietors_collection.insert_one(proprietor.model_dump())
    token = str(uuid.uuid4())
    await redis_database.set(f"id:{proprietor.id}", token)
    await redis_database.set(f"token:{token}", proprietor.id)
    return token


@app.get("/proprietors/token", tags=["Proprietors"])
async def get_proprietor_token(login: str, password: str) -> Token:
    proprietor = proprietors_collection.find_one(
        {"login": login, "password": password})
    if proprietor is None:
        raise HTTPException(status_code=404, detail="Wrong login or password")
    proprietor = Proprietor(**proprietor)
    token = str(uuid.uuid4())
    await redis_database.set(f"id:{proprietor.id}", token)
    await redis_database.set(f"token:{token}", proprietor.id)
    return token


@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse("/docs")
