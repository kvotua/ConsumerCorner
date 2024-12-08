from fastapi import APIRouter, HTTPException, Depends, Body, Header, Path
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, List
from sqlalchemy import delete

from backend.app.auth.utils import validate_token
from backend.app.database import get_session
from backend.app.config import example_jwt_token
from backend.app.models import Points
from backend.app.enterprises.schemas import ResponseSchema
from backend.app import crud
from .schemas import RegisterPoint, PointInfo, ChangePointSchema
from .utils import parse_time


router = APIRouter(prefix="/points", tags=["Points"])


async def add_point(session, point_data):
    return await crud.add_points(session=session, point_data=point_data)


@router.post("/register", response_model=ResponseSchema)
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
            raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
        data_for_db = Points(
            enterprise_id=data_point.enterprise_id,
            create_id=dict_by_token.get("id"),
            title=data_point.title,
            address=data_point.address,
            opening_time=parse_time(data_point.opening_time),
            closing_time=parse_time(data_point.closing_time),
            phone=data_point.phone,
            type_activity=data_point.type_activity,
        )
        session.add(data_for_db)
        await session.commit()
        return ResponseSchema(status_code=201, detail="Точка успешно зарегистрирована")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=List[PointInfo])
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
            raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
        response = select(Points).where(Points.create_id == dict_by_token.get("id"))
        result = await session.execute(response)
        array = result.scalars().all()
        return [PointInfo(
            id=item.id,
            title=item.title,
            enterprise_id=item.enterprise_id,
            address=item.address,
            opening_time=item.opening_time,
            closing_time=item.closing_time,
            phone=item.phone,
            type_activity=item.type_activity,
            middle_stars=item.middle_stars,
            verify_phone=item.verify_phone,
            created_at=item.created_at,
        )for item in array]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/change/{point_id}", response_model=ResponseSchema)
async def change_point(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        point_id: Annotated[str, Path(title="ID точки")],
        new_point_info: ChangePointSchema,
        session: AsyncSession = Depends(get_session),
):
    try:
        dict_by_token = validate_token(
            access_token=access_token,
            token_type=token_type,
        )
        if dict_by_token == 1:
            raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
        if dict_by_token == 2:
            raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
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
            return ResponseSchema(status_code=201, detail="Успешное изменение")
        else:
            raise HTTPException(status_code=404, detail="Не найдена точка")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete/{point_id}", response_model=ResponseSchema)
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
        raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
    if dict_by_token == 2:
        raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")

    for_delete = delete(Points).where(Points.id == int(point_id), Points.create_id == dict_by_token.get('id'))
    result = await session.execute(for_delete)

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Запись не найдена или не может быть удалена")

    await session.commit()
    return ResponseSchema(status_code=200, detail="Точка успешно удалена")