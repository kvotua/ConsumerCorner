from pydantic import BaseModel, Field
from pydantic_extra_types.phone_numbers import PhoneNumber
from typing import Optional


class ProprietorUpdate(BaseModel):
    name: Optional[str] = Field(min_length=1, default=None)
    surname: Optional[str] = Field(min_length=1, default=None)
    phone_number: Optional[PhoneNumber] = None
    code: Optional[str] = Field(max_length=4, min_length=4, default=None)
