import json
import requests

import pprint

filename = 'hipchat.json'

config = None

with open(filename) as f:
    config = json.load(f)

def payload_day(year, month, day):
    iso_8601 = '%4d%02d%02dT000000+0900'
    return {
        'end-date': iso_8601 % (year, month, day),
        'date': iso_8601 % (year, month, day+1),
    }

url = 'https://api.hipchat.com/v2/user/%s/history' % config['user']
payload = {
    'auth_token': config['token'],
}

payload.update(payload_day(2016, 1, 20))
pprint.pprint(payload)

response = requests.get(url, params=payload)
history = response.json()

pprint.pprint(history)

for item in history['items']:
    print item['message'].encode('utf-8')
