from fastapi import UploadFile
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from bson import ObjectId
from app.config import mongodb_url, mongodb_db
from typing import Optional

import logging
import base64

logger = logging.getLogger(__name__)

class MongoDBClient:
    def __init__(self, image_collection_name: str, document_collection_name: str):
        self.client = AsyncIOMotorClient(mongodb_url)
        self.db = self.client[mongodb_db]
        self.image_collection = self.db[image_collection_name]
        self.document_collection = self.db[document_collection_name]
        self.fs = AsyncIOMotorGridFSBucket(self.db)

    async def get_image_by_id(self, image_id: str):
        if not ObjectId.is_valid(image_id):
            return None
        image = await self.image_collection.find_one({"_id": ObjectId(image_id)})
        if image:
            stream = await self.fs.open_download_stream(image['file_id'])
            image_data = b""
            async for chunk in stream:
                image_data += chunk
            
            logger.info(f"Image with id {image_id} successfully getting")
            return {
                "status_code": 200,
                "id": str(image["_id"]),
                "filename": image["filename"],
                "content_type": image["content_type"],
                "upload_date": image["upload_date"].isoformat(),
                "image_data": base64.b64encode(image_data).decode('utf-8')
            }
        else:
            logger.error(f"Image with id {image_id} not found")
            return False

    async def upload_image(self, file: UploadFile, contents):
        file_id = await self.fs.upload_from_stream(
            file.filename,
            contents,
            metadata={"content_type": file.content_type}
        )
        file_metadata = await self.db.fs.files.find_one({"_id": file_id})
        if not file_metadata:
            raise ValueError("File metadata not found after upload.")
        
        metadata = { 
            'file_id': file_id, 
            'filename': file.filename, 
            'content_type': file.content_type, 
            'upload_date': file_metadata.get("uploadDate") 
        }

        
        result = await self.image_collection.insert_one(metadata)
        
        metadata['_id'] = str(result.inserted_id)
        
        logger.info(f"Image with id {str(result.inserted_id)} successfully uploaded")
        return metadata

    async def get_document_by_id(self, document_id: str) -> Optional[dict]:
        if not ObjectId.is_valid(document_id):
            return None
        document = await self.document_collection.find_one({"_id": ObjectId(document_id)})
        if document:
            stream = await self.fs.open_download_stream(document['file_id'])
            document_data = b""
            async for chunk in stream:
                document_data += chunk

            logger.info(f"Document with id {document_id} successfully getting")
            return {
                "status_code": 200,
                "id": str(document["_id"]),
                "filename": document["filename"],
                "content_type": document["content_type"],
                "upload_date": document["upload_date"].isoformat(),
                "document_data": base64.b64encode(document_data).decode('utf-8')
            }
        else:
            logger.error(f"Document with id {document_id} not found")
            return False
    
    async def upload_document(self, file: UploadFile, contents):
        file_id = await self.fs.upload_from_stream(
            file.filename,
            contents,
            metadata={"content_type": file.content_type}
        )
        file_metadata = await self.db.fs.files.find_one({"_id": file_id})
        if not file_metadata:
            raise ValueError("File metadata not found after upload.")
        
        metadata = { 
            'file_id': file_id, 
            'filename': file.filename, 
            'content_type': file.content_type, 
            'upload_date': file_metadata.get("uploadDate") 
        }

        
        result = await self.document_collection.insert_one(metadata)
        
        metadata['_id'] = str(result.inserted_id)
        logger.info(f"Document with id {str(result.inserted_id)} successfully uploaded")
        return metadata
    
    async def delete_image_by_id(self, image_id: str):
        if not ObjectId.is_valid(image_id):
            return {'status_code': 400, 'message': 'Invalid image ID', 'id': image_id}

        image = await self.image_collection.find_one({"_id": ObjectId(image_id)})
        if not image:
            return {'status_code': 404, 'message': 'Image not found', 'id': image_id}

        await self.fs.delete(image['file_id'])

        await self.image_collection.delete_one({"_id": ObjectId(image_id)})

        logger.info(f"Image with id {image_id} successfully deleted")
        return {"status_code": 200, "message": "Image successfully deleted", "id": image_id}

    async def delete_document_by_id(self, document_id: str):
        if not ObjectId.is_valid(document_id):
            return {'status_code': 400, 'message': 'Invalid document ID', 'id': document_id}

        document = await self.document_collection.find_one({"_id": ObjectId(document_id)})
        if not document:
            return {'status_code': 404, 'message': 'Document not found', 'id': document_id}

        await self.fs.delete(document['file_id'])

        await self.document_collection.delete_one({"_id": ObjectId(document_id)})

        logger.info(f"Document with id {document_id} successfully deleted")
        return {"status_code": 200, "message": "Document successfully deleted", 'id': document_id}