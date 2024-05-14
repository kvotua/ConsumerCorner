import os
import uuid
from contextlib import asynccontextmanager
from typing import Annotated, AsyncIterator, NewType

from bcrypt import gensalt, hashpw
from fastapi import Body, FastAPI, HTTPException, Response, Security, status
from fastapi_jwt import (
    JwtAccessBearerCookie,
    JwtAuthorizationCredentials,
    JwtRefreshBearerCookie,
)
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


class AuthSchema(BaseModel):
    email: EmailStr
    password: str


class UserRegisterSchema(BaseModel):
    email: EmailStr
    name: str
    surname: str
    password: str


class RefreshTokenSchema(BaseModel):
    refresh_token: RefreshToken


class AccessTokenSchema(BaseModel):
    access_token: AccessToken


class TokenPairSchema(RefreshTokenSchema, AccessTokenSchema):
    pass


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
access_security = JwtAccessBearerCookie(secret_key=JWT_SECRET)
refresh_security = JwtRefreshBearerCookie(secret_key=JWT_SECRET)


def email_exist(email: str) -> bool:
    result = UserModel.scan(UserModel.email.value == email, limit=1)  # type: ignore
    return len(list(result)) > 0


@app.post(
    "/users",
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
    subject = {"id": model.id}
    refresh_token = access_security.create_refresh_token(subject)
    access_token = access_security.create_access_token(subject)
    refresh_security.set_refresh_cookie(response, refresh_token)
    access_security.set_access_cookie(response, access_token)
    return TokenPairSchema(refresh_token=refresh_token, access_token=access_token)


@app.post(
    "/auth/refresh",
    tags=["Auth"],
)
async def post_auth_refresh(
    response: Response,
    credentials: JwtAuthorizationCredentials = Security(refresh_security),
) -> AccessTokenSchema:
    access_token = access_security.create_access_token(credentials.subject)
    access_security.set_access_cookie(response, access_token)
    return AccessTokenSchema(access_token=access_token)
