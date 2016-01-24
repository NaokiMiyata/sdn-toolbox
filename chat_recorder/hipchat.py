import json
import requests
from datetime import timedelta,datetime,tzinfo,timezone
from pymongo import MongoClient

import pprint

CONFFILE = 'hipchat.json'


def read_config(filename):
    with open(filename) as f:
        return json.load(f)


class JST(tzinfo):
  def utcoffset(self, dt):
    return timedelta(hours=9)


  def dst(self, dt): 
    return timedelta(0)


  def tzname(self, dt):
    return 'JST'


def yesterday():
    return today() + timedelta(days=-1)


def today():
    today = datetime.today()
    return datetime(today.year, today.month, today.day, tzinfo=JST())


def duration_params(day):
    return {
        'end-date': day.astimezone().isoformat(),
        'date': (day + timedelta(days=1)).astimezone().isoformat(),
    }


def get_day_messages(user, token, day):
    url = 'https://api.hipchat.com/v2/user/%s/history' % user
    params = {
        'auth_token': token,
        'max-results': 1000,
    }
    params.update(duration_params(day))

    response = requests.get(url, params=params)

    history = response.json()

    return history['items']


def save_messages(messages):
    client = MongoClient()

    db = client.hipchat_database

    collection = db.hipchat_collection

    for item in messages:
        collection.update({'id': item['id']}, item, upsert=True)


def main():
    config = read_config(CONFFILE)

    messages = get_day_messages(config['user'], config['token'], yesterday())

    save_messages(messages)


if __name__ == '__main__':
    main()
