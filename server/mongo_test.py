from pymongo import MongoClient
import pymongo
import certifi
from uuid import uuid4

client = pymongo.MongoClient("mongodb+srv://admin:ethansq@tripfulcluster.govpqrv.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())

db = client["tripful"]
collection = db["trips"]

post = {"name": "ethan", "score": 10}

collection.insert_one(post)
