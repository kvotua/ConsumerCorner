from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase


class Base(DeclarativeBase):
    pass


class Verify(Base):
    __tablename__ = 'activeverif'
    
    request_id: Mapped[str] = mapped_column(primary_key=True)
    sms_code: Mapped[str] = mapped_column()