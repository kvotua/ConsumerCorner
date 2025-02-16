from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result, delete
from app.models.models import Points, Enterprises, Docs, Social, SocialPoint, Imgs, Comments
from app.schemas.points_schemas import RegisterPoint, ChangePointSchema, DocumentData, PointInfo, SocialSchema, ImageData, FirmInfo
from app.core.cruds.enterprises_crud import get_enterprise_by_id
from app.services.inn_services import INNService
from app.services.points_services import parse_time
from fastapi import HTTPException
import pytz
import datetime


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
    return data_for_db.id

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
        docs_dict[doc.point_id].append({
            "id": doc.id,
            "isTemp": doc.isTemp,
            "date_added": doc.date_added,
            "date_closed": doc.date_closed,
            "name": doc.name
        })

    stmt_social = select(SocialPoint, Social).join(Social, SocialPoint.social_id == Social.id).where(
        SocialPoint.point_id.in_(point_ids))
    result_social = await session.execute(stmt_social)
    social_data_all = result_social.all()

    social_dict = {}
    for social_point, social in social_data_all:
        if social_point.point_id not in social_dict:
            social_dict[social_point.point_id] = []
        social_dict[social_point.point_id].append({"social_id": social.id, "name": social.name, "link": social.link})

    points_data = [
        PointInfo(
            id=point.id,
            enterprise_id=point.enterprise_id,
            title=point.title,
            image_id=point.image_id,
            address=point.address,
            opening_time=point.opening_time,
            closing_time=point.closing_time,
            phone=point.phone,
            type_activity=point.type_activity,
            middle_stars=point.middle_stars,
            verify_phone=point.verify_phone,
            created_at=point.created_at,
            documents_data=docs_dict.get(point.id, []),
            social_data=social_dict.get(point.id, []),
        )
        for point in points
    ]

    return points_data

async def add_document(session: AsyncSession, document_data: DocumentData):
    data_for_db = Docs(
        id=document_data.id,
        point_id=document_data.point_id,
        isTemp=document_data.isTemp,
        date_closed=document_data.date_closed,
        name=document_data.name
    )

    session.add(data_for_db)
    await session.commit()

async def delete_document(session: AsyncSession, document_id: str):
    stmt = select(Docs).filter(Docs.id == document_id)
    result: Result = await session.execute(stmt)
    document = result.scalars().first()

    if not document:
        return {"status_code": 404, "message": "Document not found"}
    
    await session.delete(document)
    await session.commit()

    return {"status_code": 200, "message": "Document successfully deleted"}

async def add_image(session: AsyncSession, image_data: ImageData):
    stmt = select(Points).where(Points.id == image_data.point_id)
    result = await session.execute(stmt)
    point = result.scalars().first()
    point.image_id = image_data.id
    await session.commit()
    await session.refresh(point)
    
async def delete_image(session: AsyncSession, point_id: str):
    stmt = select(Points).where(Points.id == point_id)
    result = await session.execute(stmt)
    point = result.scalars().first()
    point.image_id = None
    await session.commit()
    await session.refresh(point)
    
async def get_image_by_id(session: AsyncSession, point_id: int):
    stmt = select(Points.image_id).where(Points.id == point_id)
    result = await session.execute(stmt)
    return result.scalars().first()

async def get_point_by_user_id(session: AsyncSession, user_id: int):
    stmt = select(Points.id).where(Points.create_id == user_id)
    result: Result = await session.execute(stmt)
    points_id = result.scalars().all()
    return points_id

async def get_point_by_id(session: AsyncSession, point_id: int) -> PointInfo:
    stmt = select(Points).where(Points.id == point_id)
    result = await session.execute(stmt)
    point = result.scalars().first()
    stmt_2 = select(SocialPoint, Social).join(Social, SocialPoint.social_id == Social.id).where(SocialPoint.point_id == point_id)
    result_2 = await session.execute(stmt_2)
    social_data = result_2.all()
    social_data_dicts = [
        {"social_id": social.id, "name": social.name, "link": social.link} for social_point, social in social_data
    ]

    stmt_3 = select(Docs).where(Docs.point_id == point_id)
    result_3 = await session.execute(stmt_3)
    docs = result_3.scalars().all()

    documents_data = [
        {
            "id": doc.id,
            "isTemp": doc.isTemp,
            "date_added": doc.date_added,
            "date_closed": doc.date_closed,
            "name": doc.name
        }
        for doc in docs
    ]

    return PointInfo(
        id=point.id,
        enterprise_id=point.enterprise_id,
        title=point.title,
        image_id=point.image_id,
        address=point.address,
        opening_time=point.opening_time,
        closing_time=point.closing_time,
        phone=point.phone,
        type_activity=point.type_activity,
        middle_stars=point.middle_stars,
        verify_phone=point.verify_phone,
        created_at=point.created_at,
        documents_data=documents_data,
        social_data=social_data_dicts,
    )

async def get_firm_info_by_point_id(session: AsyncSession, point_id: int) -> FirmInfo:
    point_info = await get_point_by_id(session=session, point_id=point_id)
    enterprise_info = await get_enterprise_by_id(session=session, enterprise_id=point_info.enterprise_id)
    inn_service = INNService()
    if len(enterprise_info.inn) == 10:
        inn_info = inn_service.fetch_company_data(inn=enterprise_info.inn)
        inn_name = inn_info.name
    else:
        inn_info = inn_service.fetch_ip_data(inn=enterprise_info.inn)
        inn_name = inn_info.fio
    return FirmInfo(
        id=point_id,
        title=point_info.title,
        address=point_info.address,
        documents_data=point_info.documents_data,
        social_data=point_info.social_data,
        inn=enterprise_info.inn,
        ogrn=enterprise_info.ogrn,
        name=inn_name
    )


async def get_all_points_by_enterprise_id(session: AsyncSession, enterprise_id: int) -> list[PointInfo]:
    stmt = select(Points.id).where(Points.enterprise_id == enterprise_id)
    result = await session.execute(stmt)
    points_id = result.scalars().all()
    points_list = []
    for point_id in points_id:
        points_list.append(
            await get_point_by_id(session=session, point_id=point_id)
        )
    return points_list


async def update_point(session: AsyncSession, point: Points, point_change: ChangePointSchema):
    if point_change.opening_time:
        point_change.opening_time = parse_time(point_change.opening_time)
    if point_change.closing_time:
        point_change.closing_time = parse_time(point_change.closing_time)
    for name, value in point_change.model_dump(exclude_none=True).items():
        setattr(point, name, value)
    await session.commit()
    await session.refresh(point)
    return point

async def delete_point(session: AsyncSession, point: Points):
    await session.delete(point)
    await session.commit()

async def point_exists(session: AsyncSession, point_id: int) -> bool:
    stmt = select(Points.id).where(Points.id == point_id)
    result = await session.execute(stmt)
    return result.scalar() is not None

async def get_point_by_id_v2(session: AsyncSession, point_id: int):
    stmt = select(Points).where(Points.id == point_id)
    result = await session.execute(stmt)
    return result.scalars().first()

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
    social_point = select(SocialPoint).where(SocialPoint.social_id == social_id)
    await session.delete(social_point)