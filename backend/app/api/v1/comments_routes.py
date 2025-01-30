from fastapi import APIRouter, HTTPException, Depends, Path, Query, UploadFile, File, Body, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, Optional, List, Dict, Any
from pydantic import ValidationError

from app.core.databases.postgresdb import get_session
from app.schemas.comments_schemas import CommentData, ResponseSchema, CommentsSchema, ImageData, GetCommentsRequest
from app.core.cruds import comments_crud, points_crud
from app.core.databases.mongodb import MongoDBClient


router = APIRouter(prefix='/comments', tags=['comments'])
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
    point = await points_crud.point_exists(session=session, point_id=point_id)
    if not point:
        return HTTPException(status_code=404, detail='Point is not found')
    if category not in ['report', 'offer', 'appeal']:
        return HTTPException(status_code=400, detail='Category can only be: report, offer or appeal')
    if category in ['report', 'appeal'] and stars is None:
        return HTTPException(status_code=400, detail='The comment-report or comment-appeal requires stars')
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
    except ValueError as e:
        return HTTPException(status_code=400, detail=str(e))
    except ValidationError as e:
        return HTTPException(status_code=400, detail=e.errors())
    comment_id = await comments_crud.add_comment(session=session, point_id=point_id, comment_data=comment_data)
    for image in images:
        contents = await image.read()
        info = await mongo.upload_image(image, contents)
        image_data = ImageData(id=info['_id'], comment_id=comment_id)
        await comments_crud.add_image(session=session, image_data=image_data)
    return ResponseSchema(status_code=200, detail="The comment has been added successfully")

@router.post("/", response_model=Dict[int, Dict[int, Dict[int, Any]]])
async def get_comments(
    request: GetCommentsRequest,
    session: AsyncSession = Depends(get_session),
) -> Dict[int, Dict[int, Dict[int, Any]]]:
    point_ids = request.point_ids
    enterprises_ids = request.enterprises_ids
    category = request.category
    if point_ids and enterprises_ids:
        raise HTTPException(status_code=400, detail="Specify either point_ids or enterprises_ids, not both.")
    if category is not None:
        invalid_categories = [cat for cat in category if cat not in ['report', 'offer', 'appeal']]
        if invalid_categories:
            raise HTTPException(status_code=400, detail=f"Invalid categories: {', '.join(invalid_categories)}. Category can only be: report, offer or appeal")
    
    if not point_ids and not enterprises_ids:
        return await comments_crud.get_all_comments_filter(session=session, category=category)

    if point_ids:
        valid_points = await comments_crud.get_points_id(session=session)
        invalid_points = [point_id for point_id in point_ids if point_id not in valid_points]
        if invalid_points:
            raise HTTPException(status_code=404, detail=f"Points not found: {invalid_points}")
        return await comments_crud.get_all_comments_filter(session=session, point_ids=point_ids, category=category)

    if enterprises_ids:
        valid_enterprises = await comments_crud.get_enterprises_id(session=session)
        invalid_enterprises = [enterprise_id for enterprise_id in enterprises_ids if enterprise_id not in valid_enterprises]
        if invalid_enterprises:
            raise HTTPException(status_code=404, detail=f"Enterprises not found: {invalid_enterprises}")
        return await comments_crud.get_all_comments_filter(session=session, enterprises_ids=enterprises_ids, category=category)
    
@router.get("/{comment_id}", response_model=CommentsSchema)
async def get_comment_by_id(
    comment_id: Annotated[int, Path(..., title="Point ID", example=1)],
    session: AsyncSession = Depends(get_session),
) -> CommentsSchema:
    comment = await comments_crud.get_comment_by_id(session=session, comment_id=comment_id)
    if comment:
        return comment
    else:
        raise HTTPException(status_code=404, detail={"message": "Comment not found", "comment_id": comment_id})