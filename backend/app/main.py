import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic_extra_types.phone_numbers import PhoneNumber
from app.models import (
    ProprietorID,
    PointID,
    Token,
    CommentBase,
    Comment,
    ProprietorBase,
    PointBase,
    Point,
    Proprietor,
)
from app.database import (
    proprietors_collection,
    points_collection,
    comments_collection,
    redis_database,
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

codes: dict[PhoneNumber, str] = {}


@app.post("/comments", tags=["Comment"])
async def post_comment(comment: CommentBase) -> None:
    point = points_collection.find_one({"id": comment.pointID})
    if point is None:
        raise HTTPException(status_code=404, detail="Wrong pointID")
    comment = Comment(**comment.model_dump())
    comments_collection.insert_one(comment.model_dump())


@app.get("/comments/by/pointID", tags=["Comments"])
async def get_comments(token: Token, pointID: PointID) -> list[Comment]:
    proprietorID = redis_database.get(f"token:{token}")
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
    proprietorID = redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    point = Point(**point.model_dump(), owner=proprietorID)
    points_collection.insert_one(point.model_dump())
    proprietors_collection.update_one(
        {"id": proprietorID}, {"$push": {"points_id": point.id}}
    )


@app.get("/points", tags=["Points"])
async def get_point(pointID: PointID) -> Point:
    point = points_collection.find_one({"id": pointID})
    if point is None:
        raise HTTPException(status_code=404, detail="Wrong pointID")
    point = Point(**point)
    return point


@app.get("/proprietors/by/id", tags=["Proprietors"])
async def get_proprietor_by_id(proprietorID: ProprietorID) -> Proprietor:
    proprietor = proprietors_collection.find_one({"id": proprietorID})
    if proprietor is None:
        raise HTTPException(status_code=404, detail="Wrong proprietorID")
    proprietor = Proprietor(**proprietor)
    return proprietor


@app.get("/proprietors/by/token", tags=["Proprietors"])
async def get_proprietor(token: Token) -> Proprietor:
    proprietorID = redis_database.get(f"token:{token}")
    if proprietorID is None:
        raise HTTPException(status_code=404, detail="Wrong token")
    proprietor = Proprietor(**proprietors_collection.find_one({"id": proprietorID}))
    return proprietor


@app.post("/proprietors", tags=["Proprietors"])
async def post_proprietor(proprietor: ProprietorBase, code: str) -> Token:
    stored_code = codes.get(proprietor.phone_number, None)
    if stored_code is None:
        raise HTTPException(status_code=400, detail="Phone number doesn't have code")
    if stored_code != code:
        raise HTTPException(status_code=400, detail="Wrong code")
    codes.pop(proprietor.phone_number)
    proprietor = Proprietor(**proprietor.model_dump())
    proprietors_collection.insert_one(proprietor.model_dump())
    token = str(uuid.uuid4())
    redis_database.set(f"id:{proprietor.id}", token)
    redis_database.set(f"token:{token}", proprietor.id)
    return token


@app.get("/proprietors/token", tags=["Proprietors"])
async def get_proprietor_token(phone_number: PhoneNumber, code: str) -> Token:
    stored_code = codes.get(phone_number, None)
    if stored_code is None:
        raise HTTPException(status_code=400, detail="Phone number doesn't have code")
    if stored_code != code:
        raise HTTPException(status_code=400, detail="Wrong code")
    codes.pop(phone_number)
    token = str(uuid.uuid4())
    proprietor = Proprietor(
        **proprietors_collection.find_one({"phone_number": phone_number})
    )
    redis_database.set(f"id:{proprietor.id}", token)
    redis_database.set(f"token:{token}", proprietor.id)
    return token


@app.get("/proprietors/verify/phone", tags=["Proprietors"])
async def get_proprietor_verify_phone(phone_number: PhoneNumber) -> None:
    # TODO: generate random six-digit code
    code = "000000"
    codes[phone_number] = code
    # TODO: send code via SMS


@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse("/docs")
