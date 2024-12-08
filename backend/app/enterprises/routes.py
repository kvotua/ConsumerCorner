from fastapi import APIRouter, Header, Depends, HTTPException, Body, Path
from typing import Annotated, List

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.config import example_jwt_token
from backend.app.database import get_session
from backend.app.models import Enterprises
from backend.app.auth.utils import validate_token
from .schemas import RegisterCompany, ResponseSchema, EnterpriseInfo



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
    data_for_db = Enterprises(
        name=data_company.name,
        type=data_company.type_comp,
        create_id=dict_by_token.get("id"),
        inn=data_company.inn,
        ogrn=data_company.ogrn,
        address=data_company.address,
        general_type_activity=data_company.general_type_activity,
    )
    session.add(data_for_db)
    await session.commit()
    await session.refresh(data_for_db)
    response = select(Enterprises.id).where(Enterprises.inn == data_company.inn)
    result = await session.execute(response)
    return ResponseSchema(status_code=200, detail=result.scalars().first())


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
    user_id = dict_by_token.get('id')

    response = select(Enterprises).where(Enterprises.create_id == user_id)
    result = await session.execute(response)
    array = result.scalars().all()
    if not array:
        raise HTTPException(status_code=404, detail="Записи не найдены")

    return [EnterpriseInfo(
            id=item.id,
            name=item.name,
            type_comp=item.type,
            inn=item.inn,
            ogrn=item.ogrn,
            address=item.address,
            general_type_activity=item.general_type_activity,
            created_at=item.created_at,
        )for item in array]

