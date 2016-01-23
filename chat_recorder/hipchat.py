import json
import requests
from datetime import timedelta,datetime,tzinfo
from pymongo import MongoClient

import pprint

filename = 'hipchat.json'

config = None

with open(filename) as f:
    config = json.load(f)


def payload_day(d):
    delta = timedelta(days=1)

    return {
        'end-date': d.isoformat() + "+0900",
        'date': (d+delta).isoformat() + "+0900",
    }

class JST(tzinfo):
  def utcoffset(self, dt):
    return timedelta(hours=9)
  def dst(self, dt): 
    return timedelta(0)
  def tzname(self, dt):
    return 'JST'


url = 'https://api.hipchat.com/v2/user/%s/history' % config['user']
payload = {
    'auth_token': config['token'],
    'max-results': 1000,
}

client = MongoClient()
db = client.hipchat_database
collection = db.hipchat_collection

d = datetime(2016, 1, 1, tzinfo=JST())

for i in range(31):
    delta = timedelta(days=i)
    payload.update(payload_day(d + delta))

    response = requests.get(url, params=payload)

    history = response.json()

    print len(history['items'])
    for item in history['items']:
        collection.update({'id': item['id']}, item, upsert=True)
