install
========

```bash
$ virtualenv env/gapi --python=/usr/bin/python3
$ source env/gapi/bin/activate
$ pip install --upgrade google-api-python-client requests pymongo
$ sudo apt-get install mongodb
```

configuration
=============

for hipchat api
---------------

hipchat.jsonに下記の内容を記載する

```json
{
    "user": "<id or email>",
    "token": "<api token>"
}
```

for google drive api
--------------------

client_secret.jsonを置く

run
========

hipchat -> mongodb -> google drive
```bash
$ python dailiy.py
```
