from fastapi import APIRouter, Depends, HTTPException, Body, Request, File, UploadFile, Path
from typing import Annotated, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.databases.postgresdb import get_session
from app.schemas.enterprises_schemas import RegisterCompany, ResponseSchema, EnterpriseInfo, ImageData
from app.core.cruds import enterprises_crud
from app.services.auth_bearer import dependencies
from app.services.auth_handler import get_token_data, get_token_data_verify

from app.core.databases.mongodb import MongoDBClient

router = APIRouter(
    prefix='/enterprises',
    tags=['Enterprises'],
)
mongo = MongoDBClient("image", "doc")


@router.post("/register", response_model=ResponseSchema, dependencies=dependencies)
async def register_company(
        request: Request,
        data_company: Annotated[RegisterCompany, Body()],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    if await enterprises_crud.add_enterprise(session=session, data=data_company, user_id=dict_by_token.get("id")) is True:
        return ResponseSchema(status_code=200, detail="Successful registration")
    raise HTTPException(status_code=500, detail="Error when registering a company")


@router.post("/upload_images/{enterprise_id}", response_model=ResponseSchema, dependencies=dependencies)
async def upload_images(
    request: Request,
    enterprise_id: Annotated[int, Path(title="Enterprise ID")],
    image: Optional[UploadFile] = File([]),
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    enterprises_id = await enterprises_crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)

    if enterprise_id not in enterprises_id:
        raise HTTPException(status_code=403, detail='The user does not own this company')
    enterprise = await enterprises_crud.get_enterprise_by_id(session=session, enterprise_id=enterprise_id)
    if enterprise is None:
        raise HTTPException(status_code=404, detail='The enterprise was not found')
    
    content = await image.read()
    info = await mongo.upload_image(image, content)
    image_data = ImageData(id=info['_id'], enterprise_id=enterprise_id)
    await enterprises_crud.add_image(session=session, image_data=image_data)
    return ResponseSchema(status_code=200, detail="Image successfully uploaded to Enterprise")


@router.delete("/delete_image/{enterprise_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_image(
    request: Request,
    enterprise_id: Annotated[int, Path(title="Enterprise ID")],
    session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    enterprises_id = await enterprises_crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)

    if enterprise_id not in enterprises_id:
        raise HTTPException(status_code=403, detail='The user does not own this company')
    enterprise = await enterprises_crud.get_enterprise_by_id(session=session, enterprise_id=enterprise_id)
    if enterprise is None:
        raise HTTPException(status_code=404, detail='The enterprise was not found')
    
    image_id = await enterprises_crud.get_image_by_id(session=session, enterprise_id=enterprise_id)
    if image_id:
        image_info = await mongo.get_image_by_id(image_id)
        if image_info:
            result = await mongo.delete_image_by_id(image_id)
            if result['status_code'] == 200:
                await enterprises_crud.delete_image(session=session, enterprise_id=enterprise_id)
            else:
                return ResponseSchema(status_code=result['status_code'], detail=result)
        else:
            return ResponseSchema(status_code=404, detail={"message": "Image not found", "id": image_id})
    else:
        return ResponseSchema(status_code=404, detail="Image of Enterprise not found")
    return ResponseSchema(status_code=200, detail={"message": "Image of Enterprise successfully deleted"})

@router.get("/enterprises-info", response_model=List[EnterpriseInfo], dependencies=dependencies)
async def get_companies_info(
        request: Request,
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    result = await enterprises_crud.get_all_enterprises_by_id(session=session, user_id=dict_by_token.get("id"))
    if result is None:
        raise HTTPException(status_code=404, detail="No companies found")
    return result