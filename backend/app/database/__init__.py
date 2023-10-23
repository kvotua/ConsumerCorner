from pymongo import MongoClient

_mongoClient = MongoClient(host="database", port=27017)
_database = _mongoClient.get_database("backend")
proprietors_collection = _database.get_collection("proprietors")
points_collection = _database.get_collection("points")
