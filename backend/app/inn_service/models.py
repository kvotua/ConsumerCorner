from sqlalchemy import Column, String, Integer, BigInteger, Text, Boolean, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
import enum
from sqlalchemy.orm import Mapped, mapped_column


class CompanyModel(Base):

    inn: Mapped[int] = mapped_column(BigInteger)
    name: Mapped[str] = mapped_column()
    ogrn: Mapped[str] = mapped_column()
    address: Mapped[str] = mapped_column()
    def to_schema(self) -> CompanySchema:
        return CompanySchema(
            inn=self.inn,
            name=self.name,
            ogrn=self.ogrn,
            kpp=self.kpp,
            address=self.address,
        )
class IpModel(Model):
    inn: Mapped[int] = mapped_column(BigInteger)
    fio: Mapped[str] = mapped_column()
    ogrn: Mapped[str] = mapped_column()
    address: Mapped[str] = mapped_column()
    def to_schema(self) -> IpSchema:
        return IpSchema(
            fio=self.fio,
            ogrn=self.ogrn,
            address=self.address,
        )