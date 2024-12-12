from fastapi import APIRouter, HTTPException, Depends, Body, Path, Request, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, List, Optional

from app.core.databases.postgresdb import get_session
from app.schemas.enterprises_schemas import ResponseSchema
from app.schemas.points_schemas import RegisterPoint, PointInfo, ChangePointSchema, DocumentData
from app.services.auth_handler import get_token_data_verify, decode_jwt_with_verify
from app.core.cruds import points_crud
from app.services.auth_bearer import dependencies
from app.core.databases.mongodb import MongoDBClient



router = APIRouter(prefix="/points", tags=["Points"])
mongo = MongoDBClient("image", "doc")


@router.post("/register", response_model=ResponseSchema, dependencies=dependencies)
async def register_point(
        request: Request,
        data_point: Annotated[RegisterPoint, Body()],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    enterprises_ids = await points_crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)
    if data_point.enterprise_id not in enterprises_ids:
        raise HTTPException(status_code=403, detail="Пользователь не владеет данной компанией")
    await points_crud.add_points(session=session, point_data=data_point, user_id=user_id)
    return ResponseSchema(status_code=201, detail="Точка успешно зарегистрирована")

@router.post("/document/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def add_document(
    request: Request,
    point_id: Annotated[int, Path(title="ID точки")],
    documents: Optional[List[UploadFile]] = File([]),
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='Пользователь не владеет данной точкой')
    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='Точка не найдена')
    if documents:
        for document in documents:
            contents = await document.read()
            info = await mongo.upload_document(document, contents)
            document_data = DocumentData(id=info['_id'], point_id=point_id)
            await points_crud.add_document(session=session, document_data=document_data)
    return ResponseSchema(status_code=200, detail="Document's successfully uploaded")

@router.get("/", response_model=List[PointInfo], dependencies=dependencies)
async def get_points_info(
        request: Request,
        session: AsyncSession = Depends(get_session),
):

    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    return await points_crud.get_all_points(session=session, user_id=dict_by_token.get("id"))


@router.patch("/change/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def change_point(
        request: Request,
        point_id: Annotated[int, Path(title="ID точки")],
        new_point_info: ChangePointSchema,
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='Пользователь не владеет данной точкой')

    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='Точка не найдена')

    await points_crud.update_point(session=session, point=point, point_change=new_point_info)

    return ResponseSchema(status_code=200, detail=f"Точка {point_id} успешно изменена")



@router.delete("/delete/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_point(
        request: Request,
        point_id: Annotated[int, Path(title='ID точки', examples=[1])],
        session: AsyncSession = Depends(get_session),
):
    headers = request.headers
    token_list = headers.get("authorization").split()
    dict_by_token = decode_jwt_with_verify(token_list[1])
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")

    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)
    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='Пользователь не владеет данной точкой')

    await points_crud.delete_point(session=session, point=await points_crud.get_point_by_id(session=session, point_id=point_id))
    return ResponseSchema(status_code=200, detail="Точка успешно удалена")