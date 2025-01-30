from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, or_
import statistics

from app.models.models import Comments, Points, Imgs, Enterprises
from app.core.cruds import points_crud
from app.schemas.comments_schemas import CommentData, CommentsSchema, ImageData


async def add_comment(session: AsyncSession, point_id: int, comment_data: CommentData):
    data_for_db = Comments(
        point_id=point_id, text=comment_data.text,
        stars=comment_data.stars,
        name=comment_data.name,
        number=comment_data.number,
        isAnonimus=comment_data.isAnonimus,
        category=comment_data.category
    )
    session.add(data_for_db)
    await session.commit()
    result_point = await session.execute(select(Points).where(Points.id == point_id))
    point = result_point.scalar_one()
    result_comments = await session.execute(select(Comments.stars).where(Comments.point_id == point_id, Comments.stars.isnot(None)))
    stars = result_comments.scalars().all()
    if stars:
        middle_stars = round(statistics.mean(stars), 2)
    else:
        middle_stars = None
    point.middle_stars = middle_stars
    await session.commit()
    return data_for_db.id

async def add_image(session: AsyncSession, image_data: ImageData):
    data_for_db = Imgs(
        id=image_data.id,
        comment_id=image_data.comment_id
    )
    session.add(data_for_db)
    await session.commit()

async def get_all_comments_filter(session: AsyncSession, point_ids: list[int] = None, enterprises_ids: list[int] = None, category: list[str] = None) -> dict:
    result = {}
    only_points_ids = []

    if enterprises_ids is None and point_ids is None:
        stmt_enterprises = select(Enterprises)
        result_enterprises: Result = await session.execute(stmt_enterprises)
        enterprises_ids = [enterprise.id for enterprise in result_enterprises.scalars().all()]

    elif enterprises_ids is None and point_ids is not None:
        only_points_ids = point_ids
        stmt_enterprises = select(Points.enterprise_id).where(Points.id.in_(point_ids))
        result_enterprises: Result = await session.execute(stmt_enterprises)
        enterprises_ids = [enterprise_id for enterprise_id in result_enterprises.scalars().all()]

    stmt_points = select(Points).where(
        Points.enterprise_id.in_(enterprises_ids),
        or_(only_points_ids == [], Points.id.in_(only_points_ids))
    )
    result_points: Result = await session.execute(stmt_points)
    points = result_points.scalars().all()

    point_ids = [point.id for point in points]

    stmt_comments = select(Comments).where(
        Comments.point_id.in_(point_ids),
        or_(category is None, Comments.category.in_(category))
    )
    result_comments: Result = await session.execute(stmt_comments)
    comments = result_comments.scalars().all()

    if not comments:
        return result
    
    comment_ids = [comment.id for comment in comments]
    stmt_imgs = select(Imgs).where(Imgs.comment_id.in_(comment_ids))
    result_imgs: Result = await session.execute(stmt_imgs)
    imgs = result_imgs.scalars().all()

    images_dict = {}
    for img in imgs:
        if img.comment_id not in images_dict:
            images_dict[img.comment_id] = []
        images_dict[img.comment_id].append(img.id)

    for point in points:
        enterprise_id = point.enterprise_id
        point_comments = [comment for comment in comments if comment.point_id == point.id]
        
        if point_comments:  # Only add point and enterprise if there are comments
            if enterprise_id not in result:
                result[enterprise_id] = {}

            result[enterprise_id][point.id] = {}

            for comment in point_comments:
                result[enterprise_id][point.id][comment.id] = {
                    'text': comment.text,
                    'stars': comment.stars,
                    'name': comment.name,
                    'number': comment.number,
                    'isAnonimus': comment.isAnonimus,
                    'category': comment.category,
                    'created_at': comment.created_at,
                    'images_data': images_dict.get(comment.id, [])
                }

    return result


async def get_all_comments(session: AsyncSession, point_id: int) -> list[CommentsSchema]:
    stmt_comments = (select(Comments).where(Comments.point_id == point_id))
    result_comments: Result = await session.execute(stmt_comments)
    comments = result_comments.scalars().all()

    comment_ids = [comment.id for comment in comments]
    stmt_imgs = (select(Imgs).where(Imgs.comment_id.in_(comment_ids)))
    result_imgs: Result = await session.execute(stmt_imgs)
    imgs = result_imgs.scalars().all()

    images_dict = {}
    for img in imgs:
        if img.comment_id not in images_dict:
            images_dict[img.comment_id] = []
        images_dict[img.comment_id].append(img.id)

    comments_data = [
        CommentsSchema(
            id=comment.id,
            point_id=comment.point_id,
            text=comment.text,
            stars=comment.stars,
            name=comment.name,
            number=comment.number,
            isAnonimus=comment.isAnonimus,
            category=comment.category,
            created_at=comment.created_at,
            images_data=images_dict.get(comment.id, [])
        )
        for comment in comments
    ]

    return comments_data

async def get_comment_by_id(session: AsyncSession, comment_id: int) -> CommentsSchema | None:
    # Запрашиваем комментарий по id
    stmt_comment = select(Comments).where(Comments.id == comment_id)
    result_comment: Result = await session.execute(stmt_comment)
    comment = result_comment.scalars().first()

    # Если комментарий не найден, возвращаем None
    if not comment:
        return None

    # Запрашиваем изображения, связанные с этим комментарием
    stmt_imgs = select(Imgs).where(Imgs.comment_id == comment.id)
    result_imgs: Result = await session.execute(stmt_imgs)
    imgs = result_imgs.scalars().all()

    # Собираем список изображений для этого комментария
    images_data = [img.id for img in imgs]

    # Формируем и возвращаем объект CommentsSchema
    return CommentsSchema(
        id=comment.id,
        point_id=comment.point_id,
        text=comment.text,
        stars=comment.stars,
        name=comment.name,
        number=comment.number,
        isAnonimus=comment.isAnonimus,
        category=comment.category,
        created_at=comment.created_at,
        images_data=images_data
    )


async def get_points_id(session: AsyncSession):
    stmt = select(Points.id)
    result: Result = await session.execute(stmt)
    comments_id = result.scalars().all()
    return list(comments_id)

async def get_enterprises_id(session: AsyncSession):
    stmt = select(Enterprises.id)
    result: Result = await session.execute(stmt)
    comments_id = result.scalars().all()
    return list(comments_id)