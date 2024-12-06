from fastapi import APIRouter, Header, Depends, HTTPException, Body, Response
from typing import Annotated

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.config import example_jwt_token
from backend.app.database import get_session
from backend.app.models import Enterprises, Points
from backend.app.auth.utils import validate_token
from .schemas import RegisterCompany, RegisterPoint, ResponseSchema
from .utils import parse_time


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
    try:
        dict_by_token = validate_token(
            access_token=access_token,
            token_type=token_type,
        )
        if dict_by_token == 1:
            return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            return HTTPException(status_code=400, detail="Не верифицирован номер телефона")
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
        response = select(Enterprises).where(Enterprises.inn == data_company.inn)
        result = await session.execute(response)
        return ResponseSchema(status_code=200, detail=result.scalars().first())
#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiI3OTIxNjU0NzgzMiIsImZpbyI6Ilx1MDQxOFx1MDQzM1x1MDQzZFx1MDQzMFx1MDQ0Mlx1MDQ0Y1x1MDQzNVx1MDQzMiBcdTA0MTBcdTA0M2JcdTA0MzVcdTA0M2FcdTA0NDFcdTA0MzVcdTA0MzkgXHUwNDEwXHUwNDNiXHUwNDM4XHUwNDM1XHUwNDMyXHUwNDM4XHUwNDQ3IiwidmVyaWZ5X3Bob25lIjp0cnVlLCJleHAiOjE3MzM3NTQ2MTgsInR5cGUiOiJhY2Nlc3MifQ.yzRKJkHkSW3WIpp3zhcATjUMpZyzVv6jrZpbfJZHZyk
    except Exception as e:
        return ResponseSchema(status_code=500, detail=str(e))


@router.post("/register-point", response_model=ResponseSchema)
async def register_trade_point(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        data_point: Annotated[RegisterPoint, Body()],
        session: AsyncSession = Depends(get_session),
):
    try:
        dict_by_token = validate_token(
            access_token=access_token,
            token_type=token_type,
        )
        if dict_by_token == 1:
            return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            return HTTPException(status_code=400, detail="Не верифицирован номер телефона")
        data_for_db = Points(
            enterprise_id=dict_by_token.get("id"),
            title=data_point.name,
            address=data_point.address,
            opening_time=parse_time(data_point.opening_time),
            closing_time=parse_time(data_point.closing_time),
            phone=data_point.phone,
            type_activity=data_point.type_activity,
        )
        session.add(data_for_db)
        await session.commit()
        return ResponseSchema(status_code=200, detail="Точка успешно зарегестрирована")
    except Exception as e:
        return ResponseSchema(status_code=500, detail=str(e))



@router.get("/enterprises-info")
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
    try:
        dict_by_token = validate_token(
            access_token=access_token,
            token_type=token_type,
        )
        if dict_by_token == 1:
            return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            return HTTPException(status_code=400, detail="Не верифицирован номер телефона")
        user_id = dict_by_token.get('id')
        response = select(Enterprises).where(Enterprises.create_id == user_id)
        result = await session.execute(response)
        array = result.scalars().all()
        return [Enterprises(id=item.id, name=item,
                        type=item.type, create_id=item.create_id,
                        inn=item.inn, ogrn=item.ogrn,
                        address=item.address,
                        general_type_activity=item.general_type_activity,
                        created_at=item.created_ad
                ) for item in array]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/points-info")
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
    try:
        dict_by_token = validate_token(
            access_token=access_token,
            token_type=token_type,
        )
        if dict_by_token == 1:
            return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            return HTTPException(status_code=400, detail="Не верифицирован номер телефона")
        user_id = dict_by_token.get('id')
        return user_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/point-change")
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
    try:
        dict_by_token = validate_token(
            access_token=access_token,
            token_type=token_type,
        )
        if dict_by_token == 1:
            return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            return HTTPException(status_code=400, detail="Не верифицирован номер телефона")
        user_id = dict_by_token.get('id')
        return user_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/point-delete")
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
    try:
        dict_by_token = validate_token(
            access_token=access_token,
            token_type=token_type,
        )
        if dict_by_token == 1:
            return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            return HTTPException(status_code=400, detail="Не верифицирован номер телефона")
        user_id = dict_by_token.get('id')
        return user_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))