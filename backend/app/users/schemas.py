from pydantic import BaseModel, Field
from typing import Annotated, Optional


class TokenInfo(BaseModel):
    access_token: str
    token_type: str


class UserSchema(BaseModel):
    id: Annotated[int, Field(
        title="ID пользователя",
        examples=[1],
    )]
    phone: Annotated[str, Field(
        title="Номер телефона пользователя",
        examples=['79211234567'],
        min_length=11,
        max_length=14,
    )]
    fio: Annotated[str, Field(
        title="ФИО пользователя",
        examples=['Игнатьев Алексей Алиевич']
    )]
    email: Annotated[Optional[str], Field(
        title="Электронная почта пользователя",
        examples=['example@gmail.com']
    )]
    verify_phone: Annotated[bool, Field(
        title='Статус подтверждения номера телефона',
        examples=[False],
    )]
    verify_email: Annotated[bool, Field(
        title='Статус подтверждения электронной почты',
        examples=[False],
    )]


class NewUserSchema(BaseModel):
    new_phone: Annotated[str, Field(
        title="Номер телефона пользователя",
        examples=['79211234567'],
        min_length=11,
        max_length=14,
    )]
    new_fio: Annotated[str, Field(
        title="ФИО пользователя",
        examples=['Игнатьев Алексей Алиевич']
    )]
    new_email: Annotated[Optional[str], Field(
        title="Электронная почта пользователя",
        examples=['example@gmail.com']
    )]
    verify_phone: Annotated[bool, Field(
        title='Статус подтверждения номера телефона',
        examples=[False],
    )]
    verify_email: Annotated[bool, Field(
        title='Статус подтверждения электронной почты',
        examples=[False],
    )]