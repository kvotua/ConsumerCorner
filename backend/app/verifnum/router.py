from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Annotated, Dict

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .utils import HttpClient, generate_code, generate_text
from .schemas import ReqID, Phone, GetReqIdWithSMS
from .db import get_session
from .models import Verify, Base


router = APIRouter(prefix='/auth')
http_client = HttpClient()


@router.get('/all')
async def all(session: AsyncSession = Depends(get_session)):
    data = await session.execute(select(Verify))
    array = data.scalars().all()
    return [Verify(request_id=item.request_id, sms_code=item.sms_code) for item in array]


@router.post("/send")
async def send_message(
    number: Phone, 
    session: AsyncSession = Depends(get_session)
    ):
    code = generate_code()
    params = {
    'to': number.phone,
    'txt': generate_text(code),
    'from': 'test',
    'user': 'troshkin_a_s',
    'pass': '123456',
    }
    try:
        response = await http_client.send_message(
            'https://api3.greensms.ru/sms/send',
            data=params
        )
        data = Verify(request_id=response, sms_code=code)
        session.add(data)
        await session.commit()
        await session.refresh(data)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get('/check')
async def check_code(
    req_id: Annotated[str, Query(..., title='ID сессии, полученный после отправки номера', min_length=36, max_length=36)],
    sms_code: Annotated[str, Query(..., title='СМС-код, отправленный на номер', min_length=5, max_length=5)],
    session: AsyncSession = Depends(get_session),
):
    response = await session.get(Verify, req_id)
    
    data_by_db = {
        'request_id': response.request_id,
        'sms_code': response.sms_code,
    }
    data_by_user = {
        'request_id': req_id,
        'sms_code': sms_code,
    }
    return data_by_db == data_by_user

