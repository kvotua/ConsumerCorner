from sqlalchemy import text, BigInteger, Text, ForeignKey, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column
import datetime

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    id: Mapped[str] = mapped_column(primary_key=True)
    phone: Mapped[str] = mapped_column()
    fio: Mapped[str] = mapped_column()
    password: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column()
    verify_phone: Mapped[bool] = mapped_column()
    verify_email: Mapped[bool] = mapped_column()

class UserEnterprisesRole(Base):
    __tablename__ = 'user_enterprises_role'

    user_id: Mapped[str] = mapped_column(primary_key=True)
    enterprise_id: Mapped[str] = mapped_column(ForeignKey('enterprises.id'), primary_key=True)
    role: Mapped[str] = mapped_column()


class Enterprises(Base):
    __tablename__ = 'enterprises'

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    type: Mapped[str] = mapped_column()
    create_id: Mapped[str] = mapped_column()
    inn: Mapped[int] = mapped_column(BigInteger)
    ogrn: Mapped[str] = mapped_column()
    general_type_activity: Mapped[str] = mapped_column()
    role_id: Mapped[str] = mapped_column()
    data_added: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Points(Base):
    __tablename__ = 'points'

    id: Mapped[str] = mapped_column(primary_key=True)
    enterprise_id : Mapped[str] = mapped_column(ForeignKey('enterprises.id'))
    title: Mapped[str] = mapped_column()
    address: Mapped[str] = mapped_column()
    phone: Mapped[str] = mapped_column()
    type_activity: Mapped[str] = mapped_column()
    middle_stars: Mapped[float] = mapped_column()
    verify_phone: Mapped[str] = mapped_column()
    data_added: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Docs(Base):
    __tablename__ = 'docs'

    id: Mapped[str] = mapped_column(primary_key=True)
    point_id: Mapped[str] = mapped_column(ForeignKey('points.id'))


class Comments(Base):
    __tablename__ = 'comments'

    id: Mapped[str] = mapped_column(primary_key=True)
    point_id: Mapped[str] = mapped_column(ForeignKey('points.id'))
    text: Mapped[str] = mapped_column(Text)
    stars: Mapped[int] = mapped_column(BigInteger)
    data_added: Mapped[datetime.datetime] = mapped_column(server_default=func.now())

class Imgs(Base):
    __tablename__ = 'imgs'

    id: Mapped[str] = mapped_column(primary_key=True)
    comment_id: Mapped[str] = mapped_column()