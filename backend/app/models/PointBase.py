from pydantic import BaseModel, Field
from . import INN, OGRN


class PointBase(BaseModel):
    title: str = Field(min_length=1)
    address: str = Field(min_length=1)
    inn: INN
    ogrn: OGRN
