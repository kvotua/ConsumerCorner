from fastapi import APIRouter, HTTPException, Depends, Header, Path
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from backend.app.auth.utils import validate_token
from backend.app.database import get_session
from backend.app.models import Comments
from backend.app.config import example_jwt_token
from .schemas import CommentData


router = APIRouter(prefix='/reviews', tags=['Reviews'])


@router.post("/{point_id}")
async def add_review(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
    token_type: Annotated[str, Header(
        title='Тип токена',
        example='Baerer')],
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
    response = Comments(text=comment_data.text, stars=comment_data.stars)
    session.add(response)
    await session.commit()
    return HTTPException(status_code=201 , detail="Комментарий успешно добавлен")



@router.get("/{point_id}")
async def get_reviews(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
    token_type: Annotated[str, Header(
        title='Тип токена',
        example='Baerer')],
    point_id_path: Annotated[str, Path(title="ID точки", examples=[1])],
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

    response = select(Comments).where(Comments.point_id == int(point_id_path))
    result = await session.execute(response)
    array_comments = result.scalars().all()
    return [Comments(
        id=item.id, point_id=item.point_id,
        text=item.text, stars=item.stars,
        create_at=item.created_at)
        for item in array_comments]