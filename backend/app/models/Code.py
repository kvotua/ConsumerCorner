from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber


class Code(BaseModel):
    value: str
    phone_number: PhoneNumber
    expires: int
