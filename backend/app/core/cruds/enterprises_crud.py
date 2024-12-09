from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result

from backend.app.schemas.enterprises_schemas import RegisterCompany
from backend.app.models.models import Enterprises


async def add_enterprise(session: AsyncSession, data: RegisterCompany, user_id: int):
    company = Enterprises(
        name=data.name, type=data.type,
        create_id=user_id, inn=data.inn,
        ogrn=data.ogrn, address=data.address,
        general_type_activity=data.general_type_activity,
    )
    session.add(company)
    await session.commit()
    return True

async def get_all_enterprises_by_id(session: AsyncSession, user_id: int) -> list[Enterprises]:
    stmt = select(Enterprises).where(Enterprises.create_id == user_id)
    result: Result = await session.execute(stmt)
    enterprises = result.scalars().all()
    return list(enterprises)