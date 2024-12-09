from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result

from backend.app.models.models import Comments, Points
from backend.app.schemas.reviews_schemas import CommentData, CommentsSchema


async def add_comment(session: AsyncSession, point_id: int, comment_data: CommentData):
    data_for_db = Comments(
        point_id=point_id, text=comment_data.text,
        stars=comment_data.stars,
    )
    session.add(data_for_db)
    await session.commit()

async def get_all_comments(session: AsyncSession, point_id: int) -> list[CommentsSchema]:
    stmt = select(Comments).where(Comments.point_id == point_id)
    result: Result = await session.execute(stmt)
    comments = result.scalars().all()
    return list(comments)

async def get_points_id(session: AsyncSession):
    stmt = select(Points.id)
    result: Result = await session.execute(stmt)
    reviews_id = result.scalars().all()
    return list(reviews_id)