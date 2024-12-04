from fastapi import APIRouter, HTTPException, Depends, Query, Header
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from backend.app.auth.schemas import TokenInfo
from backend.app.auth.utils import decode_access_token
from backend.app.users.schemas import UserSchema
from backend.app.database import get_session
from backend.app.models import Users


router = APIRouter(prefix="/users", tags=["Users"])


@router.get(
    "/me",
)
async def get_users_me(
    credentials: Annotated[TokenInfo, Query()],
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = decode_access_token(credentials.access_token)
    user_id = dict_by_token.get('id')
    if user_id is None:
        raise HTTPException(status_code=401, detail='Не удалось декодировать токен')
    response = select(Users).where(Users.id == user_id)
    result = await session.execute(response)
    user = result.scalars().first()

    if user is None:
            raise HTTPException(status_code=404, detail='Такой пользователь не найден')
    return UserSchema(
        id=user.id,
        phone=user.phone,
        fio=user.fio,
        email=user.email,
        verify_phone=user.verify_phone,
        verify_email=user.verify_email,
    )
