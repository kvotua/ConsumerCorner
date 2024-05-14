from typing import NewType

from pydantic import BaseModel, EmailStr

UserId = NewType("UserId", str)


class EmailSchema(BaseModel):
    value: EmailStr
    verified: bool


class UserSchema(BaseModel):
    id: UserId
    email: EmailSchema
    name: str
    surname: str


class UserRegisterSchema(BaseModel):
    email: EmailStr
    name: str
    surname: str
    password: str
