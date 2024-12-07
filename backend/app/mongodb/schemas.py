from typing import NewType, Annotated

from pydantic import BaseModel,Field

class PhotoSchema(BaseModel):
    id: Annotated[str, Field(
        title='ID Фотографии',
        examples=['5']
    )]
    
class DocSchema(BaseModel):
    id: Annotated[str, Field(
        title='ID Фотографии',
        examples=['5']
    )]
    
class ErrorSchema(BaseModel):
    status_code: int
    message: str