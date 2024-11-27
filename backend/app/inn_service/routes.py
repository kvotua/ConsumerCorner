from fastapi import APIRouter, Body, HTTPException, Response, Security, status, Query
from fastapi.requests import Request
from .services import INNService
from ConsumerCorner.backend.app.config import token


router = APIRouter(prefix="/inn_service", tags=["inn_service"])
inn_service = INNService(token)
@router.get("/inn_info")
async def result_page(request: Request, inn: str):
    validate_result = inn_service.validate_inn(inn)
    if not isinstance(validate_result, bool):
        return validate_result
    if len(inn) == 10:
        company_data = inn_service.fetch_company_data(inn)
    else:
        company_data = inn_service.fetch_ip_data(inn)
    return company_data