from fastapi import APIRouter, Depends, HTTPException, Body, Request
from typing import Annotated, List
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.databases.postgresdb import get_session
from app.schemas.enterprises_schemas import RegisterCompany, ResponseSchema, EnterpriseInfo
from app.services.auth_handler import decode_jwt
from app.core.cruds import enterprises_crud
from app.services.auth_bearer import dependencies

router = APIRouter(
    prefix='/enterprises',
    tags=['Enterprises'],
)


@router.post("/register-enterprise", response_model=ResponseSchema, dependencies=dependencies)
async def register_company(
        request: Request,
        data_company: Annotated[RegisterCompany, Body()],
        session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])
    if await enterprises_crud.add_enterprise(session=session, data=data_company, user_id=dict_by_token.get("id")) is True:
        return ResponseSchema(status_code=200, detail="Успешная регистрация")
    raise HTTPException(status_code=500, detail="Неудачная регистрация компании")


@router.get("/enterprises-info", response_model=List[EnterpriseInfo])
async def get_companies_info(
        request: Request,
        session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt(token_list[1])
    result = await enterprises_crud.get_all_enterprises_by_id(session=session, user_id=dict_by_token.get("id"))
    if result is None:
        raise HTTPException(status_code=404, detail="Компании не найдены")
    return result