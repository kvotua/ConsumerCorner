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
    user_id = dict_by_token.get('id')
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



@router.put("/change", response_model=ResponseSchema)
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
    response = await session.execute(select(Users).where(Users.id == dict_by_token.get("id")))
    user = response.scalars().first()
    if user:
        if user.phone != user_data.new_phone:
            user.phone = user_data.new_phone
            user.verify_phone = False
        user.fio = user_data.new_fio
        if user.email != user_data.new_email:
            user.email = user_data.new_email
            user.verify_email = False

        await session.commit()
        return ResponseSchema(status_code=200, detail="Успешное изменение")
    else:
        raise HTTPException(status_code=404, detail="Не найден пользователь")


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