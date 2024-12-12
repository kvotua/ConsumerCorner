from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, update

from app.schemas.schemas_verify import Register
from app.models.verify_models import Verification
from app.services.verify_services import hash_password
from app.models.models import Users
from app.core.cruds.users_crud import get_user_by_id


async def get_verify_phone(session: AsyncSession, phone: str) -> Users:
    stmt = select(Users).where(Users.phone == phone, Users.verify_phone == True)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def add_verify_session(session: AsyncSession, request_id: str, sms_code: str, phone: str) -> Verification:
    stmt = Verification(request_id=request_id, sms_code=sms_code, phone=phone)
    session.add(stmt)
    await session.commit()
    return stmt

async def get_verify_session(session: AsyncSession, request_id: str, sms_code: str):
    stmt = select(Verification).where(Verification.request_id == request_id, Verification.sms_code == sms_code)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def change_verify_phone_status(session: AsyncSession, user_id: int):
    user = await get_user_by_id(session=session, user_id=user_id)
    if not user:
        return False
    user.verify_phone = True
    await session.commit()
    await session.refresh(user)
    return True

async def sing_up_user(session: AsyncSession, data: Register):
    data_for_db = Users(phone=data.phone,password=hash_password(data.password).decode('utf-8'),fio=data.fio)
    session.add(data_for_db)
    await session.commit()
    await session.refresh(data_for_db)

async def get_user_by_phone(session: AsyncSession, phone: str) -> Users:
    stmt = select(Users).where(Users.phone == phone)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def verify_email_for_user(session: AsyncSession, user_id: int, new_email: str):
    stmt = update(Users).where(Users.id == user_id).values(
        email=new_email,
        verify_email=True,
    )
    await session.execute(stmt)
    await session.commit()