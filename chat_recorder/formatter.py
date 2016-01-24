import json


class JsonFormatter(object):
    def format(self, items):
        return json.dumps(items)

    @property
    def mimetype(self):
        return "application/json"


class TextFormatter(object):
    def format(self, items):
        content = ""

        for item in items:
            content += "%s\t%s\t%s\n" % (item['date'], item['from']['name'], item['message'])

        return content


    @property
    def mimetype(self):
        return "text/plain"
