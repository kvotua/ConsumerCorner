from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from pydantic import BaseModel
from typing import Optional

class MongoDBClient:
    def __init__(self, uri: str, database_name: str, collection_name: str):
        self.client = AsyncIOMotorClient(uri)
        self.db = self.client[database_name]
        self.collection = self.db[collection_name]

    async def get_photo_by_id(self, photo_id: str) -> Optional[dict]:
        if not ObjectId.is_valid(photo_id):
            return None
        photo_object = await self.collection.find_one({"_id": ObjectId(photo_id)})
        if photo_object:
            photo_object["id"] = str(photo_object["_id"])
            del photo_object["_id"]
        return photo_object

class ItemModel(BaseModel):
    id: Optional[str]
    photo: str
