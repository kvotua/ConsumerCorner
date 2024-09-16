from sqlalchemy import UUID, ForeignKey
from core.types import UserIdType
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import IdMixin


class Enterprise(Base, IdMixin):
    name: Mapped[str] = mapped_column(
        nullable=False,
        comment="Название компании",
    )

    type: Mapped[str] = mapped_column(
        nullable=False,
        comment="Тип компании",
    )

    user_id: Mapped[UserIdType] = mapped_column(
        UUID,
        ForeignKey("users.id", ondelete="cascade"),
        nullable=False,
    )
