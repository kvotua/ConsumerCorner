from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from app.core.databases.postgresdb import get_session
from app.schemas.reviews_schemas import CommentData, ResponseSchema, CommentsSchema
from app.core.cruds import reviews_crud
from app.services.auth_bearer import dependencies


router = APIRouter(prefix='/reviews', tags=['Reviews'])


@router.post("/point_id=", dependencies=dependencies)
async def add_review(
    point_id: Annotated[int, Query(title="ID точки", examples=[1])],
    comment_data: CommentData,
    session: AsyncSession = Depends(get_session),
):
    await reviews_crud.add_comment(session=session, point_id=point_id, comment_data=comment_data)
    return ResponseSchema(status_code=200, detail="OK")


@router.get("/", dependencies=dependencies)
async def get_reviews(
    point_id: Annotated[int, Query(title="ID точки", examples=[1])],
    session: AsyncSession = Depends(get_session),
) -> list[CommentsSchema]:
    # if point_id not in await reviews_crud.get_points_id(session=session):
    #     raise HTTPException(status_code=404, detail="Точка не найдена")
    return await reviews_crud.get_all_comments(session=session, point_id=point_id)