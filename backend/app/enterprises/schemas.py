from pydantic import BaseModel, Field
from typing import Annotated, Optional


class RegisterCompany(BaseModel):
    name: Annotated[str, Field(title="Название фирмы",)]
    type_comp: Annotated[str, Field(title="Тип фирмы (ИП, ООО и т.д.)",)]
    inn: Annotated[str, Field(title="ИНН", min_length=10, max_length=12)]
    ogrn: Annotated[str, Field(title="ОГРН юридического лица", min_length=13, max_length=13)]
    address: Annotated[str, Field(title="Фактический адрес", examples=['ул. Павлика Морозова 74Б'])]
    general_type_activity: Annotated[str, Field(title='Основной тип деятельности', examples=["Частное предприятие"])]


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field()]
    detail: Annotated[str, Field()]


class RegisterPoint(BaseModel):
    name: Annotated[str, Field(title="Рабочее название магазина")]
    enterpise_id: Annotated[int, Field(title="ID компании", examples=[1])]
    address: Annotated[str, Field(title="Адрес торговой точки")]
    opening_time: Annotated[str, Field(title="Время открытия точки", examples=['11:00'])]
    closing_time: Annotated[str, Field(title="Время закрытия точки", examples=['19:00'])]
    phone: Annotated[Optional[str], Field(title="Номер телефона", examples=['79219876543'])]
    type_activity: Annotated[str, Field(title="Вид деятельности", examples=["Продажа"])]


class InfoCompany(BaseModel):
    pass