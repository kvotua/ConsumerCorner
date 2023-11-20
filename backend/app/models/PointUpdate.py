from typing import Optional
from pydantic import BaseModel, Field
from . import INN, OGRN


class PointUpdate(BaseModel):
    title: Optional[str] = Field(min_length=1, default=None)
    address: Optional[str] = Field(min_length=1, default=None)
    inn: Optional[INN] = Field(default=None)
    ogrn: Optional[OGRN] = Field(default=None)
