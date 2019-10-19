"""server api setup"""
import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask
import pymongo
from dotenv import load_dotenv
from flask_cors import CORS


class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class'''

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


# create the flask object
app = Flask(__name__, static_folder="public", static_url_path='')
CORS(app)
load_dotenv()

if os.getenv("mongo_url"):
	mongo_url = os.getenv("mongo_url")
	client = pymongo.MongoClient(mongo_url)
	db = client.test
else:
    print("Database located... looking for local mongodb")
    exit()

# use the modified encoder class to handle ObjectId & datetime object while jsonifying the response.
app.json_encoder = JSONEncoder

from server import routes



# if not os.environ.get("DB"):
# 	config = ConfigParser()
# 	config.read('setting.ini')
# 	app.config['MONGO_URI'] = config['DEFAULT']['DB']
# else:
# 	app.config['MONGO_URI'] = os.environ.get("DB")

# mongo = PyMongo(app)

# load_dotenv()

# if os.getenv("Azure_endpoint"):
#         endpoint = os.getenv("Azure_endpoint")
#         key = os.getenv("Azure_key")
# else:
#     print("no search config avaliable")
#     exit()

# utils function
# def get_bing_result(query, count):
# 	headers = {"Ocp-Apim-Subscription-Key": key}
# 	params = {"q": query, "textDecorations": True, "textFormat": "HTML", "responseFilter":"Webpages", "count": count}
# 	response = requests.get(endpoint, headers=headers, params=params)
# 	response.raise_for_status()
# 	search_results = response.json()
# 	return search_results
