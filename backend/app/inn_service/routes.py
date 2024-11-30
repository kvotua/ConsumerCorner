from fastapi import APIRouter, Body, HTTPException, Response, Security, status, Query,Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.requests import Request
from .services import INNService
from backend.app.config import token
from .models import CompanyModel, IpModel
from backend.app.database import get_session
from sqlalchemy.exc import IntegrityError
from sqlalchemy.future import select


router = APIRouter(prefix="/inn_service", tags=["inn_service"])

def get_inn_service() -> INNService:
    return INNService
@router.get("/inn_info")
async def result_page(request: Request, inn: str,session: AsyncSession = Depends(get_session),inn_service: INNService = Depends(get_inn_service())):
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