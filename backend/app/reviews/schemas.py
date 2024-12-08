from pydantic import BaseModel, Field
from typing import Annotated, Optional


class CommentData(BaseModel):
    text: Annotated[str, Field()]
    stars: Annotated[int, Field(title='Кол-во звезд', examples=[4], ge=1, le=5)]