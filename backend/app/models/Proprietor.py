import uuid
from pydantic import Field
from . import PointID, ProprietorID, ProprietorBase


class Proprietor(ProprietorBase):
    id: ProprietorID = Field(default_factory=lambda: str(uuid.uuid4()))
    points_id: list[PointID] = []
