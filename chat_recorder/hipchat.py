import json
import requests
import logging
import logging.config

from datetime import timedelta,datetime,tzinfo,timezone

from mongodb import save_messages

logger = logging.getLogger(__name__)


def duration_params(day):
    return {
        'end-date': day.astimezone().isoformat(),
        'date': (day + timedelta(days=1)).astimezone().isoformat(),
    }


def get_day_messages(user, token, day):
    url = 'https://api.hipchat.com/v2/user/%s/history' % user
    logger.debug('url: %s', url)

    params = {
        'auth_token': token,
        'max-results': 1000,
    }
    params.update(duration_params(day))
    logger.debug('params: %s', params)

    response = requests.get(url, params=params)

    history = response.json()
    logger.debug('history size: %d', len(history))

    return history['items']
