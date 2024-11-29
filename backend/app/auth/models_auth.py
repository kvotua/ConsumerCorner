from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from ConsumerCorner.backend.app.models import Base


class Verification(Base):
    __tablename__ = 'verification'

    request_id: Mapped[str] = mapped_column(String, primary_key=True)
    sms_code: Mapped[str] = mapped_column(String)