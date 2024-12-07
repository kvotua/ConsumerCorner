from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from gridfs import GridFS
from .mongodb import MongoDBClient
from .models import ImageModel, DocumentModel, UploadImageModel, UploadDocumentModel
from typing import Annotated
from app.database import get_session

from app.config import mongodb_db

import traceback

router = APIRouter(prefix="/mongo", tags=["mongodb"])
mongo = MongoDBClient("image", "doc")

@router.get('/image/{id}',
            response_model=ImageModel)
async def get_image(
    id: str,
):
    image = await mongo.get_image_by_id(id)
    if image:
        return image
    raise HTTPException(status_code=404, detail=f"Image {id} not found")

@router.post('/image', response_model=UploadImageModel)
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    info = await mongo.upload_image(file, contents)
    return JSONResponse(content={"id": info['_id']}, status_code=200)


@router.get('/document/{id}',
            response_model=DocumentModel)
async def get_document(
    id: str,
):
    document = await mongo.get_document_by_id(id)
    if document:
        return document
    raise HTTPException(status_code=404, detail=f"Document {id} not found")

@router.post('/document', response_model=UploadDocumentModel)
async def upload_document(file: UploadFile = File(...)):
    contents = await file.read()
    info = await mongo.upload_document(file, contents)
    return JSONResponse(content={"id": info['_id']}, status_code=200)