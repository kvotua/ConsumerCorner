from pydantic import BaseModel, Field, ConfigDict, model_validator
from typing import Annotated, Optional
import re
from email_validator import validate_email

from app.services.verify_services import validate_phone
from app.config import pattern_fio


class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[int, Field(title="ID пользователя", examples=[1],)]
    phone: Annotated[str, Field(title="Номер телефона пользователя", examples=['79211234567'])]
    fio: Annotated[str, Field(title="ФИО пользователя", examples=['Игнатьев Алексей Алиевич'])]
    email: Annotated[Optional[str], Field(title="Электронная почта пользователя", examples=['example@gmail.com'])]
    verify_phone: Annotated[bool, Field(title='Статус подтверждения номера телефона', examples=[False])]
    verify_email: Annotated[bool, Field(title='Статус подтверждения электронной почты',examples=[False])]


class ChangeUserSchema(BaseModel):

    new_phone: Annotated[Optional[str], Field(title="Номер телефона пользователя", examples=['79211234567'], max_length=14, default=None)]
    new_fio: Annotated[Optional[str], Field(title="ФИО пользователя", examples=['Игнатьев Алексей Алиевич'], default=None)]
    new_email: Annotated[Optional[str], Field(title="Электронная почта пользователя", examples=['example@gmail.com'], default=None)]

    @model_validator(mode="before")
    def check_phone(cls, values):
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

        user_fio = values.get('new_fio')
        if user_fio:
            user_list = user_fio.split()
            if len(user_list[0]) and len(user_list[1]) < 3:
                raise ValueError('Invalid full name')
            if re.match(pattern=pattern_fio, string=user_fio) is None:
                raise ValueError('Invalid full name')

        new_email = values.get("new_email")
        if new_email is not None:
            try:
                validated_email = validate_email(new_email)
                if validated_email is None:
                    raise ValueError("Invalid email.")
            except:
                raise ValueError("Invalid email.")

        return values