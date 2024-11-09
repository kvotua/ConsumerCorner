from typing import TYPE_CHECKING

from core.types import UserIdType
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import IdMixin

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


class User(Base, IdMixin, SQLAlchemyBaseUserTable[UserIdType]):
    # TODO: одно поле для ФИО
    surname: Mapped[str] = mapped_column(
        nullable=False,
        comment="Фамилия пользователя",
    )
    name: Mapped[str] = mapped_column(
        nullable=False,
        comment="Имя пользователя",
    )
    patronymic: Mapped[str] = mapped_column(
        nullable=True,
        comment="Отчество пользователя",
    )

    @classmethod
    def get_db(cls, session: "AsyncSession"):
        return SQLAlchemyUserDatabase(session, cls)
