from pydantic import BaseModel, Field
from typing import Annotated, Optional


class RegisterPoint(BaseModel):
    name: Annotated[str, Field(title="Рабочее название магазина", examples=["Виктория"])]
    enterpise_id: Annotated[int, Field(title="ID компании", examples=[1])]
    address: Annotated[str, Field(title="Адрес торговой точки", examples=["ул. Павлика Морозова 74, Б"])]
    opening_time: Annotated[str, Field(title="Время открытия точки", examples=['11:00'])]
    closing_time: Annotated[str, Field(title="Время закрытия точки", examples=['19:00'])]
    phone: Annotated[Optional[str], Field(title="Номер телефона", examples=['79219876543'])]
    type_activity: Annotated[str, Field(title="Вид деятельности", examples=["Продажа"])]


class PointInfo(BaseModel):
    title: Annotated[str, Field(title="Рабочее название магазина", examples=["Виктория"])]
    address: Annotated[str, Field(title='Адрес точки', examples=["ул. Павлика Морозова 74, Б"])]
    opening_time: Annotated[str, Field(title="Время открытия точки", examples=["10:00"])]
    closing_time: Annotated[str, Field(title="Время открытия точки", examples=["20:00"])]
    phone: Annotated[Optional[str], Field(title="Номер телефона точки", examples=['79219876543'])]
    type_activity: Annotated[str, Field(title="Тип активности", examples=["Продажи"])]