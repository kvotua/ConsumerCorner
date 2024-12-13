from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends, Request, Body, Query

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.services.auth_handler import get_token_data, sign_jwt, sing_email_jwt, decode_email_token
from app.core.cruds.verify_crud import add_verify_session
from app.schemas.verify_schemas import ReqID, VerifePhone, EmailSchema
from app.schemas.points_schemas import ResponseSchema
from app.services.verify_services import httpclient, sendemail, generate_code, generate_text, validate_phone
from app.models.verify_models import Verification
from app.config import user_name, user_pass, send_from
from app.core.databases.postgresdb import get_session
from app.core.cruds import verify_crud, users_crud
from app.services.auth_bearer import dependencies


router = APIRouter(prefix="/verify", tags=["verify"])


@router.get('/get-sessions-sms', )
async def only_for_testing(session: AsyncSession = Depends(get_session)):
    data = await session.execute(select(Verification))
    array = data.scalars().all()
    return [Verification(request_id=item.request_id, sms_code=item.sms_code, phone=item.phone, created_at=item.created_at) for item in array]


@router.post("/phone/send", response_model=ReqID, dependencies=dependencies)
async def send_message(
        request: Request,
        session: AsyncSession = Depends(get_session)
):
    dict_by_token = get_token_data(request)
    number = dict_by_token.get('phone')
    phone = validate_phone(number)
    if await verify_crud.get_verify_phone(session=session, phone=phone):
        raise HTTPException(status_code=400, detail='Номер телефона уже зарегистрирован')
    code = generate_code()
    params = {
        'to': number,
        'txt': generate_text(code),
        'from': send_from,
        'user': str(user_name),
        'pass': str(user_pass),
    }
    response = await httpclient.send_message(
        'https://api3.greensms.ru/sms/send',
        data=params,
    )
    await httpclient.close_session()
    if response is None:
        raise HTTPException(status_code=400, detail="Закончились деньги на GREENSMSAPI")

    if await add_verify_session(session=session, request_id=response, sms_code=code, phone=phone) is None:
        raise HTTPException(status_code=500, detail="Ошибка добавления сессии в базу данных")
    return ReqID(req_id=response)


@router.post('/phone/check', response_model=VerifePhone, dependencies=dependencies)
async def check_code(
        request: Request,
        req_id: Annotated[str, Body(..., title='ID сессии, полученный после отправки номера',
                                    examples=['79442f1f-17a8-42bb-9f6f-4affc8788e7e'], min_length=36, max_length=36)],
        sms_code: Annotated[
            str, Body(..., title='СМС-код, отправленный на номер', examples=['12345'], min_length=5, max_length=5)],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    response = await verify_crud.get_verify_session(session=session, request_id=req_id, sms_code=sms_code)
    if response is None:
        raise HTTPException(status_code=401, detail='Невалидная сессия или смс-код')
    await session.delete(response)
    if await verify_crud.change_verify_phone_status(session=session, user_id=dict_by_token.get("id")):
        dict_by_token['verify_phone'] = True
        access_token = sign_jwt(dict_by_token)
        return VerifePhone(phone=response.phone, phone_verif=True, access_token=access_token)
    raise HTTPException(status_code=500, detail="Ошибка сервера")


@router.post('/email/send', dependencies=dependencies)
async def send_email(
        request: Request,
        user_email: Annotated[EmailSchema, Body()]
):
    dict_by_token = get_token_data(request)
    token = sing_email_jwt(user_id=dict_by_token.get("id"), email=user_email.email)
    try:
        sendemail.send_message(to_send=user_email.email, token=token)
        return ResponseSchema(status_code=200, detail="Письмо отправлено!")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        sendemail.close()



@router.get('/', response_model=ResponseSchema)
async def check_email(
        email_code: str = Query(),
        session: AsyncSession = Depends(get_session),
):
    token_data = decode_email_token(email_code)
    if isinstance(token_data, str):
        raise HTTPException(status_code=403, detail=token_data)
    await verify_crud.verify_email_for_user(session=session, user_id=token_data.get("id"), new_email=token_data.get("email"))
    return ResponseSchema(status_code=200, detail="Успешная верификация почты")