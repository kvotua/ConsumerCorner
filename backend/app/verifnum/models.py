from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Verification(Base):
    __tablename__ = 'verification'

    request_id = Column(String, primary_key=True)
    sms_code = Column(String)