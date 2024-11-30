from typing import Annotated

from bcrypt import checkpw
from fastapi import APIRouter, Body, HTTPException, Response, Security, status, Query, Depends, Path
from fastapi.responses import RedirectResponse
from fastapi_jwt import JwtAuthorizationCredentials

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .schemas import Phone, Register, Login, VerifePhone, ReqID, AccessJWTToken
from .utils import set_access_token, set_token_pair, HttpClient, generate_code, generate_text, validate_phone, create_access_token
from .models_auth import Verification
from backend.app.config import user_name, user_pass, send_from
from backend.app.database import get_session
from backend.app.models import Users


router = APIRouter(prefix="/auth", tags=["Auth"])
http_client = HttpClient()


@router.get('/get-sessions-sms')
async def all(session: AsyncSession = Depends(get_session)):
    data = await session.execute(select(Verification))
    array = data.scalars().all()
    return [Verification(request_id=item.request_id, sms_code=item.sms_code) for item in array]


@router.post("/send", response_model=ReqID)
async def send_message(
    number: Phone,
    session: AsyncSession = Depends(get_session)
    ):
    try:
        phone = validate_phone(number.phone)
        stmt = select(Users).where(Users.phone == phone)
        result = await session.execute(stmt)
        user = result.scalars().first()
        if user:
            raise HTTPException(status_code=404, detail='Номер телефона уже зарегистрирован')
        code = generate_code()
        params = {
        'to': number.phone,
        'txt': generate_text(code),
        'from': send_from,
        'user': str(user_name),
        'pass': str(user_pass),
        }
        response = await http_client.send_message(
            'https://api3.greensms.ru/sms/send',
            data=params,
        )
        if response is None:
            raise HTTPException(status_code=404, detail="Закончились деньги на GREENSMSAPI")
        data = Verification(request_id=response, sms_code=code, phone=number.phone)
        session.add(data)
        await session.commit()
        await session.refresh(data)
        return ReqID(req_id=response)
    except Exception as e:
        raise HTTPException(status_code=404, detail=e)


@router.post('/check', response_model=VerifePhone)
async def check_code(
    req_id: Annotated[str, Query(..., title='ID сессии, полученный после отправки номера', examples=['79442f1f-17a8-42bb-9f6f-4affc8788e7e'], min_length=36, max_length=36)],
    sms_code: Annotated[str, Query(..., title='СМС-код, отправленный на номер', example='12345', min_length=5, max_length=5)],
    session: AsyncSession = Depends(get_session),
):
    try:
        stmt = select(Verification).where(Verification.request_id == req_id)
        result = await session.execute(stmt)
        response = result.scalars().first()
        if response is None:
            raise HTTPException(status_code=404, detail='Невалидная сессия')
        data_by_db = {
            'request_id': response.request_id,
            'sms_code': response.sms_code,
        }
        data_by_user = {
            'request_id': req_id,
            'sms_code': sms_code,
        }
        if data_by_db != data_by_user:
            raise HTTPException(status_code=404, detail='Неверный код')
        await session.delete(response)
        return VerifePhone(phone=response.phone, phone_verif=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/registration', response_model=AccessJWTToken)
async def registration(data: Annotated[Register, Body()], session: AsyncSession = Depends(get_session)) -> str:
    data_for_db = Users(
        phone=data.phone,
        password=data.password,
        fio=data.fio,
        verify_phone=True
    )
    session.add(data_for_db)
    await session.commit()
    await session.refresh(data_for_db)
    stmt = select(Users.id).where(Users.phone == data.phone)
    result = await session.execute(stmt)
    user_id = result.scalars().first()
    payload = {
        'id': user_id,
        'phone': data.phone,
        'fio': data.fio,
    }
    return AccessJWTToken(access_token=create_access_token(payload))


@router.post('/login', response_model=AccessJWTToken)
async def login(data: Login, session: AsyncSession = Depends(get_session)):
    stmt = select(Users).where(Users.phone == data.phone)
    result = await session.execute(stmt)
    data_by_db = result.scalar_one_or_none()
    if data_by_db is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    payload = {
        'id': data_by_db.id,
        'phone': data_by_db.phone,
        'fio': data_by_db.phone,
    }
    return AccessJWTToken(access_token=create_access_token(payload))