from sqlalchemy import Column, String, Integer, BigInteger, Text, Boolean, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
import enum
from sqlalchemy.orm import Mapped, mapped_column
from ConsumerCorner.backend.app.models import Base


class CompanyModel(Base):
    __tablename__ = 'company_info'

    inn: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    ogrn: Mapped[str] = mapped_column()
    address: Mapped[str] = mapped_column()

class IpModel(Base):
    __tablename__ = 'ip_info'

    inn: Mapped[str] = mapped_column(primary_key=True)
    fio: Mapped[str] = mapped_column()
    ogrn: Mapped[str] = mapped_column()
    address: Mapped[str] = mapped_column()