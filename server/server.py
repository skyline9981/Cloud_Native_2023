#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_cors import CORS

# Initializing flask app
app = Flask(__name__)
CORS(app)

current_state = "not started"
start_point = "not enter"
destination_point = "not enter"

@app.route('/', methods=["GET","POST"])
def get_data():
    global current_state
    if request.method == "GET":
        return jsonify({'current_state': current_state})

    elif request.method == "POST":
        print("press button")
        data = request.get_json()
        current_state = data.get('current_state')
        return jsonify({'current_state': current_state})

@app.route('/start_point', methods=["GET","POST"])
def get_position():
    global start_point
    if request.method == "GET":
        return jsonify({'start_point': start_point})

    elif request.method == "POST":
        print("enter start point")
        data = request.get_json()
        start_point = data.get('start_point')
        return jsonify({'start_point': start_point})

@app.route('/destination_point', methods=["GET","POST"])
def get_position2():
    global destination_point
    if request.method == "GET":
        return jsonify({'destination_point': destination_point})

    elif request.method == "POST":
        print("enter destination point")
        data = request.get_json()
        destination_point = data.get('destination_point')
        return jsonify({'destination_point': destination_point})

# Running app
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug = True)
