from pydantic import BaseModel, Field, ConfigDict
from typing import Annotated, Any, List
from datetime import datetime


class CommentData(BaseModel):
    text: Annotated[str, Field(title="Текст комментария", examples=['Какой-то текст для примера'])]
    stars: Annotated[int, Field(title='Кол-во звезд', examples=[4], ge=1, le=5)]


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]

class ImageData(BaseModel):
    id: Annotated[str, Field(title="ID фотографии", examples=['5f2fcae09b58c38603442a4f'])]
    comment_id: Annotated[int, Field(title="ID комментария", examples=[1])]


class CommentsSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[int, Field(title="ID комментария", examples=[1])]
    point_id: Annotated[int, Field(title="ID точки", examples=[2])]
    text: Annotated[str, Field(title="Текст комментария", examples=['Какой-то текст для примера'])]
    stars: Annotated[int, Field(title='Кол-во звезд', examples=[4], ge=1, le=5)]
    created_at: Annotated[datetime, Field(title="Дата создания комментария", examples=["2024-12-07 03:21:37.273427"])]
    images_data: Annotated[List[str], Field(title="ID изображений комментария", examples=[["5f2fcae09b58c38603442a4f"]])]