from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends, Request, Body, Query

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.services.auth_handler import get_token_data, sign_jwt, sing_email_jwt, decode_email_token
from app.schemas.points_schemas import ResponseSchema
from app.schemas.password_schemas import ReqID, Restore
from app.core.databases.postgresdb import get_session
from app.core.cruds import profile_crud
from app.services.auth_bearer import dependencies

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("/docs_socials_exist", response_model=dict, dependencies=dependencies)
async def docs_socials_exist(
        request: Request,
        session: AsyncSession = Depends(get_session)
):
    dict_by_token = get_token_data(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    return {
        "documents": await profile_crud.get_documents_exist(session=session, user_id=dict_by_token.get('id')),
        "socials": await profile_crud.get_socials_exist(session=session, user_id=dict_by_token.get('id')),
        "comments": await profile_crud.get_comments_count(session=session, user_id=dict_by_token.get('id')),
        "name": dict_by_token.get('fio').split()[1]
    }