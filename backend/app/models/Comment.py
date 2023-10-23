import uuid
from pydantic import Field
from app.models import CommentBase


class Comment(CommentBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
