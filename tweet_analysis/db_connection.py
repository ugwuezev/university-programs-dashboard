# Database connection module

from pymongo import MongoClient

def DatabaseConnection():
    MONGO_URI = "mongodb+srv://mongo:genius@cluster0.4poj9.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(MONGO_URI)
    return client
