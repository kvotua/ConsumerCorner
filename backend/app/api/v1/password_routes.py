from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends, Request, Body, Query

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.services.auth_handler import get_token_data, sign_jwt, sing_email_jwt, decode_email_token
from app.schemas.points_schemas import ResponseSchema
from app.models.models import PasswordRestore
from app.config import api_key, campaign_id
from app.services.verify_services import HttpClient
from app.services.verify_services import validate_phone
from app.schemas.password_schemas import ReqID, Restore
from app.core.databases.postgresdb import get_session
from app.core.cruds import password_crud, verify_crud
from app.services.auth_bearer import dependencies

router = APIRouter(prefix="/password", tags=["password"])

@router.post("/phone/send/", response_model=ReqID)
async def send_message(
        request: Request,
        phone: Annotated[str, Body(..., title='Phone number', examples=['79123456789'])],
        session: AsyncSession = Depends(get_session)
):
    phone = validate_phone(phone)
    user = await verify_crud.get_user_by_phone(session=session, phone=phone)
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    user_id = user.id
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
    if response['status'] == 'error':
        raise HTTPException(status_code=500, detail=response_data)
    await password_crud.add_password_restore(session=session, id=response_data['call_id'], code=response_data['pincode'], phone=phone, user_id=user_id)
    return ReqID(req_id=response_data['call_id'])


@router.post('/phone/check', response_model=ResponseSchema)
async def check_code(
        request: Request,
        req_id: Annotated[int, Body(..., title='ID received after sending the number',
                                    examples=['1191273219673078'])],
        code: Annotated[
            str, Body(..., title='The code, which consists of the last 4 digits of the calling number', examples=['1234'], min_length=4, max_length=4)],
        session: AsyncSession = Depends(get_session),
):
    response1 = await password_crud.get_password_restore_info(session=session, id=req_id)
    if not response1:
        raise HTTPException(status_code=401, detail='Invalid ID or code')
    if response1.is_checked:
        raise HTTPException(status_code=401, detail="This ID has already been checked for change password")
    response = await password_crud.get_password_restore_info_by_code(session=session, id=req_id, code=code)
    if not response:
        raise HTTPException(status_code=401, detail='Invalid ID or code')
    if response.is_changed:
        raise HTTPException(status_code=401, detail="This ID has already been used for changed password")
    if await password_crud.set_password_restore_checked(session=session, id=req_id):
        return ResponseSchema(status_code=200, detail={"message": "Password-restore successfully set true of checked", "phone": response.phone})
    
@router.post('/restore', response_model=ResponseSchema)
async def restore_password(
    request: Request,
    data: Annotated[Restore, Body()],
    session: AsyncSession = Depends(get_session)
):
    response = await password_crud.get_password_restore_info(session=session, id=data.req_id)
    if response is None:
        raise HTTPException(status_code=401, detail='Invalid ID')
    if not response.is_checked:
        raise HTTPException(status_code=401, detail="This ID is not verified for change password")
    if response.is_changed:
        raise HTTPException(status_code=401, detail="This ID has already been used for changed password")
    info =  await password_crud.change_password(session=session, id=data.req_id, password=data.password)
    if type(info) == dict:
        return ResponseSchema(status_code=info['status_code'], detail=info)
    else:
        return ResponseSchema(status_code=200, detail="Password changed successfully")