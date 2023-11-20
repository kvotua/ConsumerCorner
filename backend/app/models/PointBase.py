from pydantic import BaseModel, Field


class PointBase(BaseModel):
    title: str = Field(min_length=1)
    address: str = Field(min_length=1)
    ITN: str = Field(min_length=10, max_length=12)
    MSRN: str = Field(min_length=13, max_length=13)
