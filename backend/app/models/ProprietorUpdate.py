from pydantic import BaseModel, Field
from typing import Optional


class ProprietorUpdate(BaseModel):
    name: Optional[str] = Field(min_length=1, default=None)
    surname: Optional[str] = Field(min_length=1, default=None)
    password: Optional[str] = Field(min_length=1, default=None)
