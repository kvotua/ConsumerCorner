import uuid
from pydantic import Field
from app.models import PointID, PointBase


class Point(PointBase):
    id: PointID = Field(default_factory=lambda: str(uuid.uuid4()))
