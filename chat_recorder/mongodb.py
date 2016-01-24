import json

from pymongo import MongoClient
from bson.json_util import dumps


def save_messages(messages):
    client = MongoClient()

    db = client.hipchat_database

    collection = db.hipchat_collection

    for item in messages:
        collection.update({'id': item['id']}, item, upsert=True)


def list_messages():
    client = MongoClient()
    db = client.hipchat_database
    collection = db.hipchat_collection

    items = []
    for doc in collection.find({}).sort('date', 1):
        items.append(doc)

    return json.loads(dumps(items))
