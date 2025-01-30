from sqlalchemy import BigInteger, Text, ForeignKey, func, Float, Time, PrimaryKeyConstraint, String, Integer, Boolean, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime, time
from typing import Optional, List

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    phone: Mapped[str] = mapped_column(Text)
    fio: Mapped[str] = mapped_column(Text)
    password: Mapped[str] = mapped_column(Text)
    email: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    verify_phone: Mapped[bool] = mapped_column(default=False)
    verify_email: Mapped[bool] = mapped_column(default=False)


class UserEnterprisesRole(Base):
    __tablename__ = 'user_enterprises_role'

    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    enterprise_id: Mapped[str] = mapped_column(BigInteger, ForeignKey('enterprises.id'))
    role: Mapped[str] = mapped_column(String)

class Enterprises(Base):
    __tablename__ = 'enterprises'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)
    create_id: Mapped[int] = mapped_column(BigInteger)
    inn: Mapped[str] = mapped_column(String(12))
    ogrn: Mapped[str] = mapped_column(String(15))
    address: Mapped[str] = mapped_column(Text)
    image_id: Mapped[str] = mapped_column(nullable=True)
    general_type_activity: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Points(Base):
    __tablename__ = 'points'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    enterprise_id : Mapped[int] = mapped_column(ForeignKey('enterprises.id'))
    create_id: Mapped[int] = mapped_column(BigInteger)
    title: Mapped[str] = mapped_column(String)
    address: Mapped[str] = mapped_column(Text)
    opening_time: Mapped[time] = mapped_column(Time)
    closing_time: Mapped[time] = mapped_column(Time)
    image_id: Mapped[str] = mapped_column(nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(nullable=True)
    type_activity: Mapped[str] = mapped_column(String)
    middle_stars: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    verify_phone: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Docs(Base):
    __tablename__ = 'docs'

    id: Mapped[str] = mapped_column(primary_key=True)
    point_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('points.id'))
    isTemp: Mapped[bool] = mapped_column(Boolean)
    date_added: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
    date_closed: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
    name: Mapped[str] = mapped_column(Text)

    social_points: Mapped[List["DocsPoint"]] = relationship("DocsPoint", cascade="all, delete-orphan")


class Comments(Base):
    __tablename__ = 'comments'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    point_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('points.id'))
    text: Mapped[str] = mapped_column(Text)
    stars: Mapped[int] = mapped_column(Integer, nullable=True)
    name: Mapped[str] = mapped_column(Text, nullable=True)
    number: Mapped[str] = mapped_column(Text, nullable=True)
    isAnonimus: Mapped[bool] = mapped_column(Boolean)
    category: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class Imgs(Base):
    __tablename__ = 'imgs'
    id: Mapped[str] = mapped_column(primary_key=True)
    comment_id: Mapped[int] = mapped_column(BigInteger)

    
class Social(Base):
    __tablename__ = 'social'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    enterprises_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('enterprises.id'))
    name: Mapped[str] = mapped_column(Text)
    link: Mapped[str] = mapped_column(Text)

    social_points: Mapped[List["SocialPoint"]] = relationship("SocialPoint", cascade="all, delete-orphan")


class SocialPoint(Base):
    __tablename__ = 'social_point'
    __table_args__ = (PrimaryKeyConstraint('social_id', 'point_id'),)

    social_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('social.id'), nullable=False)
    point_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('points.id'), nullable=False)


class DocsPoint(Base):
    __tablename__ = 'docs_point'
    __table_args__ = (PrimaryKeyConstraint('docs_id', 'point_id'),)

    docs_id: Mapped[str] = mapped_column(ForeignKey('docs.id'))
    point_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('points.id'))


class Verification(Base):
    __tablename__ = 'verification'

    request_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    code: Mapped[str] = mapped_column(String)
    phone: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())

class EmailVerification(Base):
    __tablename__ = 'email_verification'

    request_id: Mapped[str] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('users.id'))
    email: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())

class PasswordRestore(Base):
    __tablename__ = 'password_restore'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    code: Mapped[str] = mapped_column(String)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey('users.id'))
    phone: Mapped[str] = mapped_column(String)
    is_checked: Mapped[bool] = mapped_column(Boolean, default=False)
    is_changed: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())


class SysAdminSessions(Base):
    __tablename__ = "sys_admin_sessions"
    
    active_session: Mapped[str] = mapped_column(primary_key=True)