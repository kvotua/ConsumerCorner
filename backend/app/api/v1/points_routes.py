from fastapi import APIRouter, HTTPException, Depends, Body, Path, Request, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated, List, Optional

from app.core.databases.postgresdb import get_session
from app.schemas.enterprises_schemas import ResponseSchema
from app.schemas.points_schemas import RegisterPoint, PointInfo, ChangePointSchema, DocumentData, SocialSchema, SocialID, ImageData
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
        raise HTTPException(status_code=403, detail="The user does not own this company")
    await points_crud.add_points(session=session, point_data=data_point, user_id=user_id)
    return ResponseSchema(status_code=201, detail="The point has been successfully registered")

@router.post("/document/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def add_document(
    request: Request,
    point_id: Annotated[int, Path(title="Point ID")],
    documents: Optional[List[UploadFile]] = File([]),
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='The user does not own this company')
    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='The point was not found')
    document_ids = []
    if documents:
        for document in documents:
            contents = await document.read()
            info = await mongo.upload_document(document, contents)
            document_data = DocumentData(id=info['_id'], point_id=point_id)
            document_ids.append(info['_id'])
            await points_crud.add_document(session=session, document_data=document_data)
    return ResponseSchema(status_code=200, detail={"message": "Document's successfully uploaded", "ids": document_ids})


@router.delete("/document/{point_id}/{document_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_document(
    request: Request,
    point_id: Annotated[int, Path(title="Point ID")],
    document_id: Annotated[str, Path(title="Document ID")],
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='The user does not own this company')
    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='The point was not found')
    if document_id:
        document_info = await mongo.get_document_by_id(document_id)
        if document_info:
            result = await mongo.delete_document_by_id(document_id)
            if result['status_code'] == 200:
                await points_crud.delete_document(session=session, document_id=document_id)
            else:
                return ResponseSchema(status_code=result['status_code'], detail=result)
        else:
            return ResponseSchema(status_code=404, detail={"message": "Document not found", "id": document_id})
    return ResponseSchema(status_code=200, detail={"message": "Document successfully deleted", "id": document_id})



@router.post("/upload_image/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def upload_image(
    request: Request,
    point_id: Annotated[int, Path(title="Point ID")],
    image: Optional[UploadFile] = File([]),
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='The user does not own this company')
    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='The point was not found')
    
    content = await image.read()
    info = await mongo.upload_image(image, content)
    image_data = ImageData(id=info['_id'], point_id=point_id)
    await points_crud.add_image(session=session, image_data=image_data)
    return ResponseSchema(status_code=200, detail="Image successfully uploaded to Point")

@router.delete("/delete_image/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_image(
    request: Request,
    point_id: Annotated[int, Path(title="Point ID")],
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)

    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='The user does not own this company')
    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='The point was not found')
    
    image_id = await points_crud.get_image_by_id(session=session, point_id=point_id)
    if image_id:
        image_info = await mongo.get_image_by_id(image_id)
        if image_info:
            result = await mongo.delete_image_by_id(image_id)
            if result['status_code'] == 200:
                await points_crud.delete_image(session=session, point_id=point_id)
            else:
                return ResponseSchema(status_code=result['status_code'], detail=result)
        else:
            return ResponseSchema(status_code=404, detail={"message": "Image not found", "id": image_id})
    else:
        return ResponseSchema(status_code=404, detail="Image of Point not found")
    return ResponseSchema(status_code=200, detail={"message": "Image of Point successfully deleted"})#, "id": image_id})

    

@router.get("/", response_model=List[PointInfo], dependencies=dependencies)
async def get_points_info(
        request: Request,
        session: AsyncSession = Depends(get_session),
):

    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    return await points_crud.get_all_points(session=session, user_id=dict_by_token.get("id"))


@router.get("/{point_id}", response_model=PointInfo)
async def get_points_info(
        point_id: Annotated[int, Path(title="ID точки")],
        session: AsyncSession = Depends(get_session),
):
    return await points_crud.get_point_by_id(session=session, point_id=point_id)


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
        raise HTTPException(status_code=403, detail='The user does not own this company')

    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point is None:
        raise HTTPException(status_code=404, detail='The point was not found')

    await points_crud.update_point(session=session, point=point, point_change=new_point_info)

    return ResponseSchema(status_code=200, detail=f"Point {point_id} could be changed")


@router.delete("/delete/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_point(
        request: Request,
        point_id: Annotated[int, Path(title='ID точки', examples=[1])],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")

    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)
    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='The user does not own this point')

    await points_crud.delete_point(session=session, point=await points_crud.get_point_by_id(session=session, point_id=point_id))
    return ResponseSchema(status_code=200, detail=f"Point {point_id} could be deleted")


@router.post("/social/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def add_social(
        request: Request,
        point_id: Annotated[int, Path(title="Point ID", examples=[1], ge=1)],
        social_data: SocialSchema,
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")

    points_id = await points_crud.get_point_by_user_id(session=session, user_id=user_id)
    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='The user does not own this point')

    point = await points_crud.get_point_by_id(session=session, point_id=point_id)
    if point:
        social_id = await points_crud.add_social(session=session, data=social_data, enterprise_id=point.enterprise_id)
        await points_crud.add_social_point(session=session, social_id=social_id, point_id=point_id)
        return ResponseSchema(status_code=200, detail=f"Social for {point_id} point successfully added")
    else:
        raise HTTPException(status_code=404, detail="The point was not found")


@router.delete("/social/{point_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_social(
    request: Request,
    point_id: Annotated[int, Path(title="Point ID", examples=[1], ge=1)],
    social_id: Annotated[SocialID, Body()],
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")

    points_id = await points_crud.get_point_by_user_id(session=session, user_id=dict_by_token.get("id"))
    if point_id not in points_id:
        raise HTTPException(status_code=403, detail='The user does not own this point')

    if await points_crud.delete_social_by_id(session=session, social_id=social_id):
        return ResponseSchema(status_code=200, detail="Social deleted")
    else:
        raise HTTPException(status_code=404, detail="Invalid social ID")