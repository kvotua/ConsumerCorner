from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, delete
from app.models.models import Points, Enterprises, Docs, Social, SocialPoint
from app.schemas.points_schemas import RegisterPoint, ChangePointSchema, DocumentData, PointInfo, SocialSchema, ImageData
from app.services.points_services import parse_time


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

async def get_all_points(session: AsyncSession, user_id: int) -> list[PointInfo]:
    stmt_points = select(Points).where(Points.create_id == user_id)
    result_points = await session.execute(stmt_points)
    points = result_points.scalars().all()

    point_ids = [point.id for point in points]
    stmt_docs = select(Docs).where(Docs.point_id.in_(point_ids))
    result_docs = await session.execute(stmt_docs)
    docs = result_docs.scalars().all()

    docs_dict = {}
    for doc in docs:
        if doc.point_id not in docs_dict:
            docs_dict[doc.point_id] = []
        docs_dict[doc.point_id].append(doc.id)

    points_data = [
        PointInfo(
            id=point.id,
            enterprise_id=point.enterprise_id,
            title=point.title,
            address=point.address,
            opening_time=point.opening_time,
            closing_time=point.closing_time,
            phone=point.phone,
            type_activity=point.type_activity,
            middle_stars=point.middle_stars,
            verify_phone=point.verify_phone,
            created_at=point.created_at,
            documents_data=docs_dict.get(point.id, [])
        )
        for point in points
    ]

    return points_data

async def add_document(session: AsyncSession, document_data: DocumentData):
    data_for_db = Docs(
        id=document_data.id,
        point_id=document_data.point_id
    )
    session.add(data_for_db)
    await session.commit()

async def get_point_by_user_id(session: AsyncSession, user_id: int):
    stmt = select(Points.id).where(Points.create_id == user_id)
    result: Result = await session.execute(stmt)
    points_id = result.scalars().all()
    return points_id

async def get_point_by_id(session: AsyncSession, point_id: int) -> Points:
    stmt = select(Points).where(Points.id == point_id)
    result = await session.execute(stmt)
    return result.scalars().first()

async def add_image(session: AsyncSession, image_data: ImageData):
    point = await get_point_by_id(session=session, point_id=image_data.point_id)
    if not point:
        return False
    point.image_id = True
    await session.commit()
    await session.refresh(point)
    return True

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

async def add_social(session: AsyncSession, data: SocialSchema, enterprise_id: int):
    data_for_db = Social(
        enterprises_id=enterprise_id,
        name=data.name,
        link=data.link,
    )
    session.add(data_for_db)
    await session.commit()
    return data_for_db.id

async def add_social_point(session: AsyncSession, social_id: int, point_id: int):
    data_for_db = SocialPoint(social_id=social_id, point_id=point_id)
    session.add(data_for_db)
    await session.commit()

async def get_all_social(session: AsyncSession, point_id: int) -> list[Social]:
    stmt = select(SocialPoint.social_id).where(SocialPoint.point_id == point_id)
    result: Result = await session.execute(stmt)
    socials_id = result.scalars().all()
    stmt_2 = select(Social).filter(Social.id.in_(socials_id))
    result_2: Result = await session.execute(stmt_2)
    list_socials = result_2.scalars().all()
    return list(list_socials)

async def delete_social_by_id(session: AsyncSession, social_id: int):
    await session.execute(delete(SocialPoint).where(SocialPoint.social_id == social_id))