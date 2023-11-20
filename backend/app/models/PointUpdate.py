from typing import Optional
from pydantic import BaseModel, Field


class PointUpdate(BaseModel):
    title: Optional[str] = Field(min_length=1, default=None)
    address: Optional[str] = Field(min_length=1, default=None)
    ITN: Optional[str] = Field(min_length=10, max_length=12, default=None)
    MSRN: Optional[str] = Field(min_length=13, max_length=13, default=None)
