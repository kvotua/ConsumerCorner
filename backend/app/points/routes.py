from fastapi import APIRouter, HTTPException, Depends, Body, Header, Path
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, List

from backend.app.auth.utils import validate_token
from backend.app.database import get_session
from backend.app.config import example_jwt_token
from backend.app.enterprises.schemas import ResponseSchema
from . import crud
from .schemas import RegisterPoint, PointInfo, ChangePointSchema
from .utils import parse_time


router = APIRouter(prefix="/points", tags=["Points"])


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
    dict_by_token = validate_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == 1:
        raise HTTPException(status_code=401, detail="Невалидный тип токена или токен")
    if dict_by_token == 2:
        raise HTTPException(status_code=401, detail="Не верифицирован номер телефона")
    user_id = dict_by_token.get("id")
    enterprises_ids = await crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)
    if data_point.enterprise_id not in enterprises_ids:
        raise HTTPException(status_code=403, detail="Пользователь не владеет данной компанией")
    await crud.add_points(session=session, point_data=data_point, user_id=user_id)
    return ResponseSchema(status_code=201, detail="Точка успешно зарегистрирована")



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
    dict_by_token = validate_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == 1:
        raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
    if dict_by_token == 2:
        raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
    return await crud.get_all_points(session=session, user_id=dict_by_token.get("id"))


@router.patch("/change/{point_id}", response_model=ResponseSchema)
async def change_point(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        point_id: Annotated[int, Path(title="ID точки")],
        new_point_info: ChangePointSchema,
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
    user_id = dict_by_token.get("id")
    points_id = await crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='Пользователь не владеет данной точкой')

    point = await crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='Точка не найдена')

    await crud.update_point(session=session, point=point, point_change=new_point_info)

    return ResponseSchema(status_code=200, detail=f"Точка {point_id} успешно изменена")



@router.delete("/delete/{point_id}", response_model=ResponseSchema)
async def delete_point(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        point_id: Annotated[int, Path(title='ID точки', examples=[1])],
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
    user_id = dict_by_token.get("id")

    points_id = await crud.get_point_by_user_id(session=session, user_id=user_id)
    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='Пользователь не владеет данной точкой')

    await crud.delete_point(session=session, point=await crud.get_point_by_id(session=session, point_id=point_id))
    return ResponseSchema(status_code=200, detail="Точка успешно удалена")