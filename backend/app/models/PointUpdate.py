from typing import Optional
from pydantic import BaseModel


class PointUpdate(BaseModel):
    title: Optional[str]
    address: Optional[str]
