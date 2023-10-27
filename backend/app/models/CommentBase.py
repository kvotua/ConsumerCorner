from pydantic import BaseModel, Field
from app.models import PointID


class CommentBase(BaseModel):
    pointID: PointID
    message: str = Field(min_length=1)
