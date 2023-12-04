from pydantic import BaseModel, Field
from pydantic_extra_types.phone_numbers import PhoneNumber
from . import INN, OGRN


class PointBase(BaseModel):
    title: str = Field(min_length=1)
    address: str = Field(min_length=1)
    phone_number: PhoneNumber
    inn: INN
    ogrn: OGRN
    audit_log_file_id: str
    license_file_ids: list[str]
    accreditation_file_ids: list[str]
