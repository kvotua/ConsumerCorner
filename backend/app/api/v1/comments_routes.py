from fastapi import APIRouter, HTTPException, Depends, Path, Query, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, Optional, List

from app.core.databases.postgresdb import get_session
from app.schemas.comments_schemas import CommentData, ResponseSchema, CommentsSchema, ImageData
from app.core.cruds import comments_crud
from app.core.databases.mongodb import MongoDBClient


router = APIRouter(prefix='/comments', tags=['Comments'])
mongo = MongoDBClient("image", "doc")


@router.post("/{point_id}")
async def add_coment(
    point_id: Annotated[int, Path()],
    text: str = Form(...),  # Используем Form для текстовых данных
    stars: int = Form(...),  # Если у вас есть поле "stars"
    # comment_data: CommentData,
    session: AsyncSession = Depends(get_session),
    images: Optional[List[UploadFile]] = File(None),
):
    comment_data = CommentData(text=text, stars=stars)
    comment_id = await comments_crud.add_comment(session=session, point_id=point_id, comment_data=comment_data)
    for image in images:
        contents = await image.read()
        info = await mongo.upload_image(image, contents)
        image_data = ImageData(id=info['_id'], comment_id=comment_id)
        await comments_crud.add_image(session=session, image_data=image_data)
    return ResponseSchema(status_code=200, detail="OK")


@router.get("/{point_id}")
async def get_comments(
    point_id_path: Annotated[int, Query(title="ID точки", examples=[1])],
    session: AsyncSession = Depends(get_session),
) -> list[CommentsSchema]:
    if point_id_path not in await comments_crud.get_points_id(session=session):
        raise HTTPException(status_code=404, detail="Точка не найдена")
    return await comments_crud.get_all_comments(session=session, point_id=point_id_path)