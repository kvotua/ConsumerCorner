from typing import Annotated
import re
from pydantic import BaseModel, Field, model_validator, field_validator
from email_validator import validate_email

from app.config import pattern_password, pattern_fio, example_jwt_token
from app.services.verify_services import validate_phone


class VerifePhone(BaseModel):
    phone: Annotated[str, Field(
        title="The user's phone number",
        examples=['79216547832'],
        min_length=11,
        max_length=14)]
    phone_verif: Annotated[bool, Field(
        title='Is the phone verified',
        examples=[True],)]
    access_token: Annotated[str, Field(title="Access token", examples=[example_jwt_token])]


class Register(BaseModel):
    phone: Annotated[str, Field(
        title="The user's phone number",
        examples=['79216547832'],
        min_length=11,
        max_length=14, )]
    fio: Annotated[str, Field(
        title="User's full name",
        examples=['Игнатьев Алексей Алиевич'],)]
    password: Annotated[str, Field(
        title='Password',
        examples=['password'])]

    @model_validator(mode="before")
    def check_fio_password(cls, values):
        user_phone = values.get('phone')
        if user_phone:
            try:
                valid_phone = validate_phone(user_phone)
                if valid_phone is None:
                    raise ValueError("Invalid phone number")
                else:
                    values["phone"] = valid_phone
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
        title="The user's phone number",
        examples=['79216547832'],
        min_length=11,
        max_length=14, )]
    password: Annotated[str, Field(
        title='Password',
        examples=['password'],)]

    @model_validator(mode="before")
    def check_phone_password(cls, values):
        user_phone = values.get('phone')
        if user_phone:
            try:
                valid_phone = validate_phone(user_phone)
                if valid_phone is None:
                    raise ValueError("Invalid phone number")
                else:
                    values["phone"] = valid_phone
            except:
                return ValueError("Invalid phone number")
        return values

class ReqID(BaseModel):
    req_id: Annotated[int, Field(
        title='The ID received after getting the call',
        examples=['1191273219673078']
    )]

class EmailReqID(BaseModel):
    req_id: Annotated[str, Field(
        title='The ID received after sending the email',
        examples=['643340e3-96a1-4d04-aa24-9043d73bb695']
    )]

class EmailSchema(BaseModel):
    email: Annotated[str, Field(title="Email", examples=['example@gmail.com'], default=None)]

    @field_validator('email', mode='before')
    def check_email(cls, value):
        if value is not None:
            try:
                validated_email = validate_email(value)
                if validated_email is None:
                    raise ValueError("Invalid email.")
            except:
                raise ValueError("Invalid email.")

        return value

class TokenPair(BaseModel):
    access_token: Annotated[str, Field(title="Access token", examples=[example_jwt_token])]
    refresh_token: Annotated[str, Field(title="Refresh token", examples=[example_jwt_token])]