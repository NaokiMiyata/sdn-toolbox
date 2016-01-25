import logging.config

logging.config.fileConfig('logging.conf')

logger = logging.getLogger(__name__)

import json
from datetime import timedelta,datetime,tzinfo,timezone

from hipchat import get_day_messages
from mongodb import save_messages, list_messages
from gdrive import upload
from formatter import JsonFormatter, TextFormatter 

CONFFILE = 'hipchat.json'


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



def read_config(filename):
    logger.debug('open config file: %s', filename)
    with open(filename) as f:
        return json.load(f)

def main():
    config = read_config(CONFFILE)

    messages = get_day_messages(config['user'], config['token'], yesterday())

    save_messages(messages)

    items = list_messages()

    upload('hipchat.json', items, JsonFormatter())
    upload('hipchat.txt', items, TextFormatter())


if __name__ == '__main__':
    main()

