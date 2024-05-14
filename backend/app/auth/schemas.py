from typing import NewType

from pydantic import BaseModel, EmailStr

RefreshToken = NewType("RefreshToken", str)
AccessToken = NewType("AccessToken", str)


class AuthSchema(BaseModel):
    email: EmailStr
    password: str


class RefreshTokenSchema(BaseModel):
    refresh_token: RefreshToken


class AccessTokenSchema(BaseModel):
    access_token: AccessToken


class TokenPairSchema(RefreshTokenSchema, AccessTokenSchema):
    pass
