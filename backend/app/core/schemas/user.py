from core.types.user_id import UserIdType
from fastapi_users import schemas
from pydantic import Field


class UserRead(schemas.BaseUser[UserIdType]):
    surname: str
    name: str
    patronymic: str | None


class UserCreate(schemas.BaseUserCreate):
    surname: str = Field(min_length=2, description="Фамилия пользователя")
    name: str = Field(min_length=2, description="Имя пользователя")
    patronymic: str | None = Field(default=None, description="Отчество пользователя")


class UserUpdate(schemas.BaseUserUpdate):
    surname: str | None = Field(min_length=2, description="Фамилия пользователя")
    name: str | None = Field(min_length=2, description="Имя пользователя")
    patronymic: str | None = Field(description="Отчество пользователя")
