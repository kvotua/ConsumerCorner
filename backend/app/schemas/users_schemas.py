from pydantic import BaseModel, Field, ConfigDict, model_validator
from typing import Annotated, Optional
import re
from email_validator import validate_email

from app.services.verify_services import validate_phone
from app.config import pattern_fio


class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[int, Field(title="User ID", examples=[1],)]
    phone: Annotated[str, Field(title="The user's phone number", examples=['79211234567'])]
    fio: Annotated[str, Field(title="User's full name", examples=['Игнатьев Алексей Алиевич'])]
    email: Annotated[Optional[str], Field(title="User's email address", examples=['example@gmail.com'])]
    verify_phone: Annotated[bool, Field(title='Phone number confirmation status', examples=[False])]
    verify_email: Annotated[bool, Field(title='Email Confirmation status',examples=[False])]


class ChangeUserSchema(BaseModel):

    new_phone: Annotated[Optional[str], Field(title="The user's phone number", examples=['79211234567'], max_length=14, default=None)]
    new_fio: Annotated[Optional[str], Field(title="User's full name", examples=['Игнатьев Алексей Алиевич'], default=None)]
    new_email: Annotated[Optional[str], Field(title="User's email address", examples=['example@gmail.com'], default=None)]

    @model_validator(mode="before")
    def check_phone(cls, values):
        user_phone = values.get('new_phone')
        if user_phone:
            try:
                valid_phone = validate_phone(user_phone)
                if valid_phone is None:
                    raise ValueError("Invalid phone number")
                else:
                    values["phone"] = valid_phone
            except:
                return ValueError("Invalid phone number")

        user_fio = values.get('new_fio')
        if user_fio:
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