from fastapi import APIRouter, Header, Depends, HTTPException, Body
from typing import Annotated

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.config import example_jwt_token
from backend.app.database import get_session
from backend.app.models import UserEnterprisesRole, Enterprises
from backend.app.auth.utils import validate_token
from .schemas import RegisterCompany, RegisterPoint


router = APIRouter(
    prefix='/enterprises',
    tags=['Enterprises'],
)


# @router.post("/get-to-user-role")
# async def get_to_user_role(
#         access_token: Annotated[str, Header(
#             title="Access-JWT токен",
#             example=example_jwt_token,
#         )],
#         token_type: Annotated[str, Header(
#             title='Тип токена',
#             example='Baerer')],
#         session: AsyncSession = Depends(get_session),
# ):
#     try:
#         dict_by_token = validate_token(
#             access_token=access_token,
#             token_type=token_type,
#         )
#         if dict_by_token is True:
#             return HTTPException(status_code=400, detail="Невалидный тип токена или токен")
#         user_id = dict_by_token.get('id')
#         data_for_db = UserEnterprisesRole()
#
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))



@router.post("/register_company")
async def register_company(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        data_company: Annotated[RegisterCompany, Body()],
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
        if len(data_company.inn) == 10:

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/register_trade_point")
async def register_trade_point(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        data_point: Annotated[RegisterPoint, Body()],
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
        return user_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/companies-info")
async def get_companies_info(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
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
        response = select(Enterprises).where(Enterprises.create_id == user_id)
        result = await session.execute(response)
        array = result.scalars().all()
        return

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/points-info")
async def get_companies_info(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
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
        return user_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/point-change")
async def get_companies_info(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
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
        return user_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/point-delete")
async def get_companies_info(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
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
        return user_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))