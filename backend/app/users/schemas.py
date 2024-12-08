from pydantic import BaseModel, Field, ConfigDict
from typing import Annotated, Optional


class TokenInfo(BaseModel):
    access_token: str
    token_type: str


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