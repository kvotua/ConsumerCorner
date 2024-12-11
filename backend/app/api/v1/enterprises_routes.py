from fastapi import APIRouter, Depends, HTTPException, Body, Request
from typing import Annotated, List
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.databases.postgresdb import get_session
from app.schemas.enterprises_schemas import RegisterCompany, ResponseSchema, EnterpriseInfo
from app.core.cruds import enterprises_crud
from app.services.auth_bearer import dependencies
from app.services.auth_handler import get_token_data, get_token_data_verify

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
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    if await enterprises_crud.add_enterprise(session=session, data=data_company, user_id=dict_by_token.get("id")) is True:
        return ResponseSchema(status_code=200, detail="Успешная регистрация")
    raise HTTPException(status_code=500, detail="Неудачная регистрация компании")


@router.get("/enterprises-info", response_model=List[EnterpriseInfo], dependencies=dependencies)
async def get_companies_info(
        request: Request,
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    result = await enterprises_crud.get_all_enterprises_by_id(session=session, user_id=dict_by_token.get("id"))
    if result is None:
        raise HTTPException(status_code=404, detail="Компании не найдены")
    return result