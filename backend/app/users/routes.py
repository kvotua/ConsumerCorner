from fastapi import APIRouter, HTTPException, Depends, Body, Header, Path
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from backend.app.auth.utils import validate_token
from backend.app.database import get_session
from backend.app.models import Users
from backend.app.config import example_jwt_token
from backend.app.enterprises.schemas import ResponseSchema
from .schemas import ChangeUserSchema, UserSchema
from . import crud


router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/me", response_model=UserSchema)
async def get_users_me(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
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
    return await crud.get_user_by_id(session=session, user_id=dict_by_token.get("id"))


@router.patch("/change", response_model=ResponseSchema)
async def get_users_me(
    access_token: Annotated[str, Header(
        title='jwt_token пользователя',
        example=example_jwt_token)],
    token_type: Annotated[str, Header(
        title='Тип токена',
        example='Baerer')],
    user_data: ChangeUserSchema,
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
    user = await crud.get_user_by_id(session=session, user_id=dict_by_token.get("id"))
    await crud.update_user(
        session=session,
        user=user,
        update_user_data=user_data,
    )
    return ResponseSchema(status_code=200, detail="Успешное изменение")


# @router.post("/docs/add")
# async def add_docs(
#     access_token: Annotated[str, Header(
#         title='jwt_token пользователя',
#         example=example_jwt_token)],
#     token_type: Annotated[str, Header(
#         title='Тип токена',
#         example='Baerer')],
#     session: AsyncSession = Depends(get_session),
# ):
#     dict_by_token = validate_token(
#         access_token=access_token,
#         token_type=token_type,
#     )
#     if dict_by_token == 1:
#         raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
#     if dict_by_token == 2:
#         raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
#     user_id = dict_by_token.get('id')
#     return user_id
#
#
# @router.get("/docs/get")
# async def get_docs(
#     access_token: Annotated[str, Header(
#         title='jwt_token пользователя',
#         example=example_jwt_token)],
#     token_type: Annotated[str, Header(
#         title='Тип токена',
#         example='Baerer')],
#     session: AsyncSession = Depends(get_session),
# ):
#     dict_by_token = validate_token(
#         access_token=access_token,
#         token_type=token_type,
#     )
#     if dict_by_token == 1:
#         raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
#     if dict_by_token == 2:
#         raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
#     user_id = dict_by_token.get('id')
#     return user_id
#
#
# @router.delete("/docs/delete")
# async def delete_docs(
#     access_token: Annotated[str, Header(
#         title='jwt_token пользователя',
#         example=example_jwt_token)],
#     token_type: Annotated[str, Header(
#         title='Тип токена',
#         example='Baerer')],
#     session: AsyncSession = Depends(get_session),
# ):
#     dict_by_token = validate_token(
#         access_token=access_token,
#         token_type=token_type,
#     )
#     if dict_by_token == 1:
#         raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
#     if dict_by_token == 2:
#         raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
#     user_id = dict_by_token.get('id')
#     return user_id
#
#
# @router.post("/social-links/add")
# async def add_social_links(
#     access_token: Annotated[str, Header(
#         title='jwt_token пользователя',
#         example=example_jwt_token)],
#     token_type: Annotated[str, Header(
#         title='Тип токена',
#         example='Baerer')],
#     session: AsyncSession = Depends(get_session),
# ):
#     dict_by_token = validate_token(
#         access_token=access_token,
#         token_type=token_type,
#     )
#     if dict_by_token == 1:
#         raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
#     if dict_by_token == 2:
#         raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
#
#
# @router.get("/social-links/{user_id}")
# async def get_social_links(
#     access_token: Annotated[str, Header(
#         title='jwt_token пользователя',
#         example=example_jwt_token)],
#     token_type: Annotated[str, Header(
#         title='Тип токена',
#         example='Baerer')],
#     user_id: Annotated[str, Path(title="ID пользователя", examples=[1])],
#     session: AsyncSession = Depends(get_session),
# ):
#     dict_by_token = validate_token(
#         access_token=access_token,
#         token_type=token_type,
#     )
#     if dict_by_token == 1:
#         raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
#     if dict_by_token == 2:
#         raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")
#
#
# @router.delete("/social-links/delete")
# async def delete_social_links(
#     access_token: Annotated[str, Header(
#         title='jwt_token пользователя',
#         example=example_jwt_token)],
#     token_type: Annotated[str, Header(
#         title='Тип токена',
#         example='Baerer')],
#     session: AsyncSession = Depends(get_session),
# ):
#     dict_by_token = validate_token(
#         access_token=access_token,
#         token_type=token_type,
#     )
#     if dict_by_token == 1:
#         raise HTTPException(status_code=400, detail="Невалидный тип токена или токен")
#     if dict_by_token == 2:
#         raise HTTPException(status_code=400, detail="Не верифицирован номер телефона")