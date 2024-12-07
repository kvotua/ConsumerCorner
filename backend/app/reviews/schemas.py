from pydantic import BaseModel, Field
from typing import Annotated, Optional


class CommentData(BaseModel):
    text: Annotated[str, Field()]
    stars: Annotated[int, Field()]