from fastapi import APIRouter, Body, HTTPException, Response, Security, status, Query
from fastapi.requests import Request
from .services import fetch_company_data,fetch_ip_data
from .utils import validate_inn


router = APIRouter(prefix="/inn_service", tags=["inn_service"])



@router.get("/result")
async def result_page(request: Request, inn: str):


    if not validate_inn(inn):
        raise HTTPException(status_code=400, detail="Неверный ИНН")
    if len(inn) == 10:
        company_data = fetch_company_data(inn)
    else:
        company_data = fetch_ip_data(inn)
    if not company_data:
        raise HTTPException(status_code=404, detail="Данные не найдены")


    return company_data