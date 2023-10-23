from pymongo import MongoClient as _MongoClient
import redis as _redis

_mongoClient = _MongoClient(host="mongo", port=27017)
_database = _mongoClient.get_database("backend")
proprietors_collection = _database.get_collection("proprietors")
points_collection = _database.get_collection("points")
comments_collection = _database.get_collection("comments")

redis_database = _redis.Redis(host="redis", port=6379, decode_responses=True)
