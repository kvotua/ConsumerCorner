from pydantic import BaseModel, Field


class PointBase(BaseModel):
    title: str = Field(min_length=1)
    address: str = Field(min_length=1)
