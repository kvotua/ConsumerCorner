from typing import Annotated
from fastapi import APIRouter, Header, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.auth_handler import sign_sysadmin_jwt
from app.core.cruds.verify_crud import add_sysadmin_session, delete_sysadmin_session
from app.core.databases.postgresdb import get_session
from app.schemas.points_schemas import ResponseSchema
from app.schemas.sysadmin_schemas import SysAdminLogin
from app.config import example_jwt_token, sysadmin_login, sysadmin_password

router = APIRouter(prefix="/sysadmin",tags=["Sys Admin"])


@router.post('/login', response_model=ResponseSchema)
async def login(
    data: SysAdminLogin,
    session: AsyncSession = Depends(get_session),
):
    if data.login != sysadmin_login or data.password != sysadmin_password:
        raise HTTPException(status_code=401, detail="Invalid login or password")
    token = sign_sysadmin_jwt()
    await add_sysadmin_session(session=session, token=token)
    return ResponseSchema(status_code=200, detail=token)

@router.get('/logout', response_model=ResponseSchema)
async def logout(
    token: Annotated[str, Header(title='SysAdmSession', example=example_jwt_token)],
    session: AsyncSession = Depends(get_session),
):
    if not await delete_sysadmin_session(session=session, token=token):
        raise HTTPException(status_code=404, detail="Active session not found")
    return ResponseSchema(status_code=200, detail="Successful logout")