from sqlalchemy import Column, String, Integer
from models import Base

class Verification(Base):
    __tablename__ = 'verification'

    request_id = Column(String, primary_key=True)
    sms_code = Column(String)


class Gigachdy(Base):
    __tablename__ = 'gigachady'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    
