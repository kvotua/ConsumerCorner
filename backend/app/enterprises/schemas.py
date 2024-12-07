from pydantic import BaseModel, Field
from typing import Annotated, Optional, Any


class RegisterCompany(BaseModel):
    name: Annotated[str, Field(title="Название фирмы",)]
    type_comp: Annotated[str, Field(title="Тип фирмы (ИП, ООО и т.д.)",)]
    inn: Annotated[str, Field(title="ИНН", min_length=10, max_length=12)]
    ogrn: Annotated[str, Field(title="ОГРН юридического лица", min_length=13, max_length=13)]
    address: Annotated[str, Field(title="Фактический адрес", examples=['ул. Павлика Морозова 74Б'])]
    general_type_activity: Annotated[str, Field(title='Основной тип деятельности', examples=["Частное предприятие"])]


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field()]
    detail: Annotated[Any, Field()]