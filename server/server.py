#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_cors import CORS

# Initializing flask app
app = Flask(__name__)
CORS(app)

current_state1 = "true"
current_state = "not started"
cus_start_point = "no enter"
cus_destination_point = "no enter"
cus_latitude_start = "no enter"
cus_longitude_start = "no enter"
cus_latitude_end = "no enter"
cus_longitude_end = "no enter"
driver_start_point = "not enter"
driver_destination_point = "not enter"
driver_latitude = "no enter"
driver_longitude = "no enter"

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

@app.route('/ttt', methods=["GET"])
def get_data2():
    global current_state1
    if request.method == "GET":
        return jsonify({'current_state1': current_state1})


@app.route('/cus_start_point', methods=["GET","POST"])
def get_position():
    global cus_latitude_start, cus_start_point, cus_longitude_start
    if request.method == "GET":
        return jsonify({'address': cus_start_point,
                        'latitude':cus_latitude_start,
                        'longitude':cus_longitude_start})

    elif request.method == "POST":
        print("enter start point")
        data = request.get_json()
        cus_start_point = data.get('address')
        cus_latitude_start = data.get('latitude')
        cus_longitude_start = data.get('longitude')
        return jsonify({'address': cus_start_point,
                        'latitude':cus_latitude_start,
                        'longitude':cus_longitude_start})

@app.route('/cus_destination_point', methods=["GET","POST"])
def get_position2():
    global cus_destination_point, cus_latitude_end, cus_longitude_end
    if request.method == "GET":
        return jsonify({'address': cus_destination_point,
                        'latitude':cus_latitude_end,
                        'longitude':cus_longitude_end})

    elif request.method == "POST":
        print("enter destination point")
        data = request.get_json()
        cus_destination_point = data.get('address')
        cus_latitude_end = data.get('latitude')
        cus_longitude_end = data.get('longitude')
        return jsonify({'address': cus_destination_point,
                        'latitude':cus_latitude_end,
                        'longitude':cus_longitude_end})

@app.route('/driver_start_point', methods=["GET","POST"])
def get_position3():
    global driver_start_point
    if request.method == "GET":
        return jsonify({'address': driver_start_point})

    elif request.method == "POST":
        print("enter start point")
        data = request.get_json()
        start_point = data.get('address')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        return jsonify({'address': start_point,
                        'latitude':latitude,
                        'longitude':longitude})

@app.route('/driver_destination_point', methods=["GET","POST"])
def get_position4():
    global driver_destination_point
    if request.method == "GET":
        return jsonify({'address': driver_destination_point})

    elif request.method == "POST":
        print("enter destination point")
        data = request.get_json()
        destination_point = data.get('address')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        return jsonify({'address': destination_point,
                        'latitude':latitude,
                        'longitude':longitude})

# Running app
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug = True)