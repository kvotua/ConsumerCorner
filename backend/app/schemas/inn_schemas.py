from pydantic import BaseModel

class CompanySchema(BaseModel):
    inn: str
    name: str
    ogrn: str
    address: str


class IpSchema(BaseModel):
    inn: str
    fio: str
    ogrn: str
    address: str


class ErrorSchema(BaseModel):
    status_code: int
    message: str