from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber
from typing import Optional


class ProprietorUpdate(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    phone_number: Optional[PhoneNumber] = None
    code: Optional[str] = None
