from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber


class ProprietorBase(BaseModel):
    name: str
    surname: str
    phone_number: PhoneNumber
