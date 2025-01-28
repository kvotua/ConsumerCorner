from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, update, delete

from app.schemas.verify_schemas import Register
from app.services.verify_services import hash_password
from app.models.models import Users, Verification, SysAdminSessions, EmailVerification

from app.core.cruds.users_crud import get_user_by_id


async def get_verify_phone(session: AsyncSession, phone: str) -> Users:
    stmt = select(Users).where(Users.phone == phone, Users.verify_phone == True)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def get_verify_email(session: AsyncSession, user_id: int = None, email: str = None) -> Users:
    if user_id:
        stmt = select(Users).where(Users.id == user_id, Users.verify_email == True)
    elif email:
        stmt = select(Users).where(Users.email == email, Users.verify_email == True)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def add_verify_session(session: AsyncSession, request_id: str, code: str, phone: str) -> Verification:
    stmt = Verification(request_id=request_id, code=code, phone=phone)
    session.add(stmt)
    await session.commit()
    return stmt

async def get_verify_session(session: AsyncSession, request_id: str, code: str):
    stmt = select(Verification).where(Verification.request_id == request_id, Verification.code == code)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def add_email_verify(session: AsyncSession, request_id: str, code: str, user_id: int, email: str) -> Verification:
    stmt = EmailVerification(request_id=request_id, code=code, user_id=user_id, email=email)
    session.add(stmt)
    await session.commit()
    return stmt

async def get_email_verify(session: AsyncSession, request_id: str, code: str):
    stmt = select(EmailVerification).where(EmailVerification.request_id == request_id, EmailVerification.code == code)
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

async def add_sysadmin_session(session: AsyncSession, token: str):
    stmt = SysAdminSessions(active_session=token)
    session.add(stmt)
    await session.commit()

async def delete_sysadmin_session(session: AsyncSession, token: str):
    try:
        await session.execute(delete(SysAdminSessions).where(SysAdminSessions.active_session == token))
        return True
    except:
        return False