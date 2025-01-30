from pydantic import BaseModel, Field, ConfigDict, field_validator, ValidationInfo
from typing import Annotated, Any, List, Optional
from datetime import datetime




class CommentData(BaseModel):
    text: str = Field(title="The text of the comment", examples=['The text of the comment'])
    stars: Optional[int] = Field(title='Number of stars', examples=[4], ge=1, le=5)
    name: Optional[str] = Field(title='Name and Surname of user', examples=['Иванов Павел'])
    number: Optional[str] = Field(title='Phone number', examples=['89112547896'])
    isAnonimus: bool = Field(title='Is Anonimusly comment', examples=[True])
    category: str = Field(title='Comment category', examples=['report'])

    @field_validator("stars")
    def check_stars_if_report(cls, v: Optional[int], info):
        category = info.data.get('category', '')
        if category in ['report', 'appeal'] and v is None:
            raise ValueError('The comment-report or comment-appeal requires stars')
        if v is not None and (v < 1 or v > 5):
            raise ValueError('Stars must be between 1 and 5')
        return v

    @field_validator('name')
    def check_name_if_anonimus(cls, v: Optional[str], info: ValidationInfo):
        is_anonymous = info.data.get('isAnonimus', False)
        if not is_anonymous and v is None:
            raise ValueError(f'Name must be provided if not anonymous')
        return v    

    @field_validator('number')
    def check_number_if_anonimus(cls, v: Optional[str], info: ValidationInfo):
        is_anonymous = info.data.get('isAnonimus', False)
        if not is_anonymous and v is None:
            raise ValueError(f'Number must be provided if not anonymous')
        return v   

class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]

class ImageData(BaseModel):
    id: Annotated[str, Field(title="Photo ID", examples=['5f2fcae09b58c38603442a4f'])]
    comment_id: Annotated[int, Field(title="Comment ID", examples=[1])]

class GetCommentsRequest(BaseModel):
    point_ids: Annotated[List[int], Field(
        default_factory=list,
        title="Points ID's",
        examples=[[1, 2, 10]]
    )]
    enterprises_ids: Annotated[List[int], Field(
        default_factory=list,
        title="Enterprises ID's",
        examples=[[2, 5, 3]]
    )]
    category: Annotated[List[str], Field(
        default_factory=list,
        title="Comment categoryies",
        examples=[['report', 'appeal']]
    )]

class CommentsSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[int, Field(title="Comment ID", examples=[1])]
    point_id: Annotated[int, Field(title="Point ID", examples=[2])]
    text: Annotated[str, Field(title="The text of the comment", examples=['The text of the comment'])]
    stars: Annotated[Optional[int], Field(title='Number of stars', examples=[4], ge=1, le=5)]
    name: Annotated[Optional[str], Field(title='Name and Surname of user', examples=['Иванов Павел'])]
    number: Annotated[Optional[str], Field(title='Phone number', examples=['89112547896'])]
    isAnonimus: Annotated[Optional[bool], Field(title='Is Anonimusly comment', examples=[True])]
    category: Annotated[Optional[str], Field(title='Comment category', examples=[True])]
    created_at: Annotated[datetime, Field(title="Date the comment was created", examples=["2024-12-07 03:21:37.273427"])]
    images_data: Annotated[Optional[List[str]], Field(title="Image's ID", examples=[['6d75ddd59b58c3607315a11']])]