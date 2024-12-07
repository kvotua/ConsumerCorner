from fastapi import APIRouter, Header, Depends, HTTPException, Body, Path
from typing import Annotated

from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.config import example_jwt_token
from backend.app.database import get_session
from backend.app.models import Enterprises, Points
from backend.app.auth.utils import validate_token
from .schemas import RegisterCompany, RegisterPoint, ResponseSchema, PointInfo
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
        response = select(Enterprises.id).where(Enterprises.inn == data_company.inn)
        result = await session.execute(response)
        return ResponseSchema(status_code=200, detail=result.scalars().first())

    except Exception as e:
        return ResponseSchema(status_code=500, detail=str(e))


@router.post("/register-point", response_model=ResponseSchema)
async def register_point(
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
            enterprise_id=data_point.enterpise_id,
            create_id=dict_by_token.get("id"),
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
    return [Enterprises(id=item.id, name=item.name,
                    type=item.type, create_id=user_id,
                    inn=item.inn, ogrn=item.ogrn,
                    address=item.address,
                    general_type_activity=item.general_type_activity,
                    created_at=item.created_at,
        )for item in array]



@router.get("/points-info")
async def get_points_info(
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
        response = select(Points).where(Points.create_id == dict_by_token.get("id"))
        result = await session.execute(response)
        array = result.scalars().all()
        return [Points(id=item.id, enterprise_id=item.enterprise_id,
                       title=item.title, address=item.address,
                       opening_time=item.opening_time,
                       closing_time=item.closing_time,
                       phone=item.phone, type_activity=item.type_activity,
                       middle_stars=item.middle_stars,
                       verify_phone=item.verify_phone,
                       created_at=item.created_at,
                       )for item in array]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/point-change/{point_id}")
async def change_point(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        point_id: Annotated[str, Path(title="ID точки")],
        new_point_info: PointInfo,
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
        response = await session.execute(select(Points).where(Points.id == int(point_id)))
        point = response.scalars().first()
        if point:
            point.title=new_point_info.title
            point.address=new_point_info.address
            point.opening_time=parse_time(new_point_info.opening_time)
            point.closing_time=parse_time(new_point_info.closing_time)
            point.phone=new_point_info.phone
            point.type_activity=new_point_info.type_activity
            await session.commit()
            return HTTPException(status_code=200, detail="Успешное изменение")
        else:
            return HTTPException(status_code=404, detail="Не найдена точка")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/point-delete/{point_id}", response_model=ResponseSchema)
async def delete_point(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        point_id: Annotated[str, Path(title='ID точки', examples=[1])],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = validate_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == 1:
        return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
    if dict_by_token == 2:
        return HTTPException(status_code=400, detail="Не верифицирован номер телефона")

    for_delete = delete(Points).where(Points.id == int(point_id), Points.create_id == dict_by_token.get('id'))
    result = await session.execute(for_delete)

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Запись не найдена или не может быть удалена")

    await session.commit()
    return ResponseSchema(status_code=200, detail="Точка успешно удалена")