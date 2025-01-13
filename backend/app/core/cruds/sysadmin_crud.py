from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.services.verify_services import hash_password
from app.models.models import SysAdminSessions


async def add_sysadmin_session(session: AsyncSession, token: str):
    stmt = SysAdminSessions(active_session=token)
    session.add(stmt)
    await session.commit()

async def delete_sysadmin_session(session: AsyncSession, token: str) -> bool:
    try:
        result = await session.execute(select(SysAdminSessions).where(SysAdminSessions.active_session == token))
        sysadmin_session = result.scalar_one_or_none()

        if sysadmin_session is None:
            return False
        
        await session.execute(delete(SysAdminSessions).where(SysAdminSessions.active_session == token))
        await session.commit()
        return True 
    except Exception:
        return False
    
async def check_status_session(session: AsyncSession, token: str) -> bool:
    result = await session.execute(select(SysAdminSessions).where(SysAdminSessions.active_session == token))
    sysadmin_session = result.scalar_one_or_none()

    if sysadmin_session is None:
        return False
    return True