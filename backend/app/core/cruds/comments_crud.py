from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result

from app.models.models import Comments, Points, Imgs
from app.schemas.comments_schemas import CommentData, CommentsSchema, ImageData

async def add_comment(session: AsyncSession, point_id: int, comment_data: CommentData):
    data_for_db = Comments(
        point_id=point_id, text=comment_data.text,
        stars=comment_data.stars,
    )
    session.add(data_for_db)
    await session.commit()
    return data_for_db.id

async def add_image(session: AsyncSession, image_data: ImageData):
    data_for_db = Imgs(
        id=image_data.id,
        comment_id=image_data.comment_id
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
    comments_id = result.scalars().all()
    return list(comments_id)