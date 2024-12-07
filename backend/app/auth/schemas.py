from typing import NewType, Annotated

from pydantic import BaseModel,Field


RefreshToken = NewType("RefreshToken", str)
AccessToken = NewType("AccessToken", str)


class Phone(BaseModel):
    phone: Annotated[str, Field(
        title='Номер телефона без +',
        examples=['79216547832'],
        min_length=11,
        max_length=14,)]


class VerifePhone(BaseModel):
    phone: Annotated[str, Field(
        title='Номер телефона без +',
        examples=['79216547832'],
        min_length=11,
        max_length=14)]
    phone_verif: Annotated[bool, Field(
        title='Верифицирован ли телефон',
        examples=[True],)]


class Register(Phone):
    fio: Annotated[str, Field(
        title='ФИО пользователя',
        examples=['Игнатьев Алексей Алиевич'],)]
    password: Annotated[str, Field(
        title='Пароль',
        examples=['password'],)]

class Login(Phone):
    password: Annotated[str, Field(
        title='Пароль',
        examples=['password'],)]


class AccessTokenInfo(BaseModel):
    access_token: Annotated[str, Field(
        title='Access JWT токен',
        examples=['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'],
    )]
    token_type: Annotated[str, Field(
        title='Тип токена',
        examples=['Baerer']
    )]


class ReqID(BaseModel):
    req_id: Annotated[str, Field(
        title='ID сессии, полученный после отправки номера',
        examples=['79442f1f-17a8-42bb-9f6f-4affc8788e7e'],
        min_length=36,
        max_length=36,)]


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "Baerer"