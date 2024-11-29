from typing import Annotated

from bcrypt import checkpw
from fastapi import APIRouter, Body, HTTPException, Response, Security, status, Query, Depends
from fastapi.responses import RedirectResponse
from fastapi_jwt import JwtAuthorizationCredentials

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .dependencies import refresh_security, email_security
from .schemas import AccessTokenSchema, TokenPairSchema, Phone, AuthSchema
from .utils import set_access_token, set_token_pair, HttpClient, generate_code, generate_text
from .models_auth import Verification
from ConsumerCorner.backend.app.config import user_name, user_pass, send_from
from ConsumerCorner.backend.app.database import get_session


router = APIRouter(prefix="/auth", tags=["Auth"])
http_client = HttpClient()


# @router.post(
#     "/refresh",
# )
# async def post_auth_refresh(
#     response: Response,
#     credentials: JwtAuthorizationCredentials = Security(refresh_security),
# ) -> AccessTokenSchema:
#     access_token = set_access_token(response, credentials.subject)
#     return AccessTokenSchema(access_token=access_token)


# @router.post(
#     "/",
# )
# async def post_auth(
#     response: Response,
#     credentials: Annotated[AuthSchema, Body(embed=True)],
# ) -> TokenPairSchema:
#     result = list(
#         UserModel.scan(
#             UserModel.email.value == credentials.email,  # type: ignore
#             limit=1,
#         )
#     )
#     if len(result) == 0:
#         raise HTTPException(status.HTTP_404_NOT_FOUND, "User with this email not found")
#     model = result[0]
#     if not checkpw(credentials.password.encode(), model.password.encode()):
#         raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Wrong password")
#     return set_token_pair(response, {"id": model.id})


# @router.get(
#     "/verify",
# )
# async def post_auth_verify(token: str = Query()) -> RedirectResponse:
#     decoded = decode_email_token(token)
#     try:
#         model = UserModel.get(decoded["id"])
#     except UserModel.DoesNotExist:
#         raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not found")
#     if model.email.value != decoded["email"]:
#         raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Mismatched email")
#     model.email.verified = True
#     model.save()
#     # TODO: env var
#     return RedirectResponse("http://localhost:80")
@router.post

@router.get('/all')
async def all(session: AsyncSession = Depends(get_session)):
    data = await session.execute(select(Verification))
    array = data.scalars().all()
    return [Verification(request_id=item.request_id, sms_code=item.sms_code) for item in array]


@router.post('/')
async def login_user(
    response: Response,
    credentials: Annotated[AuthSchema, Body()],
    session: AsyncSession = Depends(get_session),
) -> TokenPairSchema:
    try:

    


@router.post("/send")
async def send_message(
    number: Phone, 
    session: AsyncSession = Depends(get_session)
    ):
    code = generate_code()
    params = {
    'to': number.phone,
    'txt': generate_text(code),
    'from': send_from,
    'user': str(user_name),
    'pass': str(user_pass),
    }
    try:
        response = await http_client.send_message(
            'https://api3.greensms.ru/sms/send',
            data=params
        )
        data = Verification(request_id=response, sms_code=code)
        session.add(data)
        await session.commit()
        await session.refresh(data)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get('/verify')
async def check_code(
    req_id: Annotated[str, Query(..., title='ID сессии, полученный после отправки номера', min_length=36, max_length=36)],
    sms_code: Annotated[str, Query(..., title='СМС-код, отправленный на номер', min_length=5, max_length=5)],
    session: AsyncSession = Depends(get_session),
):
    response = await session.get(Verification, req_id)
    
    data_by_db = {
        'request_id': response.request_id,
        'sms_code': response.sms_code,
    }
    data_by_user = {
        'request_id': req_id,
        'sms_code': sms_code,
    }
    return data_by_db == data_by_user