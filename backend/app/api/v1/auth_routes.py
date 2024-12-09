from typing import Annotated
from fastapi import APIRouter, Body, HTTPException, Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.services.auth_handler import set_token_pair, decode_refresh_jwt, sign_jwt
from backend.app.schemas.schemas_verify import Register, Login, TokenPair
from backend.app.services.verify_services import validate_password
from backend.app.core.databases.postgresdb import get_session
from backend.app.config import example_jwt_token
from backend.app.core.cruds.users_crud import get_user_by_id
from backend.app.core.cruds import verify_crud


router = APIRouter(tags=['auth'])


@router.post('/registration', response_model=TokenPair)
async def registration(
        data: Annotated[Register, Body()],
        session: AsyncSession = Depends(get_session)
):
    if await verify_crud.get_verify_phone(session=session, phone=data.phone):
        raise HTTPException(status_code=400, detail='Номер телефона уже зарегистрирован')

    await verify_crud.sing_up_user(session=session, data=data)

    user_data = await verify_crud.get_user_by_phone(session=session, phone=data.phone)
    payload = {
        'id': user_data.id,
        'phone': data.phone,
        'fio': data.fio,
        'verify_phone': user_data.verify_phone,
    }

    jwt_tokens = set_token_pair(payload)
    return TokenPair(
        access_token=jwt_tokens.get("access_token"),
        refresh_token=jwt_tokens.get("refresh_token")
    )


@router.post('/login', response_model=TokenPair)
async def login(
        data: Login,
        session: AsyncSession = Depends(get_session)
):
    data_by_db = await verify_crud.get_user_by_phone(session=session, phone=data.phone)

    if data_by_db is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if not validate_password(data.password, data_by_db.password.encode('utf-8')):
        raise HTTPException(status_code=404, detail="Неверный пароль")
    payload = {
        'id': data_by_db.id,
        'phone': data_by_db.phone,
        'fio': data_by_db.fio,
        'verify_phone': data_by_db.verify_phone,
    }
    jwt_tokens = set_token_pair(payload)
    return TokenPair(
        access_token=jwt_tokens.get("access_token"),
        refresh_token=jwt_tokens.get("refresh_token")
    )


@router.post('/refresh', response_model=TokenPair)
async def refresh_tokens(
        refresh_token: Annotated[str, Header(
            title='Refresh JWT токен',
            example=example_jwt_token,
        )],
        session: AsyncSession = Depends(get_session),
):
    token_data = decode_refresh_jwt(refresh_token)
    if token_data is None:
        raise HTTPException(status_code=401, detail=token_data)
    data_by_db = await get_user_by_id(session=session, user_id=token_data.get("id"))
    payload = {
        'id': data_by_db.id,
        'phone': data_by_db.phone,
        'fio': data_by_db.fio,
        'verify_phone': data_by_db.verify_phone,
    }
    jwt_token = sign_jwt(payload)
    return TokenPair(
        access_token=jwt_token,
        refresh_token=refresh_token,
    )