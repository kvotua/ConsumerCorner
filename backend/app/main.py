import os
import time
import uuid
from contextlib import asynccontextmanager
from typing import Annotated, AsyncIterator, NewType

import jwt
from bcrypt import gensalt, hashpw
from fastapi import Body, Depends, FastAPI, HTTPException, Response, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr
from pynamodb.attributes import BooleanAttribute, MapAttribute, UnicodeAttribute
from pynamodb.models import Model

RefreshToken = NewType("RefreshToken", str)
AccessToken = NewType("AccessToken", str)
UserId = NewType("UserId", str)


class EmailSchema(BaseModel):
    value: EmailStr
    verified: bool


class UserSchema(BaseModel):
    id: UserId
    email: EmailSchema
    name: str
    surname: str


class UserRegisterSchema(BaseModel):
    email: EmailStr
    name: str
    surname: str
    password: str


class TokenPairSchema(BaseModel):
    refresh_token: RefreshToken
    access_token: AccessToken


class RefreshTokenSchema(BaseModel):
    refresh_token: RefreshToken


class AccessTokenSchema(BaseModel):
    access_token: AccessToken


class EmailModel(MapAttribute):
    value = UnicodeAttribute()
    verified = BooleanAttribute()


class UserModel(Model):
    class Meta:
        table_name = "User"
        region = "dummy"
        host = "http://dynamodb:8000"
        aws_access_key_id = "dummy"
        aws_secret_access_key = "dummy"

    id = UnicodeAttribute(hash_key=True)
    email = EmailModel()
    name = UnicodeAttribute()
    surname = UnicodeAttribute()
    password = UnicodeAttribute()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator:
    for table in (UserModel,):
        if test and table.exists():
            table.delete_table()
        if not table.exists():
            table.create_table(
                wait=True,
                read_capacity_units=1,
                write_capacity_units=1,
                billing_mode="PAY_PER_REQUEST",
            )
    yield


JWT_SECRET = "secret"
debug = os.getenv("DEBUG") is not None
test = os.getenv("TEST") is not None
app = FastAPI(debug=debug, lifespan=lifespan)
security = HTTPBearer()


def email_exist(email: str) -> bool:
    result = UserModel.scan(UserModel.email.value == email, limit=1)  # type: ignore
    return len(list(result)) > 0


def generate_token(user_id: UserId, expiration_delta: int) -> str:
    return jwt.encode(
        {
            "sub": user_id,
            "iat": int(time.time()),
            "exp": int(time.time()) + expiration_delta,
        },
        JWT_SECRET,
    )


def generate_refresh_token(user_id: UserId) -> str:
    return generate_token(user_id, 60 * 60 * 24 * 30)


def generate_access_token(user_id: UserId) -> str:
    return generate_token(user_id, 60 * 60)


@app.post(
    "/users/register",
    tags=["Users"],
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_409_CONFLICT: {},
    },
)
async def post_users_register(
    response: Response,
    user: Annotated[UserRegisterSchema, Body(embed=True)],
) -> TokenPairSchema:
    if email_exist(user.email):
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already in use")
    model = UserModel(
        str(uuid.uuid4()),
        email=EmailModel(value=user.email, verified=False),
        name=user.name,
        surname=user.surname,
        password=hashpw(user.password.encode(), gensalt()).decode(),
    )
    model.save()
    return TokenPairSchema(
        refresh_token=generate_refresh_token(UserId(model.id)),
        access_token=generate_access_token(UserId(model.id)),
    )


@app.post(
    "/auth/access",
    responses={
        status.HTTP_401_UNAUTHORIZED: {},
    },
)
async def post_auth_access(
    refresh_token: Annotated[HTTPAuthorizationCredentials, Depends(security)],
) -> AccessTokenSchema:
    try:
        decoded: dict = jwt.decode(
            refresh_token.credentials, JWT_SECRET, algorithms=["HS256"]
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Expired")
    except jwt.InvalidSignatureError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid signature")
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid token")
    user_id = decoded.get("sub")
    if user_id is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Wrong format")
    return AccessTokenSchema(access_token=generate_access_token(user_id))
