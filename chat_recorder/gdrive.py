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
from apiclient.http import MediaFileUpload,MediaIoBaseUpload

from pymongo import MongoClient

from mongodb import list_messages
from formatter import JsonFormatter, TextFormatter


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

    return credentials

def get_service():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())

    return discovery.build('drive', 'v2', http=http)


def list_files():
    """Shows basic usage of the Google Drive API.

    Creates a Google Drive API service object and outputs the names and IDs
    for up to 10 files.
    """
    service = get_service()

    results = service.files().list(
        fields="items(id, title)").execute()
    return results.get('items', [])


def get(filename):
    service = get_service()

    items = list_files()

    for item in items:
        if item['title'] == filename:
            return item

    return None


def upload(filename, content, formatter):
    service = get_service()

    media_body = MediaIoBaseUpload(
        io.BytesIO(formatter.format(content).encode()),
        mimetype=formatter.mimetype,
        resumable=True)

    body = {
        'title': filename,
        'description': 'desc',
        'mimeType': formatter.mimetype,
        'parents': [{'id': '0Bz1eru8bNBfGd2d5UWlXMzFNTGM'}], # tsdn
    }

    file = get(filename)

    result = service.files().update(
        fileId=file['id'],
        body=body,
        media_body=media_body
        ).execute()


def main():
    items = list_messages()

    upload('hipchat.json', items, JsonFormatter())
    upload('hipchat.txt', items, TextFormatter())


if __name__ == '__main__':
    main()
