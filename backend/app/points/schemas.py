from pydantic import BaseModel, Field
from typing import Annotated, Optional, Any
from datetime import datetime, time


class RegisterPoint(BaseModel):
    title: Annotated[str, Field(title="Рабочее название магазина", examples=["Виктория"])]
    enterprise_id: Annotated[int, Field(title="ID компании", examples=[1])]
    address: Annotated[str, Field(title="Адрес торговой точки", examples=["ул. Павлика Морозова 74, Б"])]
    opening_time: Annotated[str, Field(title="Время открытия точки", examples=['11:00'])]
    closing_time: Annotated[str, Field(title="Время закрытия точки", examples=['19:00'])]
    phone: Annotated[Optional[str], Field(title="Номер телефона", examples=['79219876543'])]
    type_activity: Annotated[str, Field(title="Вид деятельности", examples=["Продажа"])]


class PointInfo(BaseModel):
    id: Annotated[int, Field(title="ID точки", examples=[1])]
    title: Annotated[str, Field(title="Рабочее название магазина", examples=["Виктория"])]
    enterprise_id: Annotated[int, Field(title="ID компании", examples=[1])]
    address: Annotated[str, Field(title='Адрес точки', examples=["ул. Павлика Морозова 74, Б"])]
    opening_time: Annotated[time, Field(title="Время открытия точки", examples=["10:00"])]
    closing_time: Annotated[time, Field(title="Время открытия точки", examples=["20:00"])]
    phone: Annotated[Optional[str], Field(title="Номер телефона точки", examples=['79219876543'])]
    type_activity: Annotated[str, Field(title="Тип активности", examples=["Продажи"])]
    middle_stars: Annotated[Optional[float], Field(title="Средняя оценка", examples=[3.9])]
    verify_phone: Annotated[Optional[bool], Field(title="Верифицирован ли номер телефона", examples=[False])]
    created_at: Annotated[datetime, Field(title="Дата регистрации компании в приложении", examples=["2024-12-07 03:21:37.273427"])]


class ChangePointSchema(BaseModel):
    title: Annotated[str, Field(title="Рабочее название магазина", examples=["Виктория"])]
    address: Annotated[str, Field(title='Адрес точки', examples=["ул. Павлика Морозова 74, Б"])]
    opening_time: Annotated[str, Field(title="Время открытия точки", examples=["10:00"])]
    closing_time: Annotated[str, Field(title="Время открытия точки", examples=["20:00"])]
    phone: Annotated[Optional[str], Field(title="Номер телефона точки", examples=['79219876543'])]
    type_activity: Annotated[str, Field(title="Тип активности", examples=["Продажи"])]


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]