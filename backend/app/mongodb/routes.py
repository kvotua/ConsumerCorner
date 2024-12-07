from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from gridfs import GridFS
from .mongodb import MongoDBClient
from .models import ImageModel, DocumentModel, UploadImageModel, UploadDocumentModel
from typing import Annotated
from backend.app.database import get_session

import traceback

router = APIRouter(prefix="/mongo", tags=["mongodb"])
mongo = MongoDBClient("test_db", "image", "doc")
# fs = GridFS(mongo.db)

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
    try:
        contents = await file.read()

        info = await mongo.upload_image(file, contents)

        return JSONResponse(content={"id": info['_id']}, status_code=200)
    except Exception as e:
        print(traceback.format_exc())
        return JSONResponse(content={"error": str(e)}, status_code=500)


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
    try:
        contents = await file.read()

        info = await mongo.upload_document(file, contents)

        return JSONResponse(content={"id": info['_id']}, status_code=200)
    except Exception as e:
        print(traceback.format_exc())
        return JSONResponse(content={"error": str(e)}, status_code=500)