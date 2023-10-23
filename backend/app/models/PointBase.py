from pydantic import BaseModel


class PointBase(BaseModel):
    title: str
    address: str
