from pydantic import BaseModel, Field
from typing import Annotated, Optional, Any
from datetime import datetime


class RegisterCompany(BaseModel):
    name: Annotated[str, Field(title="Название фирмы",)]
    type_comp: Annotated[str, Field(title="Тип фирмы (ИП, ООО и т.д.)",)]
    inn: Annotated[str, Field(title="ИНН", min_length=10, max_length=12)]
    ogrn: Annotated[str, Field(title="ОГРН юридического лица", min_length=13, max_length=13)]
    address: Annotated[str, Field(title="Фактический адрес", examples=['ул. Павлика Морозова 74Б'])]
    general_type_activity: Annotated[str, Field(title='Основной тип деятельности', examples=["Частное предприятие"])]


class EnterpriseInfo(BaseModel):
    id: Annotated[int, Field(title="ID компании", examples=[1])]
    name: Annotated[str, Field(title="Название фирмы", examples=["Имя компании"])]
    type_comp: Annotated[Optional[str], Field(title="Тип фирмы (ИП, ООО и т.д.)", examples=["ИП"])]
    inn: Annotated[str, Field(title="ИНН", examples=["390000001190"], min_length=10, max_length=12)]
    ogrn: Annotated[str, Field(title="ОГРН юридического лица", examples=['1027700132195'],min_length=13, max_length=13)]
    address: Annotated[str, Field(title="Фактический адрес", examples=['ул. Павлика Морозова 74Б'])]
    general_type_activity: Annotated[str, Field(title='Основной тип деятельности', examples=["Частное предприятие"])]
    created_at: Annotated[datetime, Field(title="Дата регистрации компании в приложении", examples=["2024-12-07 03:21:37.273427"])]

    class Config:
        from_attributes = True


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]