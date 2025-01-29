from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, func

from app.schemas.enterprises_schemas import RegisterCompany, ImageData, EnterpriseInfo, ChangeEnterpriseSchema
from app.models.models import Enterprises, Points


async def add_enterprise(session: AsyncSession, data: RegisterCompany, user_id: int):
    company = Enterprises(
        name=data.name, type=data.type,
        create_id=user_id, inn=data.inn,
        ogrn=data.ogrn, address=data.address,
        general_type_activity=data.general_type_activity,
    )
    session.add(company)
    await session.commit()
    return company.id

async def add_image(session: AsyncSession, image_data: ImageData):
    stmt = select(Enterprises).where(Enterprises.id == image_data.enterprise_id)
    result = await session.execute(stmt)
    enterprise = result.scalars().first()
    enterprise.image_id = image_data.id
    await session.commit()
    await session.refresh(enterprise)

async def delete_image(session: AsyncSession, enterprise_id: str):
    stmt = select(Enterprises).where(Enterprises.id == enterprise_id)
    result = await session.execute(stmt)
    enterprise = result.scalars().first()
    enterprise.image_id = None
    await session.commit()
    await session.refresh(enterprise)

async def get_image_by_id(session: AsyncSession, enterprise_id: int):
    stmt = select(Enterprises.image_id).where(Enterprises.id == enterprise_id)
    result = await session.execute(stmt)
    return result.scalars().first()

async def get_enterprise_by_id_v2(session: AsyncSession, enterprise_id: int) -> Enterprises:
    stmt = select(Enterprises).where(Enterprises.id == enterprise_id)
    result = await session.execute(stmt)
    return result.scalars().first()

async def get_enterprise_by_id(session: AsyncSession, enterprise_id: int) -> EnterpriseInfo:
    stmt = (
        select(Enterprises, func.avg(Points.middle_stars).label("average_rating"))
        .outerjoin(Points, Enterprises.id == Points.enterprise_id)
        .where(Enterprises.id == enterprise_id)
        .group_by(Enterprises.id)
    )
    result = await session.execute(stmt)
    enterprise, average_rating = result.one()
    return EnterpriseInfo(
        id=enterprise.id,
        name=enterprise.name,
        type=enterprise.type,
        create_id=enterprise.create_id,
        inn=enterprise.inn,
        ogrn=enterprise.ogrn,
        address=enterprise.address,
        image_id=enterprise.image_id,
        middle_stars=round(average_rating, 2) if average_rating is not None else 0.00,
        general_type_activity=enterprise.general_type_activity,
        created_at=enterprise.created_at,
    )

async def get_all_enterprises_by_id(session: AsyncSession, user_id: int) -> list[EnterpriseInfo]:
    stmt = (
        select(Enterprises, func.avg(Points.middle_stars).label("average_rating"))
        .outerjoin(Points, Enterprises.id == Points.enterprise_id)
        .where(Enterprises.create_id == user_id)
        .group_by(Enterprises.id)
    )

    result = await session.execute(stmt)
    enterprises_data = []

    for enterprise, average_rating in result.all():
        enterprises_data.append(
            EnterpriseInfo(
                id=enterprise.id,
                name=enterprise.name,
                type=enterprise.type,
                create_id=enterprise.create_id,
                inn=enterprise.inn,
                ogrn=enterprise.ogrn,
                address=enterprise.address,
                image_id=enterprise.image_id,
                middle_stars=round(average_rating, 2) if average_rating is not None else 0.00,
                general_type_activity=enterprise.general_type_activity,
                created_at=enterprise.created_at,
            )
        )

    return enterprises_data

async def get_enterprises_id_by_user_id(session: AsyncSession, user_id: int):
    stmt = select(Enterprises.id).where(Enterprises.create_id == user_id)
    result: Result = await session.execute(stmt)
    enterprises_id = result.scalars().all()
    return enterprises_id


async def update_enterprise(session: AsyncSession, enterprise: Enterprises, enterprise_change: ChangeEnterpriseSchema):
    for name, value in enterprise_change.model_dump(exclude_none=True).items():
        setattr(enterprise, name, value)
    await session.commit()
    await session.refresh(enterprise)
    return enterprise