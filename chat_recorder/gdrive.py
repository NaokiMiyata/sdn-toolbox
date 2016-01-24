# -*- coding: utf_8 -*-  

from __future__ import print_function
import httplib2
import os
import io
import json

from apiclient import discovery
import oauth2client
from oauth2client import client
from oauth2client import tools

from pymongo import MongoClient

from apiclient.http import MediaFileUpload,MediaIoBaseUpload

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.apps.readonly',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
]
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Drive API Python Quickstart'


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'drive-python-quickstart.json')

    store = oauth2client.file.Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

def get_service():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())

    return discovery.build('drive', 'v2', http=http)


def list():
    """Shows basic usage of the Google Drive API.

    Creates a Google Drive API service object and outputs the names and IDs
    for up to 10 files.
    """
    results = service.files().list(
        fields="items(id, title)").execute()
    items = results.get('items', [])
    if not items:
        print('No files found.')
    else:
        print('Files:')
        for item in items:
            print('{0} ({1})'.format(item['title'].encode('utf-8'), item['id']))


def upload(filename, content):
    service = get_service()

    media_body = MediaIoBaseUpload(
        io.BytesIO(content.encode()),
        mimetype='text/plain',
        resumable=True)

    body = {
        'title': filename,
        'description': 'desc',
        'mimeType': 'application/json',
        'parents': [{'id': '0Bz1eru8bNBfGd2d5UWlXMzFNTGM'}], # tsdn
    }

    result = service.files().insert(
        body=body,
        media_body=media_body
        ).execute()

    print(result)

def main():
    client = MongoClient()
    db = client.hipchat_database
    collection = db.hipchat_collection

    items = []
    for doc in collection.find({}).sort('date', 1):
        items.append(doc)

    from bson.json_util import dumps

    dumps(items)

    upload('test.txt', dumps(items))


if __name__ == '__main__':
    main()
