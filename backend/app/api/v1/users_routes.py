from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.databases.postgresdb import get_session
from app.services.auth_handler import get_token_data, get_token_data_verify
from app.schemas.enterprises_schemas import ResponseSchema
from app.schemas.users_schemas import ChangeUserSchema, UserSchema
from app.core.cruds import users_crud
from app.services.auth_bearer import dependencies


router = APIRouter(prefix="/profile", tags=["profile"], dependencies=dependencies)


@router.get("/me", response_model=UserSchema)
async def get_users_me(
    request: Request,
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    return UserSchema(
        id=dict_by_token.get("id"),
        phone=dict_by_token.get("phone"),
        fio=dict_by_token.get("fio"),
        email=dict_by_token.get("email"),
        verify_phone=dict_by_token.get("verify_phone"),
        verify_email=dict_by_token.get("verify_email"),
    )
    return await users_crud.get_user_by_id(session=session, user_id=dict_by_token.get("id"))


@router.patch("/change", response_model=ResponseSchema)
async def change_users_me(
    request: Request,
    user_data: ChangeUserSchema,
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")

    user = await users_crud.get_user_by_id(session=session, user_id=dict_by_token.get("id"))
    await users_crud.update_user(
        session=session,
        user=user,
        update_user_data=user_data,
    )
    return ResponseSchema(status_code=200, detail="Successful user change")

@router.get("/all")
async def get_all_users(
        session: AsyncSession = Depends(get_session),
):
    return await users_crud.get_all_users(session=session)