from pydantic import BaseModel
from app.models import PointID


class CommentBase(BaseModel):
    pointID: PointID
    message: str
