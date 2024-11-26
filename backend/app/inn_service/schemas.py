from pydantic import BaseModel

class CompanySchema(BaseModel):
    inn: str
    name: str
    ogrn: str
    kpp: str
    address: str
class IpSchema(BaseModel):
    fio: str
    ogrn: str
    address: str
class ErrorSchema(BaseModel):
    status_code: int
    message: str