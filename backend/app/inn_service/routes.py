from fastapi import APIRouter, Body, HTTPException, Response, Security, status, Query
from fastapi.requests import Request
from .services import INNService
from .config import token


router = APIRouter(prefix="/inn_service", tags=["inn_service"])
inn_service = INNService(token)
@router.get("/result")
async def result_page(request: Request, inn: str):


    if not inn_service.validate_inn(inn):
        raise HTTPException(status_code=400, detail="Неверный ИНН")
    if len(inn) == 10:
        company_data = inn_service.fetch_company_data(inn)
    else:
        company_data = inn_service.fetch_ip_data(inn)
    if not company_data:
        raise HTTPException(status_code=404, detail="Данные не найдены")


    return company_data