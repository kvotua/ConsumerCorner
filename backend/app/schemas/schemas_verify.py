from typing import Annotated
import re

from pydantic import BaseModel, Field, field_validator, model_validator
from app.config import pattern_password, pattern_fio
from app.services.verify_services import validate_phone


class Phone(BaseModel):
    phone: Annotated[str, Field(
        title='Номер телефона без +',
        examples=['79216547832'],
        min_length=11,
        max_length=14,)]

    @field_validator("phone", mode="before")
    def check_phone(cls, phone):
        try:
            valid_phone = validate_phone(phone)
            return valid_phone
        except:
            return ValueError("Invalid phone number")


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
        examples=['password'])]

    @model_validator(mode="before")
    def check_fio_password(cls, values):
        user_fio = values.get('fio')
        if user_fio:
            user_list = user_fio.split()
            if len(user_list[0]) and len(user_list[1]) < 3:
                raise ValueError('Invalid full name')
            if re.match(pattern=pattern_fio, string=user_fio) is None:
                raise ValueError('Invalid full name')

        user_password = values.get('password')
        if re.match(pattern=pattern_password, string=user_password) is None:
            raise ValueError(
                "The password is too simple. The password must contain at least 8 characters, including letters in all cases, numbers and special characters.")

        return values




class Login(Phone):
    password: Annotated[str, Field(
        title='Пароль',
        examples=['password'],)]


class ReqID(BaseModel):
    req_id: Annotated[str, Field(
        title='ID сессии, полученный после отправки номера',
        examples=['79442f1f-17a8-42bb-9f6f-4affc8788e7e'],
        min_length=36,
        max_length=36,)]


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str