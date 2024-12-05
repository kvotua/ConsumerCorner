from typing import Annotated
from fastapi import APIRouter, Body, HTTPException, Depends, Header

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from urllib3.util.wait import select_wait_for_socket

from .schemas import Phone, Register, Login, VerifePhone, ReqID, AccessTokenInfo, TokenPair
from .utils import HttpClient, generate_code, generate_text, validate_phone, create_access_token, hash_password, validate_password, create_tokens_pair, decode_access_token, decode_refresh_token
from .models_auth import Verification
from backend.app.config import user_name, user_pass, send_from
from backend.app.database import get_session
from backend.app.models import Users


router = APIRouter(prefix="/auth", tags=["Auth"])
http_client = HttpClient()


@router.post('/refresh')
async def refresh_tokens(
        refresh_token: Annotated[str, Header(
            title='Refresh JWT токен',
            example='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzM1OTIxMzg5LCJ0eXBlIjoicmVmcmVzaCJ9.SDZcJf2hmbnYYer5R-VZKyQL2ztSu3WgzcZ6tFojx38',
        )],
        session: AsyncSession = Depends(get_session),
):
    try:
        token_data = decode_refresh_token(refresh_token)
        if isinstance(token_data, str):
            return HTTPException(status_code=401, detail=token_data)
        response = select(Users).where(Users.id == token_data.get("id"))
        result = await session.execute(response)
        data_by_db = result.scalars().first()
        payload = {
            'id': data_by_db.id,
            'phone': data_by_db.phone,
            'fio': data_by_db.fio,
        }
        jwt_tokens = create_tokens_pair(payload)
        return TokenPair(
            access_token=jwt_tokens.get("access_token"),
            refresh_token=jwt_tokens.get("refresh_token")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/get-sessions-sms')
async def all(session: AsyncSession = Depends(get_session)):
    data = await session.execute(select(Verification))
    array = data.scalars().all()
    return [Verification(request_id=item.request_id, sms_code=item.sms_code, phone=item.phone) for item in array]


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
            raise HTTPException(status_code=400, detail='Номер телефона уже зарегистрирован')
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
        await http_client.close_session()
        if response is None:
            raise HTTPException(status_code=400, detail="Закончились деньги на GREENSMSAPI")
        data = Verification(request_id=response, sms_code=code, phone=number.phone)
        session.add(data)
        await session.commit()
        await session.refresh(data)
        return ReqID(req_id=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


@router.post('/check', response_model=VerifePhone)
async def check_code(
    req_id: Annotated[str, Body(..., title='ID сессии, полученный после отправки номера', examples=['79442f1f-17a8-42bb-9f6f-4affc8788e7e'], min_length=36, max_length=36)],
    sms_code: Annotated[str, Body(..., title='СМС-код, отправленный на номер', examples=['12345'], min_length=5, max_length=5)],
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
            raise HTTPException(status_code=400, detail='Неверный код')
        await session.delete(response)
        return VerifePhone(phone=response.phone, phone_verif=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/registration', response_model=AccessTokenInfo)
async def registration(data: Annotated[Register, Body()], session: AsyncSession = Depends(get_session)) -> str:
    stmt = select(Users).where(Users.phone == data.phone)
    result = await session.execute(stmt)
    user = result.scalars().first()
    if user:
        raise HTTPException(status_code=400, detail='Номер телефона уже зарегистрирован')
    
    data_for_db = Users(
        phone=data.phone,
        password=hash_password(data.password).decode('utf-8'),
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
    return AccessTokenInfo(access_token=create_access_token(payload), token_type="Baerer")


@router.post('/login', response_model=TokenPair)
async def login(data: Login, session: AsyncSession = Depends(get_session)):
    stmt = select(Users).where(Users.phone == data.phone)
    result = await session.execute(stmt)
    data_by_db = result.scalars().first()
    
    if data_by_db is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    if not validate_password(data.password, data_by_db.password.encode('utf-8')):
        raise HTTPException(status_code=404, detail="Неверный пароль")
    payload = {
        'id': data_by_db.id,
        'phone': data_by_db.phone,
        'fio': data_by_db.fio,
    }
    jwt_tokens = create_tokens_pair(payload)
    return TokenPair(
        access_token=jwt_tokens.get("access_token"),
        refresh_token=jwt_tokens.get("refresh_token")
    )