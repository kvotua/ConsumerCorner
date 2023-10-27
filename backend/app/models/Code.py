from pydantic import BaseModel, Field
from pydantic_extra_types.phone_numbers import PhoneNumber


class Code(BaseModel):
    value: str = Field(min_length=4, max_length=4)
    phone_number: PhoneNumber
    expires: int
