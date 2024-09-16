from core.types import PointIdType
from sqlalchemy import UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import IdMixin


class Comment(Base, IdMixin):
    text: Mapped[str] = mapped_column(
        nullable=False,
        comment="Текст комментария",
    )

    # TODO: нужна ли валидация?
    # TODO: нужно ли ограничение (1-5)?
    stars: Mapped[int] = mapped_column(
        nullable=True,
        comment="Оценка",
    )

    max_imgs: Mapped[int] = mapped_column(
        nullable=False,
        comment="Максимальное количество изображений",
    )

    point_id: Mapped[PointIdType] = mapped_column(
        UUID,
        ForeignKey("points.id", ondelete="cascade"),
        nullable=False,
    )
