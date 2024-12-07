from pydantic import BaseModel, Field
from typing import Annotated, Optional


class TokenInfo(BaseModel):
    access_token: str
    token_type: str


class NewUserSchema(BaseModel):
    new_phone: Annotated[str, Field(
        title="Новый номер телефона пользователя",
        examples=['79211234567'],
        min_length=11,
        max_length=14,
    )]
    new_email: Annotated[Optional[str], Field(
        title="Новая электронная почта пользователя",
        examples=['example@gmail.com']
    )]