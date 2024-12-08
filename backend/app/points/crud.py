from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, delete
from backend.app.models import Points, Enterprises
from backend.app.points.schemas import RegisterPoint, ChangePointSchema
from .utils import parse_time


async def add_points(session: AsyncSession, point_data: RegisterPoint, user_id: int):
    data_for_db = Points(
        enterprise_id=point_data.enterprise_id,
        create_id=user_id,
        title=point_data.title,
        address=point_data.address,
        opening_time=parse_time(point_data.opening_time),
        closing_time=parse_time(point_data.closing_time),
        phone=point_data.phone,
        type_activity=point_data.type_activity,
    )
    session.add(data_for_db)
    await session.commit()

async def get_all_points(session: AsyncSession, user_id: int) -> list[Points]:
    stmt = select(Points).where(Points.create_id == user_id)
    result: Result = await session.execute(stmt)
    points = result.scalars().all()
    return list(points)

async def get_point_by_user_id(session: AsyncSession, user_id: int):
    stmt = select(Points.id).where(Points.create_id == user_id)
    result: Result = await session.execute(stmt)
    points_id = result.scalars().all()
    return points_id

async def get_point_by_id(session: AsyncSession, point_id: int) -> Points:
    stmt = select(Points).where(Points.id == point_id)
    result = await session.execute(stmt)
    return result.scalars().first()

async def update_point(session: AsyncSession, point: Points, point_change: ChangePointSchema):
    if point_change.opening_time:
        point_change.opening_time = parse_time(point_change.opening_time)
    if point_change.closing_time:
        point_change.closing_time = parse_time(point_change.closing_time)
    for name, value in point_change.model_dump(exclude_none=True).items():
        setattr(point, name, value)
    await session.commit()
    return point

async def delete_point(session: AsyncSession, point: Points):
    await session.delete(point)
    await session.commit()

async def get_enterprises_id_by_user_id(session: AsyncSession, user_id: int):
    stmt = select(Enterprises.id).where(Enterprises.create_id == user_id)
    result: Result = await session.execute(stmt)
    enterprises_id = result.scalars().all()
    return enterprises_id