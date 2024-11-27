from sqlalchemy import Column, String, Integer, BigInteger, Text, Boolean, Float, ForeignKey
from sqlalchemy.dialects.mysql import VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    phone = Column(BigInteger)
    fio = Column(String)
    password = Column(String)
    email = Column(String)
    verify_phone = Column(Boolean)
    verify_email = Column(Boolean)

class UserEnterprisesRole(Base):
    __tablename__ = 'user_enterprises_role'

    user_id = Column(String, primary_key=True)
    enterprise_id = Column(String, ForeignKey('enterprises.id'), primary_key=True)
    role = Column(String)


class Enterprises(Base):
    __tablename__ = 'enterprises'

    id = Column(String, primary_key=True)
    name = Column(String)
    type = Column(String)
    create_id = Column(String)
    inn = Column(BigInteger)
    ogrn = Column(String)
    general_type_activity = Column(String)
    role_id = Column(String)
    data_added = Column(BigInteger)


class Points(Base):
    __tablename__ = 'points'

    id = Column(String, primary_key=True)
    enterprise_id = Column(String, ForeignKey('enterprises.id'))
    title = Column(String)
    address = Column(String)
    phone = Column(String)
    type_activity = Column(String)
    middle_stars = Column(Float)
    verify_phone = Column(BigInteger)
    date_added = Column(BigInteger)


class Docs(Base):
    __tablename__ = 'docs'

    id = Column(String, primary_key=True)
    point_id = Column(String, ForeignKey('points.id'))


class Comments(Base):
    __tablename__ = 'comments'

    id = Column(String, primary_key=True)
    point_id = Column(String, ForeignKey('points.id'))
    text = Column(Text)
    stars = Column(Integer)
    date_added = Column(BigInteger)

class Imgs(Base):
    __tablename__ = 'imgs'

    id = Column(String, primary_key=True)
    comment_id = Column(String)
