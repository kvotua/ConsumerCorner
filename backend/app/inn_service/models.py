from pynamodb.attributes import UnicodeAttribute, MapAttribute
from pynamodb.models import Model
from .schemas import CompanySchema, IpSchema


class CompanyModel(Model):
    class Meta:
        table_name = "Company"
        region = "dummy"
        host = "http://localhost:8000"
        aws_access_key_id = "dummy"
        aws_secret_access_key = "dummy"
    inn = UnicodeAttribute(hash_key=True)
    name = UnicodeAttribute()
    ogrn = UnicodeAttribute()
    kpp = UnicodeAttribute()
    address = UnicodeAttribute()
    def to_schema(self) -> CompanySchema:
        return CompanySchema(
            inn=self.inn,
            name=self.name,
            ogrn=self.ogrn,
            kpp=self.kpp,
            address=self.address,
        )
class IpModel(Model):
    class Meta:
        table_name = "Ip"
        region = "dummy"
        host = "http://localhost:8000"
        aws_access_key_id = "dummy"
        aws_secret_access_key = "dummy"
    inn = UnicodeAttribute(hash_key=True)
    fio = UnicodeAttribute()
    ogrn = UnicodeAttribute()
    address = UnicodeAttribute()
    def to_schema(self) -> IpSchema:
        return IpSchema(
            fio=self.fio,
            ogrn=self.ogrn,
            address=self.address,
        )