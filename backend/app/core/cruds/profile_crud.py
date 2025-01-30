from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, update, delete

from app.models.models import Enterprises, Points, Comments
from app.core.cruds import points_crud

from app.core.cruds.users_crud import get_user_by_id

async def get_socials_exist(session: AsyncSession, user_id: int) -> bool:
    points = await points_crud.get_all_points(session=session, user_id=user_id)

    for point in points:
        if point.social_data:
            return True 
    
    return False

async def get_documents_exist(session: AsyncSession, user_id: int) -> bool:
    points = await points_crud.get_all_points(session=session, user_id=user_id)

    for point in points:
        if point.documents_data:
            return True 
    
    return False

async def get_comments_count(session: AsyncSession, user_id: int) -> int:
    points_ids = await points_crud.get_point_by_user_id(session=session, user_id=user_id)
    
    if not points_ids:
        return 0
    
    stmt_comments = select(Comments).where(Comments.point_id.in_(points_ids))
    
    result = await session.execute(stmt_comments)
    comments = result.scalars().all()

    return len(comments)