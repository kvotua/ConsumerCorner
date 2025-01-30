from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, update, delete

from app.schemas.verify_schemas import Register
from app.services.verify_services import hash_password
from app.models.models import PasswordRestore, Users

from app.core.cruds.users_crud import get_user_by_id


async def add_password_restore(session: AsyncSession, id: str, code: str, phone: str, user_id: str):
    password_restore = PasswordRestore(id=id, code=code, phone=phone, user_id=user_id)
    session.add(password_restore)
    await session.commit()

async def get_password_restore_info_by_code(session: AsyncSession, id: int, code: str) -> PasswordRestore:
    stmt = select(PasswordRestore).where(PasswordRestore.id == id, PasswordRestore.code == code)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def get_password_restore_info(session: AsyncSession, id: int) -> PasswordRestore:
    stmt = select(PasswordRestore).where(PasswordRestore.id == id)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def change_password(session: AsyncSession, id: int, password: str):
    passwordrestore = await get_password_restore_info(session=session, id=id)
    if not passwordrestore:
        return {"status_code": 404, "message": "Password recovery request is missing"}
    user = await get_user_by_id(session=session, user_id=passwordrestore.user_id)
    if not user:
        return {"status_code": 404, "message": "User not found"}
    user.password = hash_password(password).decode('utf-8')
    passwordrestore.is_changed = True
    await session.commit()
    await session.refresh(user)
    await session.refresh(passwordrestore)
    return True


async def set_password_restore_checked(session: AsyncSession, id: int):
    passwordrestore = await get_password_restore_info(session=session, id=id)
    if not passwordrestore:
        return False
    passwordrestore.is_checked = True
    await session.commit()
    await session.refresh(passwordrestore)
    return True

async def set_password_restore_changed(session: AsyncSession, id: int):
    passwordrestore = await get_password_restore_info(session=session, id=id)
    if not passwordrestore:
        return False
    passwordrestore.is_changed = True
    await session.commit()
    await session.refresh(passwordrestore)
    return True