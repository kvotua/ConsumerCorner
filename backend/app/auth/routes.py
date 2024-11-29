from typing import Annotated

from bcrypt import checkpw
from fastapi import APIRouter, Body, HTTPException, Response, Security, status, Query, Depends
from fastapi.responses import RedirectResponse
from fastapi_jwt import JwtAuthorizationCredentials

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .dependencies import refresh_security, email_security
from .schemas import AccessTokenSchema, TokenPairSchema, Phone, AuthSchema, Register, Login, VerifePhone
from .utils import set_access_token, set_token_pair, HttpClient, generate_code, generate_text, validate_phone, create_access_token
from .models_auth import Verification
from ConsumerCorner.backend.app.config import user_name, user_pass, send_from
from ConsumerCorner.backend.app.database import get_session
from ConsumerCorner.backend.app.models import Users


router = APIRouter(prefix="/auth", tags=["Auth"])
http_client = HttpClient()


@router.get('/get-session-sms')
async def all(session: AsyncSession = Depends(get_session)):
    data = await session.execute(select(Verification))
    array = data.scalars().all()
    return [Verification(request_id=item.request_id, sms_code=item.sms_code) for item in array]


@router.post("/send")
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
            return HTTPException(status_code=404, detail="Закончились деньги на GREENSMSAPI")
        data = Verification(request_id=response, sms_code=code, phone=number.phone)
        session.add(data)
        await session.commit()
        await session.refresh(data)
        return response
    except Exception as e:
        return HTTPException(status_code=404, detail=e)


@router.post('/check')
async def check_code(
    req_id: Annotated[str, Query(..., title='ID сессии, полученный после отправки номера')],
    sms_code: Annotated[str, Query(..., title='СМС-код, отправленный на номер')],
    #credentials: Annotated[Register, Body(..., title='Данные пользователя')],
    session: AsyncSession = Depends(get_session),
):
    try:
        stmt = select(Verification).where(Verification.request_id == req_id)
        result = await session.execute(stmt)
        response = result.scalars().first()
        if response is None:
            return HTTPException(status_code=404, detail='Невалидная сессия')
        data_by_db = {
            'request_id': response.request_id,
            'sms_code': response.sms_code,
        }
        data_by_user = {
            'request_id': req_id,
            'sms_code': sms_code,
        }
        if data_by_db != data_by_user:
            return HTTPException(status_code=404, detail='Неверный код')
        await session.delete(response)
        #register = await registration()
        return VerifePhone(phone=response.phone, phone_verif=True)
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

@router.post('/registration')
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
    return create_access_token(payload)


@router.post('/login')
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
    return create_access_token(payload)