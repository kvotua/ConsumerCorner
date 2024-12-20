from fastapi import APIRouter, Query,Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.requests import Request
from typing import Annotated
from app.services.inn_services import INNService
from app.models.inn_models import CompanyModel, IpModel
from app.core.databases.postgresdb import get_session
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/inn", tags=["inn"])

def get_inn_service() -> INNService:
    return INNService


@router.get("/inn_info")
async def result_page(
        request: Request,
        inn: Annotated[str, Query(title="ИНН", example='390000001190')],
        session: AsyncSession = Depends(get_session),
        inn_service: INNService = Depends(get_inn_service())
):
    validate_result = inn_service.validate_inn(inn)
    if not isinstance(validate_result, bool):
        return validate_result
    if len(inn) == 10:
        company_data = inn_service.fetch_company_data(inn)
        company_model = CompanyModel(
            inn=company_data.inn,
            name=company_data.name,
            ogrn=company_data.ogrn,
            address=company_data.address,
        )
    else:
        company_data = inn_service.fetch_ip_data(inn)
        company_model = IpModel(
            inn=company_data.inn,
            fio=company_data.fio,
            ogrn=company_data.ogrn,
            address=company_data.address,
        )
    try:
        session.add(company_model)
        await session.commit()
        await session.refresh(company_model)
    except Exception as e:
        if isinstance(e, IntegrityError):
            print('Такой пользователь уже существует')
    return company_data