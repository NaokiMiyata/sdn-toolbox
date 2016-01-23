install
========

```bash
$ virtualenv env/gapi
$ source env/gapi/bin/activate
$ pip install --upgrade google-api-python-client requests pymongo
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

```bash
$ python hipchat.py
$ python sample.py  --noauth_local_webserver
```
