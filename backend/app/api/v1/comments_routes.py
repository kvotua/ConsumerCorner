from fastapi import APIRouter, HTTPException, Depends, Path, Query, UploadFile, File, Body, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, Optional, List
from pydantic import ValidationError

from app.core.databases.postgresdb import get_session
from app.schemas.comments_schemas import CommentData, ResponseSchema, CommentsSchema, ImageData
from app.core.cruds import comments_crud, points_crud
from app.core.databases.mongodb import MongoDBClient


router = APIRouter(prefix='/comments', tags=['Comments'])
mongo = MongoDBClient("image", "doc")


@router.post("/{point_id}", response_model=ResponseSchema)
async def add_coment(
    point_id: Annotated[int, Path()],
    text: str = Form(...),
    stars: Optional[int] = Form(None),
    name: Optional[str] = Form(None),
    number: Optional[str] = Form(None),
    isAnonimus: bool = Form(...),
    category: str = Form(...),
    session: AsyncSession = Depends(get_session),
    images: Optional[List[UploadFile]] = File([]),
):
    point = points_crud.point_exists(session=session, point_id=point_id)
    print('\n\n\n\n', point, '\n\n\n\n')
    if not point:
        return HTTPException(status_code=404, detail='Point is not found')
    if category == 'report' and stars is None:
        return HTTPException(status_code=400, detail='The comment-report requires stars')
    if not isAnonimus and (name is None or number is None):
        return HTTPException(status_code=400, detail='The comment requires name and number')
    if isAnonimus:
        name = ""
        number = ""
    try:
        comment_data = CommentData(
            text=text,
            stars=stars,
            name=name,
            number=number,
            isAnonimus=isAnonimus,
            category=category
        )
    except ValidationError as e:
        return HTTPException(status_code=400, detail=e.errors())
    comment_id = await comments_crud.add_comment(session=session, point_id=point_id, comment_data=comment_data)
    for image in images:
        contents = await image.read()
        info = await mongo.upload_image(image, contents)
        image_data = ImageData(id=info['_id'], comment_id=comment_id)
        await comments_crud.add_image(session=session, image_data=image_data)
    return ResponseSchema(status_code=200, detail="The comment has been added successfully")



@router.get("/", response_model=list[CommentsSchema])
async def get_comments(
    point_id: Annotated[int, Query(title="Point ID", examples=[1])],
    session: AsyncSession = Depends(get_session),
) -> list[CommentsSchema]:
    if point_id not in await comments_crud.get_points_id(session=session):
        raise HTTPException(status_code=404, detail="The point was not found")
    return await comments_crud.get_all_comments(session=session, point_id=point_id)