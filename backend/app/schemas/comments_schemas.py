from pydantic import BaseModel, Field, ConfigDict
from typing import Annotated, Any, List, Optional
from datetime import datetime


class CommentData(BaseModel):
    text: Annotated[str, Field(title="The text of the comment", examples=['The text of the comment'])]
    stars: Annotated[int, Field(title='Number of stars', examples=[4], ge=1, le=5)]
    name: Annotated[str, Field(title='Name and Surname of user', examples=['Иванов Павел'])]
    number: Annotated[str, Field(title='Phone number', examples=['89112547896'])]
    isAnonimus: Annotated[bool, Field(title='Is Anonimusly comment', examples=[True])]


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]

class ImageData(BaseModel):
    id: Annotated[str, Field(title="Photo ID", examples=['5f2fcae09b58c38603442a4f'])]
    comment_id: Annotated[int, Field(title="Comment ID", examples=[1])]


class CommentsSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[int, Field(title="Comment ID", examples=[1])]
    point_id: Annotated[int, Field(title="Point ID", examples=[2])]
    text: Annotated[str, Field(title="The text of the comment", examples=['The text of the comment'])]
    stars: Annotated[int, Field(title='Number of stars', examples=[4], ge=1, le=5)]
    name: Annotated[str, Field(title='Name and Surname of user', examples=['Иванов Павел'])]
    number: Annotated[str, Field(title='Phone number', examples=['89112547896'])]
    isAnonimus: Annotated[bool, Field(title='Is Anonimusly comment', examples=[True])]
    created_at: Annotated[datetime, Field(title="Date the comment was created", examples=["2024-12-07 03:21:37.273427"])]
    images_data: Annotated[Optional[List[str]], Field(title="Image's ID", examples=[['6d75ddd59b58c3607315a11']])]
