from typing import NewType, Annotated

from pydantic import BaseModel, EmailStr, Field
from fastapi import Query

RefreshToken = NewType("RefreshToken", str)
AccessToken = NewType("AccessToken", str)


class Phone(BaseModel):
    phone: Annotated[str, Field(..., title='Номер телефона без +', min_length=11, max_length=14)]


class VerifePhone(BaseModel):
    phone: Annotated[str, Field(..., title='Номер телефона без +', min_length=11, max_length=14)]
    phone_verif: Annotated[bool, Field(..., title='Верифицирован ли телефон')]

class Register(Phone):
    fio: Annotated[str, Field(..., title='ФИО пользователя')]
    password: Annotated[str, Field(..., title='Пароль')]

class Login(Phone):
    password: Annotated[str, Field(..., title='Пароль')]


class AuthSchema(BaseModel):
    email: EmailStr
    password: str


class RefreshTokenSchema(BaseModel):
    refresh_token: RefreshToken


class AccessTokenSchema(BaseModel):
    access_token: AccessToken


class TokenPairSchema(RefreshTokenSchema, AccessTokenSchema):
    pass


class ReqID(BaseModel):
    req_id: Annotated[str, Field(..., title='ID сессии, полученный после отправки номера', min_length=36, max_length=36)]


class GetReqIdWithSMS(BaseModel):
    req_id: Annotated[str, Query(..., title='ID сессии, полученный после отправки номера', min_length=36, max_length=36)]
    sms_code: Annotated[str, Query(..., title='СМС-код, отправленный на номер', min_length=5, max_length=5)]