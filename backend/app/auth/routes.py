from typing import Annotated
from fastapi import APIRouter, Body, HTTPException, Depends, Header

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .crud import add_verify_session, get_verify_session
from .schemas import Register, Login, VerifePhone, ReqID, TokenPair
from .utils import HttpClient, generate_code, generate_text, validate_phone, validate_password, create_tokens_pair, decode_refresh_token, decode_access_token
from .models_auth import Verification
from backend.app.config import user_name, user_pass, send_from, example_jwt_token
from backend.app.database import get_session
from backend.app.users.crud import get_user_by_id
from . import crud


router = APIRouter(prefix="/auth", tags=["Auth"])
http_client = HttpClient()


@router.post('/refresh', response_model=TokenPair)
async def refresh_tokens(
        refresh_token: Annotated[str, Header(
            title='Refresh JWT токен',
            example=example_jwt_token,
        )],
        session: AsyncSession = Depends(get_session),
):
    token_data = decode_refresh_token(refresh_token)
    if isinstance(token_data, str):
        raise HTTPException(status_code=401, detail=token_data)
    data_by_db = await get_user_by_id(session=session, user_id=token_data.get("id"))
    payload = {
        'id': data_by_db.id,
        'phone': data_by_db.phone,
        'fio': data_by_db.fio,
        'verify_phone': data_by_db.verify_phone,
    }
    jwt_tokens = create_tokens_pair(payload)
    return TokenPair(
        access_token=jwt_tokens.get("access_token"),
        refresh_token=jwt_tokens.get("refresh_token"),
    )


@router.get('/get-sessions-sms', )
async def only_for_testing(session: AsyncSession = Depends(get_session)):
    data = await session.execute(select(Verification))
    array = data.scalars().all()
    return [Verification(request_id=item.request_id, sms_code=item.sms_code, phone=item.phone) for item in array]


@router.post("/send", response_model=ReqID)
async def send_message(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        session: AsyncSession = Depends(get_session)
):
    dict_by_token = decode_access_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == "Невалидный токен":
        raise HTTPException(status_code=400, detail="Невалидный токен")
    number = dict_by_token.get('phone')
    phone = validate_phone(number)
    if await crud.get_verify_phone(session=session, phone=phone):
        raise HTTPException(status_code=400, detail='Номер телефона уже зарегистрирован')
    code = generate_code()
    params = {
        'to': number,
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
    if await add_verify_session(session=session, request_id=response, sms_code=code, phone=phone) is None:
        raise HTTPException(status_code=500, detail="Ошибка добавления сессии в базу данных")
    return ReqID(req_id=response)


@router.post('/check', response_model=VerifePhone)
async def check_code(
        access_token: Annotated[str, Header(
            title="Access-JWT токен",
            example=example_jwt_token,
        )],
        token_type: Annotated[str, Header(
            title='Тип токена',
            example='Baerer')],
        req_id: Annotated[str, Body(..., title='ID сессии, полученный после отправки номера',
                                    examples=['79442f1f-17a8-42bb-9f6f-4affc8788e7e'], min_length=36, max_length=36)],
        sms_code: Annotated[
            str, Body(..., title='СМС-код, отправленный на номер', examples=['12345'], min_length=5, max_length=5)],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = decode_access_token(
        access_token=access_token,
        token_type=token_type,
    )
    if dict_by_token == "Невалидный токен":
        raise HTTPException(status_code=400, detail="Невалидный токен")
    response = await get_verify_session(session=session, request_id=req_id, sms_code=sms_code)
    if response is None:
        raise HTTPException(status_code=401, detail='Невалидная сессия или смс-код')
    await session.delete(response)
    if await crud.change_verify_phone_status(session=session, user_id=dict_by_token.get("id")):
        return VerifePhone(phone=response.phone, phone_verif=True)
    raise HTTPException(status_code=500, detail="Ошибка сервера")


@router.post('/registration', response_model=TokenPair)
async def registration(
        data: Annotated[Register, Body()],
        session: AsyncSession = Depends(get_session)
):
    if await crud.get_verify_phone(session=session, phone=data.phone):
        raise HTTPException(status_code=400, detail='Номер телефона уже зарегистрирован')

    await crud.sing_up_user(session=session, data=data)

    user_data = await crud.get_user_by_phone(session=session, phone=data.phone)
    payload = {
        'id': user_data.id,
        'phone': data.phone,
        'fio': data.fio,
        'verify_phone': user_data.verify_phone,
    }

    jwt_tokens = create_tokens_pair(payload)
    return TokenPair(
        access_token=jwt_tokens.get("access_token"),
        refresh_token=jwt_tokens.get("refresh_token")
    )


@router.post('/login', response_model=TokenPair)
async def login(
        data: Login,
        session: AsyncSession = Depends(get_session)
):
    data_by_db = await crud.get_user_by_phone(session=session, phone=data.phone)

    if data_by_db is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if not validate_password(data.password, data_by_db.password.encode('utf-8')):
        raise HTTPException(status_code=404, detail="Неверный пароль")
    payload = {
        'id': data_by_db.id,
        'phone': data_by_db.phone,
        'fio': data_by_db.fio,
        'verify_phone': data_by_db.verify_phone,
    }
    jwt_tokens = create_tokens_pair(payload)
    return TokenPair(
        access_token=jwt_tokens.get("access_token"),
        refresh_token=jwt_tokens.get("refresh_token")
    )