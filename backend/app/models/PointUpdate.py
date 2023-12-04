from typing import Optional
from pydantic import BaseModel, Field
from pydantic_extra_types.phone_numbers import PhoneNumber
from . import INN, OGRN


class PointUpdate(BaseModel):
    title: Optional[str] = Field(min_length=1, default=None)
    address: Optional[str] = Field(min_length=1, default=None)
    inn: Optional[INN] = Field(default=None)
    ogrn: Optional[OGRN] = Field(default=None)
    phone_number: Optional[PhoneNumber] = Field(default=None)
    audit_log_file_id: Optional[str] = Field(default=None)
    license_file_ids_append: Optional[list[str]] = Field(default=[])
    license_file_ids_delete: Optional[list[str]] = Field(default=[])
    accreditation_file_ids_append: Optional[list[str]] = Field(default=[])
    accreditation_file_ids_delete: Optional[list[str]] = Field(default=[])
