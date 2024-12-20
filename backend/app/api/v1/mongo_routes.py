from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from app.core.databases.mongodb import MongoDBClient
from app.models.mongo_models import ImageModel, DocumentModel, UploadImageModel, UploadDocumentModel, DeleteImageModel, DeleteDocumentModel

import logging

router = APIRouter(prefix="/mongo", tags=["mongodb"])
mongo = MongoDBClient("image", "doc")
logger = logging.getLogger(__name__)


@router.get('/image/{id}',
            response_model=ImageModel)
async def get_image(
    id: str,
):
    logger.info(f"GET /image with ID: {id}")
    image = await mongo.get_image_by_id(id)
    if image:
        return JSONResponse(content=image, status_code=image['status_code'])
    return JSONResponse(status_code=404, content={"message": f"Image not found",
                                                 "id": id,
                                                 "status_code": 404})

@router.post('/image', response_model=UploadImageModel)
async def upload_image(file: UploadFile = File(...)):
    logger.info(f"POST /image")
    contents = await file.read()
    info = await mongo.upload_image(file, contents)
    return JSONResponse(content={"id": info['_id']}, status_code=200)

@router.delete('/image/{id}',
            response_model=DeleteImageModel)
async def delete_image(
    id: str,
):
    logger.info(f"DELETE /image with ID: {id}")
    image = await mongo.delete_image_by_id(id)
    if image:
        return JSONResponse(content=image, status_code=image['status_code'])
    return JSONResponse(status_code=404, content={"message": f"Image not found",
                                                 "id": id,
                                                 "status_code": 404})



@router.get('/document/{id}',
            response_model=DocumentModel)
async def get_document(
    id: str,
):
    logger.info(f"GET /document with ID: {id}")
    document = await mongo.get_document_by_id(id)
    if document:
        return JSONResponse(content=document, status_code=document['status_code'])
    return JSONResponse(status_code=404, content={"message": f"Document not found",
                                                 "id": id,
                                                 "status_code": 404})

@router.post('/document', response_model=UploadDocumentModel)
async def upload_document(file: UploadFile = File(...)):
    logger.info(f"POST /document")
    contents = await file.read()
    info = await mongo.upload_document(file, contents)
    return JSONResponse(content={"id": info['_id']}, status_code=200)

@router.delete('/document/{id}',
            response_model=DeleteDocumentModel)
async def delete_document(
    id: str,
):
    logger.info(f"DELETE /document with ID: {id}")
    document = await mongo.delete_document_by_id(id)
    if document:
        return JSONResponse(content=document, status_code=document['status_code'])
    return JSONResponse(status_code=404, content={"message": f"Document not found",
                                                 "id": id,
                                                 "status_code": 404})