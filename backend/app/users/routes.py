from fastapi import APIRouter, HTTPException, Depends, Query, Header
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from backend.app.auth.utils import decode_access_token
from backend.app.users.schemas import UserSchema
from backend.app.database import get_session
from backend.app.models import Users


router = APIRouter(prefix="/users", tags=["Users"])


@router.get(
    "/me",
)
async def get_users_me(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')],
    token_type: Annotated[str, Header(
        title='Тип токена',
        example='Baerer')],
    session: AsyncSession = Depends(get_session),
):
    try:
        if token_type != "Baerer":
            return HTTPException(status_code=400, detail="Невалидный тип токена")
        dict_by_token = decode_access_token(access_token)

        if isinstance(dict_by_token, str):
            return HTTPException(status_code=401, detail=dict_by_token)

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