import os
import json
from time import time
import uuid
from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
from pydantic_extra_types.phone_numbers import PhoneNumber
import requests
from app.models import (
    ProprietorID,
    PointID,
    Token,
    Code,
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
    codes_collection,
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
            {"phone_number": updates.phone_number, "value": updates_dict.pop("code")}
        )
        if code is None:
            raise HTTPException(status_code=400, detail="Wrong code")
    proprietors_collection.update_one({"id": proprietorID}, {"$set": updates_dict})


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
    proprietor = Proprietor(**proprietors_collection.find_one({"id": proprietorID}))
    return proprietor


@app.post("/proprietors", tags=["Proprietors"])
async def post_proprietor(proprietor: ProprietorBase, code: str) -> Token:
    p = proprietors_collection.find_one({"phone_number": proprietor.phone_number})
    if p is not None:
        raise HTTPException(status_code=400, detail="Phone number already in use")
    code = codes_collection.find_one_and_delete(
        {"phone_number": proprietor.phone_number, "value": code}
    )
    if code is None:
        raise HTTPException(status_code=400, detail="Wrong phone number or code")
    c = Code(**code)
    if c.expires < int(time()):
        raise HTTPException(status_code=400, detail="Code expired")
    proprietor = Proprietor(**proprietor.model_dump())
    proprietors_collection.insert_one(proprietor.model_dump())
    token = str(uuid.uuid4())
    await redis_database.set(f"id:{proprietor.id}", token)
    await redis_database.set(f"token:{token}", proprietor.id)
    return token


@app.get("/proprietors/token", tags=["Proprietors"])
async def get_proprietor_token(phone_number: PhoneNumber, code: str) -> Token:
    code = codes_collection.find_one_and_delete(
        {"phone_number": phone_number, "value": code}
    )
    if code is None:
        raise HTTPException(status_code=400, detail="Wrong phone number or code")
    c = Code(**code)
    if c.expires < int(time()):
        raise HTTPException(status_code=400, detail="Code expired")
    token = str(uuid.uuid4())
    proprietor = Proprietor(
        **proprietors_collection.find_one({"phone_number": phone_number})
    )
    await redis_database.set(f"id:{proprietor.id}", token)
    await redis_database.set(f"token:{token}", proprietor.id)
    return token


@app.get(
    "/proprietors/verify/phone",
    tags=["Proprietors"],
    dependencies=[Depends(RateLimiter(times=3, minutes=1))],
)
async def get_proprietor_verify_phone(phone_number: PhoneNumber) -> None:
    if os.getenv("DEBUG") is None:
        api_id = os.getenv("SMS_RU_TOKEN")
        if api_id is None:
            value = "0000"
        else:
            number = "".join(filter(lambda x: x.isdigit(), phone_number))
            url = f"https://sms.ru/code/call?phone={number}&ip=-1&api_id={api_id}"
            response = requests.get(url)
            value = json.loads(response.content)["code"]
    else:
        value = "0000"
    code = Code(
        value=str(value),
        expires=int(time()) + CODE_EXPIRES_SECONDS,
        phone_number=phone_number,
    )
    codes_collection.insert_one(code.model_dump())


@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse("/docs")
