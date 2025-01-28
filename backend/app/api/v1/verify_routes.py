from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends, Request, Body, Query

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.services.auth_handler import get_token_data, sign_jwt, sing_email_jwt, decode_email_token
from app.schemas.verify_schemas import ReqID, VerifePhone, EmailSchema
from app.schemas.points_schemas import ResponseSchema
from app.services.verify_services import HttpClient, SendEmail, generate_code, generate_text, validate_phone, generate_session
from app.models.models import Verification
from app.config import api_key, campaign_id
from app.core.databases.postgresdb import get_session
from app.core.cruds import verify_crud, users_crud
from app.services.auth_bearer import dependencies

sendemail = SendEmail()


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
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    number = dict_by_token.get('phone')
    phone = validate_phone(number)
    if await verify_crud.get_verify_phone(session=session, phone=phone):
        raise HTTPException(status_code=400, detail='The phone number has already been registered')
    data = {
        'public_key': api_key,
        'phone': phone,
        'campaign_id': campaign_id,
    }
    try:
        async with HttpClient() as client:
            response = await client.send_message('https://zvonok.com/manager/cabapi_external/api/v1/phones/flashcall/', data)
            response_data = response['data']
    except Exception as s:
        raise HTTPException(status_code=500, detail="Error when sending sms")
    await verify_crud.add_verify_session(session=session, request_id=response_data['call_id'], sms_code=response_data['pincode'], phone=phone)
    return ReqID(req_id=response_data['call_id'])


@router.post('/phone/check', response_model=VerifePhone, dependencies=dependencies)
async def check_code(
        request: Request,
        req_id: Annotated[int, Body(..., title='ID, полученный после отправки номера',
                                    examples=['1191273219673078'])],
        sms_code: Annotated[
            str, Body(..., title='СМС-код, отправленный на номер', examples=['1234'], min_length=4, max_length=4)],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    response = await verify_crud.get_verify_session(session=session, request_id=req_id, sms_code=sms_code)
    if response is None:
        raise HTTPException(status_code=401, detail='Invalid ID or sms code')
    await session.delete(response)
    if await verify_crud.change_verify_phone_status(session=session, user_id=dict_by_token.get("id")):
        dict_by_token['verify_phone'] = True
        access_token = sign_jwt(dict_by_token)
        return VerifePhone(phone=response.phone, phone_verif=True, access_token=access_token)


@router.post('/email/send', dependencies=dependencies)
async def send_email(
        request: Request,
        user_email: Annotated[EmailSchema, Body()]
):
    dict_by_token = get_token_data(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    token = sing_email_jwt(user_id=dict_by_token.get("id"), email=user_email.email)
    try:
        sendemail.send_message(to_send=user_email.email, token=token)
        sendemail.close()
        return ResponseSchema(status_code=200, detail="The email has been sent!")
    except Exception as e:
        sendemail.close()
        raise HTTPException(status_code=500, detail=str(e))



@router.get('/', response_model=ResponseSchema)
async def check_email(
        email_code: str = Query(),
        session: AsyncSession = Depends(get_session),
):
    token_data = decode_email_token(email_code)
    if isinstance(token_data, str):
        raise HTTPException(status_code=403, detail=token_data)
    await verify_crud.verify_email_for_user(session=session, user_id=token_data.get("id"), new_email=token_data.get("email"))
    return ResponseSchema(status_code=200, detail="Your email has been successfully verified")