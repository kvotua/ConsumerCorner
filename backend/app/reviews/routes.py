from fastapi import APIRouter, HTTPException, Depends, Header, Path, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from backend.app.auth.utils import validate_token
from backend.app.database import get_session
from backend.app.config import example_jwt_token
from .schemas import CommentData, ResponseSchema, CommentsSchema
from . import crud


router = APIRouter(prefix='/reviews', tags=['Reviews'])


@router.post("/{point_id}")
async def add_review(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
    token_type: Annotated[str, Header(
        title='Тип токена',
        example='Baerer')],
    point_id: Annotated[int, Path()],
    comment_data: CommentData,
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
    await crud.add_comment(session=session, point_id=point_id, comment_data=comment_data)
    return ResponseSchema(status_code=200, detail="OK")


@router.get("/{point_id}")
async def get_reviews(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
    token_type: Annotated[str, Header(
        title='Тип токена',
        example='Baerer')],
    point_id_path: Annotated[int, Query(title="ID точки", examples=[1])],
    session: AsyncSession = Depends(get_session),
) -> list[CommentsSchema]:
    dict_by_token = validate_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == 1:
        raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
    if dict_by_token == 2:
        raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
    if point_id_path not in await crud.get_points_id(session=session):
        raise HTTPException(status_code=404, detail="Точка не найдена")
    return await crud.get_all_comments(session=session, point_id=point_id_path)