from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result

from app.schemas.enterprises_schemas import RegisterCompany, ImageData
from app.models.models import Enterprises


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


async def add_image(session: AsyncSession, image_data: ImageData):
    enterprise = await get_enterprise_by_id(session=session, enterprise_id=image_data.enterprise_id)
    enterprise.image_id = image_data.id
    await session.commit()
    await session.refresh(enterprise)

async def delete_image(session: AsyncSession, enterprise_id: str):
    enterprise = await get_enterprise_by_id(session=session, enterprise_id=enterprise_id)
    enterprise.image_id = None
    await session.commit()
    await session.refresh(enterprise)

async def get_image_by_id(session: AsyncSession, enterprise_id: int):
    stmt = select(Enterprises.image_id).where(Enterprises.id == enterprise_id)
    result = await session.execute(stmt)
    return result.scalars().first()

async def get_enterprise_by_id(session: AsyncSession, enterprise_id: int) -> Enterprises:
    stmt = select(Enterprises).where(Enterprises.id == enterprise_id)
    result = await session.execute(stmt)
    return result.scalars().first()

async def get_all_enterprises_by_id(session: AsyncSession, user_id: int) -> list[Enterprises]:
    stmt = select(Enterprises).where(Enterprises.create_id == user_id)
    result: Result = await session.execute(stmt)
    enterprises = result.scalars().all()
    return list(enterprises)

async def get_enterprises_id_by_user_id(session: AsyncSession, user_id: int):
    stmt = select(Enterprises.id).where(Enterprises.create_id == user_id)
    result: Result = await session.execute(stmt)
    enterprises_id = result.scalars().all()
    return enterprises_id