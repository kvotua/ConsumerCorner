from sqlalchemy import BigInteger, Text, ForeignKey, func, Float, Time, PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime, time
from typing import Optional


Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    phone: Mapped[str] = mapped_column()
    fio: Mapped[str] = mapped_column()
    password: Mapped[str] = mapped_column(Text)
    email: Mapped[Optional[str]] = mapped_column()
    verify_phone: Mapped[bool] = mapped_column(default=False)
    verify_email: Mapped[bool] = mapped_column(default=False)


class UserEnterprisesRole(Base):
    __tablename__ = 'user_enterprises_role'

    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    enterprise_id: Mapped[str] = mapped_column(BigInteger, ForeignKey('enterprises.id'))
    role: Mapped[str] = mapped_column()


class Enterprises(Base):
    __tablename__ = 'enterprises'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column()
    type: Mapped[str] = mapped_column()
    create_id: Mapped[int] = mapped_column(BigInteger)
    inn: Mapped[str] = mapped_column()
    ogrn: Mapped[str] = mapped_column()
    address: Mapped[str] = mapped_column()
    general_type_activity: Mapped[str] = mapped_column()
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Points(Base):
    __tablename__ = 'points'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    enterprise_id : Mapped[int] = mapped_column(ForeignKey('enterprises.id'))
    create_id: Mapped[int] = mapped_column(BigInteger)
    title: Mapped[str] = mapped_column()
    address: Mapped[str] = mapped_column()
    opening_time: Mapped[time] = mapped_column(Time)
    closing_time: Mapped[time] = mapped_column(Time)
    phone: Mapped[Optional[str]] = mapped_column(nullable=True)
    type_activity: Mapped[str] = mapped_column()
    middle_stars: Mapped[Optional[float]] = mapped_column(Float)
    verify_phone: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Docs(Base):
    __tablename__ = 'docs'

    id: Mapped[str] = mapped_column(primary_key=True)
    point_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('points.id'))


class Comments(Base):
    __tablename__ = 'comments'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    point_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('points.id'))
    text: Mapped[str] = mapped_column(Text)
    stars: Mapped[int] = mapped_column()
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Imgs(Base):
    __tablename__ = 'imgs'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    comment_id: Mapped[str] = mapped_column()


class Social(Base):
    __tablename__ = 'social'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    enterprises_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('enterprises.id'))
    name: Mapped[str] = mapped_column()
    link: Mapped[str] = mapped_column(Text)


class SocialPoint(Base):
    __tablename__ = 'social_point'
    __table_args__ = (PrimaryKeyConstraint('social_id', 'point_id'),)

    social_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('social.id'), nullable=False)
    point_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('points.id'), nullable=False)