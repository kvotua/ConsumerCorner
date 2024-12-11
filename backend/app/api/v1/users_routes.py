from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.databases.postgresdb import get_session
from app.services.auth_handler import decode_jwt
from app.schemas.enterprises_schemas import ResponseSchema
from app.schemas.users_schemas import ChangeUserSchema, UserSchema
from app.core.cruds import users_crud
from app.services.auth_bearer import dependencies


router = APIRouter(prefix="/profile", tags=["Profile"], dependencies=dependencies)


@router.get("/me", response_model=UserSchema)
async def get_users_me(
    request: Request,
    session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])
    return await users_crud.get_user_by_id(session=session, user_id=dict_by_token.get("id"))


@router.patch("/change", response_model=ResponseSchema)
async def get_users_me(
    request: Request,
    user_data: ChangeUserSchema,
    session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])

    user = await users_crud.get_user_by_id(session=session, user_id=dict_by_token.get("id"))
    await users_crud.update_user(
        session=session,
        user=user,
        update_user_data=user_data,
    )
    return ResponseSchema(status_code=200, detail="Успешное изменение")

@router.get("/all")
async def get_all_users(
        session: AsyncSession = Depends(get_session),
):
    return await users_crud.get_all_users(session=session)


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
