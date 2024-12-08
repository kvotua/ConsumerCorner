from fastapi import APIRouter, Header, Depends, HTTPException, Body, Path
from typing import Annotated, List
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.config import example_jwt_token
from backend.app.database import get_session
from backend.app.models import Enterprises
from backend.app.auth.utils import validate_token
from .schemas import RegisterCompany, ResponseSchema, EnterpriseInfo
from . import crud


router = APIRouter(
    prefix='/enterprises',
    tags=['Enterprises'],
)


@router.post("/register-enterprise", response_model=ResponseSchema)
async def register_company(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        data_company: Annotated[RegisterCompany, Body()],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = validate_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == 1:
        raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
    if dict_by_token == 2:
        raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
    if await crud.add_enterprise(session=session, data=data_company, user_id=dict_by_token.get("id")) is True:
        return ResponseSchema(status_code=200, detail="Успешная регистрация")
    raise HTTPException(status_code=500, detail="Неудачная регистрация компании")


@router.get("/enterprises-info", response_model=List[EnterpriseInfo])
async def get_companies_info(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = validate_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == 1:
        raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
    if dict_by_token == 2:
        raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
    result = await crud.get_all_enterprises_by_id(session=session, user_id=dict_by_token.get("id"))
    if result is None:
        raise HTTPException(status_code=404, detail="Компании не найдены")
    return result