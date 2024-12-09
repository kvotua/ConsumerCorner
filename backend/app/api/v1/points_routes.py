from fastapi import APIRouter, HTTPException, Depends, Body, Path, Request
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, List

from app.core.databases.postgresdb import get_session
from app.schemas.enterprises_schemas import ResponseSchema
from app.schemas.points_schemas import RegisterPoint, PointInfo, ChangePointSchema
from app.services.auth_handler import decode_jwt
from app.core.cruds import points_crud
from app.services.auth_bearer import dependencies



router = APIRouter(prefix="/points", tags=["Points"])


@router.post("/register", response_model=ResponseSchema, dependencies=dependencies)
async def register_point(
        request: Request,
        data_point: Annotated[RegisterPoint, Body()],
        session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])
    user_id = dict_by_token.get("id")
    enterprises_ids = await points_crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)
    if data_point.enterprise_id not in enterprises_ids:
        raise HTTPException(status_code=403, detail="Пользователь не владеет данной компанией")
    await points_crud.add_points(session=session, point_data=data_point, user_id=user_id)
    return ResponseSchema(status_code=201, detail="Точка успешно зарегистрирована")



@router.get("/", response_model=List[PointInfo])
async def get_points_info(
        request: Request,
        session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])
    return await points_crud.get_all_points(session=session, user_id=dict_by_token.get("id"))


@router.patch("/change/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def change_point(
        request: Request,
        point_id: Annotated[int, Path(title="ID точки")],
        new_point_info: ChangePointSchema,
        session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])
    user_id = dict_by_token.get("id")
    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='Пользователь не владеет данной точкой')

    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='Точка не найдена')

    await points_crud.update_point(session=session, point=point, point_change=new_point_info)

    return ResponseSchema(status_code=200, detail=f"Точка {point_id} успешно изменена")



@router.delete("/delete/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_point(
        request: Request,
        point_id: Annotated[int, Path(title='ID точки', examples=[1])],
        session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])
    user_id = dict_by_token.get("id")

    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)
    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='Пользователь не владеет данной точкой')

    await points_crud.delete_point(session=session, point=await crud.get_point_by_id(session=session, point_id=point_id))
    return ResponseSchema(status_code=200, detail="Точка успешно удалена")