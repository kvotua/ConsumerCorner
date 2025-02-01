from fastapi import APIRouter, Depends, HTTPException, Body, Request, File, UploadFile, Path, Query
from typing import Annotated, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.databases.postgresdb import get_session
from app.schemas.enterprises_schemas import RegisterCompany, ResponseSchema, EnterpriseInfo, ImageData, ChangeEnterpriseSchema, AddUser
from app.core.cruds import enterprises_crud, users_crud
from app.services.auth_bearer import dependencies
from app.services.auth_handler import get_token_data, get_token_data_verify

from app.core.databases.mongodb import MongoDBClient

router = APIRouter(
    prefix='/enterprises',
    tags=['enterprises'],
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
    enterprise_id = await enterprises_crud.add_enterprise(session=session, data=data_company, user_id=dict_by_token.get("id"))
    if enterprise_id:
        return ResponseSchema(status_code=200, detail={"message": "Successful registration", "enterprise_id": enterprise_id})
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
    return ResponseSchema(status_code=200, detail={"message": "Image successfully uploaded to Enterprise", "enterprise_id": enterprise_id})


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
    return ResponseSchema(status_code=200, detail={"message": "Image of Enterprise successfully deleted", "enterprise_id": enterprise_id})


@router.patch("/change/{enterprise_id}", response_model=ResponseSchema, dependencies=dependencies)
async def change_enterprise(
        request: Request,
        enterprise_id: Annotated[int, Path(title="Enterprise ID")],
        new_enterprise_info: ChangeEnterpriseSchema,
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    enterprises_id = await enterprises_crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)
    if enterprise_id not in enterprises_id:
        raise HTTPException(status_code=403, detail='The user does not own this company')
    
    enterprise = await enterprises_crud.get_enterprise_by_id_v2(session=session, enterprise_id=enterprise_id)
    if enterprise is None:
        raise HTTPException(status_code=404, detail='The enterprise was not found')

    await enterprises_crud.update_enterprise(session=session, enterprise=enterprise, enterprise_change=new_enterprise_info)

    return ResponseSchema(status_code=200, detail={"message": "Enterprise could be changed", "enterprise_id": enterprise_id})

@router.get("/enterprises-info", response_model=List[EnterpriseInfo], dependencies=dependencies)
async def get_enterprises_info(
        request: Request,
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data(request)
    result = await enterprises_crud.get_all_enterprises_by_id(session=session, user_id=dict_by_token.get("id"))
    if result is None:
        raise HTTPException(status_code=404, detail="No companies found")
    return result


@router.get("/get-users", response_model=dict, dependencies=dependencies)
async def get_users(
        request: Request,
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")
    enterprises_ids = await enterprises_crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)
    if len(enterprises_ids) == 0:
        enterprises_ids = await enterprises_crud.get_enterprises_ids_in_users_enterprises(session=session, user_id=user_id)
        if len(enterprises_ids) == 0:
            raise HTTPException(status_code=404, detail="No companies found")
    return await enterprises_crud.get_users_in_enterprises_by_ids(session=session, enterprises_ids=enterprises_ids, user_id=user_id)


@router.get("/add-users", response_model=ResponseSchema)
async def add_users(
        user_id: Annotated[int, Query(title="User ID", example=3)],
        enterprise_id: Annotated[int, Query(title="Enterprise ID", example=21)],
        role: Annotated[str, Query(title="Role name", example='Администратор')],
        session: AsyncSession = Depends(get_session),
):
    user = await users_crud.get_user_by_id(session=session, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    enterprise = await enterprises_crud.get_enterprise_by_id_v2(session=session, enterprise_id=enterprise_id)
    if not enterprise:
        raise HTTPException(status_code=404, detail="Enterprise not found")
    if enterprise.create_id == user.id:
        raise HTTPException(status_code=403, detail="User owner of this enterprise")
    
    await enterprises_crud.add_user_enterprises_role(session=session, user_id=user_id, enterprise_id=enterprise_id, role=role)
    return ResponseSchema(status_code=200, detail={"message": "Successful user registration", "user_id": user_id}) 

@router.get("/{enterprise_id}", response_model=EnterpriseInfo, dependencies=dependencies)
async def get_enterprise(
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
    return enterprise

@router.delete("/delete/{enterprise_id}", response_model=ResponseSchema, dependencies=dependencies)
async def delete_enteprise(
        request: Request,
        enterprise_id: Annotated[int, Path(title='Enterprise ID', examples=[1])],
        session: AsyncSession = Depends(get_session),
):
    dict_by_token = get_token_data_verify(request)
    if dict_by_token is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token")
    user_id = dict_by_token.get("id")

    enterprises_id = await enterprises_crud.get_enterprises_id_by_user_id(session=session, user_id=user_id)
    if enterprise_id not in enterprises_id:
        raise HTTPException(status_code=403, detail='The user does not own this enterprise')

    await enterprises_crud.delete_enterprise(session=session, enterprise=await enterprises_crud.get_enterprise_by_id_v2(session=session, enterprise_id=enterprise_id))
    return ResponseSchema(status_code=200, detail={"message": "Enterprise could be deleted", "enterprise_id": enterprise_id})