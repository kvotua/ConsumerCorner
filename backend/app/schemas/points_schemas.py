from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import Annotated, Optional, Any
from datetime import datetime, time

from app.services.verify_services import validate_phone


class RegisterPoint(BaseModel):
    title: Annotated[str, Field(title="Рабочее название магазина", examples=["Виктория"])]
    enterprise_id: Annotated[int, Field(title="ID компании", examples=[1], ge=1)]
    address: Annotated[str, Field(title="Адрес торговой точки", examples=["ул. Павлика Морозова 74, Б"])]
    opening_time: Annotated[str, Field(title="Время открытия точки", examples=['11:00'])]
    closing_time: Annotated[str, Field(title="Время закрытия точки", examples=['19:00'])]
    phone: Annotated[Optional[str], Field(title="Номер телефона", examples=['79219876543'], min_length=11, max_length=14, default=None)]
    type_activity: Annotated[str, Field(title="Вид деятельности", examples=["Продажа"])]

    @field_validator("phone", mode="before")
    def check_phone(cls, phone):
        if phone == "" or None:
            return None
        try:
            valid_phone = validate_phone(phone)
            if valid_phone is None:
                raise ValueError("Invalid phone number")
            return valid_phone
        except:
            raise ValueError("Invalid phone number")


class PointInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[int, Field(title="ID точки", examples=[1])]
    enterprise_id: Annotated[int, Field(title="ID компании", examples=[1])]
    title: Annotated[str, Field(title="Рабочее название магазина", examples=["Виктория"])]
    address: Annotated[str, Field(title='Адрес точки', examples=["ул. Павлика Морозова 74, Б"])]
    opening_time: Annotated[time, Field(title="Время открытия точки", examples=["10:00"])]
    closing_time: Annotated[time, Field(title="Время открытия точки", examples=["20:00"])]
    phone: Annotated[Optional[str], Field(title="Номер телефона точки", examples=['79219876543'], max_length=14)]
    type_activity: Annotated[str, Field(title="Тип активности", examples=["Продажи"])]
    middle_stars: Annotated[Optional[float], Field(title="Средняя оценка", examples=[3.9], ge=0, lt=5)]
    verify_phone: Annotated[Optional[bool], Field(title="Верифицирован ли номер телефона", examples=[False])]
    created_at: Annotated[datetime, Field(title="Дата регистрации компании в приложении", examples=["2024-12-07 03:21:37.273427"])]


class ChangePointSchema(BaseModel):
    title: Annotated[Optional[str], Field(title="Рабочее название магазина", examples=["Виктория"], default=None)]
    address: Annotated[Optional[str], Field(title='Адрес точки', examples=["ул. Павлика Морозова 74, Б"], default=None)]
    opening_time: Annotated[Optional[str], Field(title="Время открытия точки", examples=["10:00"], default=None)]
    closing_time: Annotated[Optional[str], Field(title="Время открытия точки", examples=["20:00"], default=None)]
    phone: Annotated[Optional[str], Field(title="Номер телефона точки", examples=['79219876543'], max_length=14, default=None)]
    type_activity: Annotated[Optional[str], Field(title="Тип активности", examples=["Продажи"], default=None)]

    @field_validator("phone", mode="before")
    def check_phone(cls, phone):
        if phone == "" or None:
            return None
        try:
            valid_phone = validate_phone(phone)
            if valid_phone is None:
                raise ValueError("Invalid phone number")
            return valid_phone
        except:
            raise ValueError("Invalid phone number")


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]