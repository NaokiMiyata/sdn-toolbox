import json
import requests

filename = 'hipchat.json'

config = None

with open(filename) as f:
    config = json.load(f)

url = 'https://api.hipchat.com/v2/user/%s/history' % config['user']
payload = {
    'auth_token': config['token']
}

response = requests.get(url, params=payload)
history = response.json()



