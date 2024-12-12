from typing import Annotated
import re
from pydantic import BaseModel, Field, model_validator, field_validator
from email_validator import validate_email

from app.config import pattern_password, pattern_fio, example_jwt_token
from app.services.verify_services import validate_phone


class VerifePhone(BaseModel):
    phone: Annotated[str, Field(
        title='Номер телефона без +',
        examples=['79216547832'],
        min_length=11,
        max_length=14)]
    phone_verif: Annotated[bool, Field(
        title='Верифицирован ли телефон',
        examples=[True],)]
    access_token: Annotated[str, Field(title="Access-токен", examples=[example_jwt_token])]


class Register(BaseModel):
    phone: Annotated[str, Field(
        title='Номер телефона без +',
        examples=['79216547832'],
        min_length=11,
        max_length=14, )]
    fio: Annotated[str, Field(
        title='ФИО пользователя',
        examples=['Игнатьев Алексей Алиевич'],)]
    password: Annotated[str, Field(
        title='Пароль',
        examples=['password'])]

    @model_validator(mode="before")
    def check_fio_password(cls, values):
        user_phone = values.get('phone')
        if user_phone:
            if user_phone and not user_phone.isdigit():
                raise ValueError('Invalid phone number')
            try:
                valid_phone = validate_phone(user_phone)
                if valid_phone is None:
                    raise ValueError("Invalid phone number")
            except:
                return ValueError("Invalid phone number")

        user_fio = values.get('fio')
        if user_fio:
            if re.match(pattern=pattern_fio, string=user_fio) is None:
                raise ValueError('Invalid full name')

        user_password = values.get('password')
        if re.match(pattern=pattern_password, string=user_password) is None:
            raise ValueError(
                "The password is too simple. The password must contain at least 8 characters, including letters in all cases, numbers and special characters.")

        return values



class Login(BaseModel):
    phone: Annotated[str, Field(
        title='Номер телефона без +',
        examples=['79216547832'],
        min_length=11,
        max_length=14, )]
    password: Annotated[str, Field(
        title='Пароль',
        examples=['password'],)]

    @model_validator(mode="before")
    def check_fio_password(cls, values):
        user_phone = values.get('phone')
        if user_phone:
            try:
                valid_phone = validate_phone(user_phone)
                if valid_phone is None:
                    raise ValueError("Invalid phone number")
            except:
                return ValueError("Invalid phone number")
        return values

        return values

class ReqID(BaseModel):
    req_id: Annotated[str, Field(
        title='ID сессии, полученный после отправки номера',
        examples=['79442f1f-17a8-42bb-9f6f-4affc8788e7e'],
        min_length=36,
        max_length=36,)]

class EmailSchema(BaseModel):
    email: Annotated[str, Field(title="Электронная почта", examples=['example@gmail.com'], default=None)]

    @field_validator('email', mode='before')
    def check_email(cls, value):
        new_email = value.get("email")
        if new_email is not None:
            try:
                validated_email = validate_email(new_email)
                if validated_email is None:
                    raise ValueError("Invalid email.")
            except:
                raise ValueError("Invalid email.")

        return value

class TokenPair(BaseModel):
    access_token: str
    refresh_token: str