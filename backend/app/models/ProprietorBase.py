from pydantic import BaseModel, Field
from pydantic_extra_types.phone_numbers import PhoneNumber


class ProprietorBase(BaseModel):
    name: str = Field(min_length=1)
    surname: str = Field(min_length=1)
    phone_number: PhoneNumber
