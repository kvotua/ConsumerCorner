from fastapi import APIRouter, HTTPException, Depends, Query, Header
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from backend.app.auth.utils import validate_token
from backend.app.users.schemas import UserSchema
from backend.app.database import get_session
from backend.app.models import Users
from backend.app.config import example_jwt_token


router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get(
    "/me",
)
async def get_users_me(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
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
        response = select(Users).where(Users.id == user_id)
        result = await session.execute(response)
        user = result.scalars().first()
        if user is None:
            return HTTPException(status_code=404, detail='Такой пользователь не найден')

        return UserSchema(
            id=user.id,
            phone=user.phone,
            fio=user.fio,
            email=user.email,
            verify_phone=user.verify_phone,
            verify_email=user.verify_email,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put(
    "/me/change",
)
async def get_users_me(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
    token_type: Annotated[str, Header(
        title='Тип токена',
        example='Baerer')],
    session: AsyncSession = Depends(get_session),
):
    pass