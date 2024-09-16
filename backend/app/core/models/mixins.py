from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column


class IdMixin:
    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        unique=True,
        nullable=False,
        default=uuid4,
        comment="Идентификатор",
    )
