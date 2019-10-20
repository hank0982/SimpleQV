from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import os
from sys import exit
import requests
import json
from server import app, db
import json.decoder
import uuid
from pprint import pprint
import random


@app.route('/')
def root():
	return app.send_static_file('index.html')


@app.route('/submit', methods=['POST'])
def submit():
	print(request.json)
	insert_data = {
		"form": "qv598"
	}
	db.test.insert_one(insert_data)
	return jsonify({'ok': True}), 200

@app.route('/qv/<string:file_name>')
def show_subpath(file_name):
    file_name = '/'.join(['data', file_name])
    filename = os.path.join(app.static_folder, file_name+'.json')
    # data is a json file
    data = json.load(open(filename))
    return jsonify(data)

