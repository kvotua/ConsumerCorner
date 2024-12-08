from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from sqlalchemy import select
from .models import Users, Points
from backend.app.points.schemas import RegisterPoint, PointInfo


async def add_points(session: AsyncSession, point_data: RegisterPoint) -> list[Points]:
    point = Points(**point_data.model_dump())
    session.add(point)
    await session.commit()
    await session.refresh(point)
    return point

async def get_points(session: AsyncSession, user_id: int) -> list[Points]:
    stmt = select(Points).where(Points.create_id == user_id)
    result: Result = await session.execute(stmt)
    points = result.scalars().all()
    return list(points)

async def update_point(session: AsyncSession, point_id: int, new_point_data: PointInfo):
    pass