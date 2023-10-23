from pydantic import BaseModel
from app.models import ProprietorID


class PointBase(BaseModel):
    title: str
    owner: ProprietorID
    address: str
