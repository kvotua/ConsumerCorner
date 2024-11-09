from core.types import EnterpriseIdType
from sqlalchemy import UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import IdMixin


class Point(Base, IdMixin):
    # TODO: должен ли быть unique?
    title: Mapped[str] = mapped_column(
        nullable=False,
        comment="Название точки",
    )

    address: Mapped[str] = mapped_column(
        nullable=False,
        comment="Адрес точки",
    )

    # TODO: нужна валидация +7
    # TODO: нужна верификации (на потом)
    phone: Mapped[str] = mapped_column(
        nullable=True,
        comment="Телефон точки",
    )

    # TODO: должен ли быть unique?
    # TODO: нужна ли валидация?
    inn: Mapped[str] = mapped_column(
        nullable=False,
        comment="ИНН",
    )

    # TODO: должен ли быть Enum?
    # TODO: нужна ли валидация?
    ogrn: Mapped[str] = mapped_column(
        nullable=False,
        comment="ОГРН",
    )

    # TODO: должен ли быть выбран из списка (Enum)?
    type_activity: Mapped[str] = mapped_column(
        nullable=False,
        comment="Тип деятельности",
    )

    enterprise_id: Mapped[EnterpriseIdType] = mapped_column(
        UUID,
        ForeignKey("enterprises.id", ondelete="cascade"),
        nullable=False,
    )
