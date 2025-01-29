from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.databases.postgresdb import get_session
from app.services.auth_handler import get_token_data, set_token_pair
from app.schemas.enterprises_schemas import ResponseSchema
from app.schemas.verify_schemas import TokenPair
from app.schemas.users_schemas import ChangeUserSchema, UserSchema
from app.core.cruds import users_crud, verify_crud
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


@router.patch("/change", response_model=TokenPair)
async def change_users_me(
    request: Request,
    user_data: ChangeUserSchema,
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")

    user = await users_crud.get_user_by_id(session=session, user_id=dict_by_token.get("id"))
    new_user = await users_crud.update_user(
        session=session,
        user=user,
        update_user_data=user_data,
    )
    data_by_db = await verify_crud.get_user_by_phone(session=session, phone=dict_by_token.get("phone"))
    if data_by_db is None:
        raise HTTPException(status_code=404, detail="The user was not found")
    
    payload = {
        'id': data_by_db.id,
        'phone': data_by_db.phone,
        'fio': data_by_db.fio,
        'email': data_by_db.email,
        'verify_phone': data_by_db.verify_phone,
        'verify_email': data_by_db.verify_email
    }
    jwt_tokens = set_token_pair(payload)
    return TokenPair(
        access_token=jwt_tokens.get("access_token"),
        refresh_token=jwt_tokens.get("refresh_token")
    )

@router.get("/all")
async def get_all_users(
        session: AsyncSession = Depends(get_session),
):
    return await users_crud.get_all_users(session=session)