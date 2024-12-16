from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column
import datetime
from app.models.models import Base

class Verification(Base):
    __tablename__ = 'verification'

    request_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    sms_code: Mapped[str] = mapped_column(String)
    phone: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())