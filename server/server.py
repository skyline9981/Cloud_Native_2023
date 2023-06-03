#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Engine, text
from flask_cors import CORS
import os
import dotenv

dotenv.load_dotenv()

# Initializing flask app
app = Flask(__name__)

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')
DB_PORT = os.getenv('DB_PORT')
CORS(app)
engine:Engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@127.0.0.1:{DB_PORT}/{DB_NAME}")

cus_start_point = "no enter"
cus_destination_point = "no enter"
cus_latitude_start = "no enter"
cus_longitude_start = "no enter"
cus_latitude_end = "no enter"
cus_longitude_end = "no enter"
driver_start_point = "no enter"
driver_destination_point = "no enter"
driver_way_point = "no enter"
driver_latitude_start = "no enter"
driver_longitude_start = "no enter"
driver_latitude_end = "no enter"
driver_longitude_end = "no enter"
driver_latitude_way = "no enter"
driver_longitude_way = "no enter"

name = ""
time = ""
origin_address = ""
origin_latitude = ""
origin_longitude = ""
destination_address = ""
destination_latitude = "" 
destination_longitude = ""

@app.route('/', methods=["GET","POST"])
def get_data():
    global current_state
    if request.method == "GET":
        sql_cmd = """
        select name
        from cus_drive_data
        """
        conn = engine.connect()
        query_data = conn.execute(text(sql_cmd)).fetchall()
        
        result = ""
        for row in query_data:
            print(row)
            result += row[0] + ' '
            
        return jsonify({'current_state': result})

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
    global name, time, origin_address, origin_latitude, origin_longitude, destination_address, destination_latitude, destination_longitude
    if request.method == "GET":
        return jsonify({'no data': "no data"})

    elif request.method == "POST":
        print("enter destination point")
        data = request.get_json()
        name = data.get('name')
        time = data.get('time')
        origin_address = data.get('origin_address')
        origin_latitude = data.get('origin_latitude')
        origin_longitude = data.get('origin_longitude')
        destination_address = data.get('destination_address')
        destination_latitude = data.get('destination_latitude')
        destination_longitude = data.get('destination_longitude')
        return jsonify({'role': "User",
                        'name': name,
                        'time': time,                        
                        'origin_address': origin_address,
                        'origin_latitude': origin_latitude,
                        'origin_longitude': origin_longitude,
                        'destination_address': destination_address,
                        'destination_latitude': destination_latitude,
                        'destination_longitude': destination_longitude,
                        'waypoints_address': "",
                        'waypoints_address_latitude':"",
                        'waypoints_address_longitude':""})

@app.route('/driver_start_point', methods=["GET","POST"])
def get_position3():
    global driver_start_point, driver_latitude_start, driver_longitude_start
    if request.method == "GET":
        return jsonify({'address': driver_start_point})

    elif request.method == "POST":
        print("enter start point")
        data = request.get_json()
        driver_start_point = data.get('address')
        driver_latitude_start = data.get('latitude')
        driver_longitude_start = data.get('longitude')
        return jsonify({'address': driver_start_point,
                        'latitude':driver_latitude_start,
                        'longitude':driver_longitude_start})

@app.route('/driver_destination_point', methods=["GET","POST"])
def get_position4():
    global driver_destination_point, driver_latitude_end, driver_longitude_end
    if request.method == "GET":
        return jsonify({'address': driver_destination_point})

    elif request.method == "POST":
        print("enter destination point")
        data = request.get_json()
        driver_destination_point = data.get('address')
        driver_latitude_end = data.get('latitude')
        driver_longitude_end = data.get('longitude')
        return jsonify({'address': driver_destination_point,
                        'latitude':driver_latitude_end,
                        'longitude':driver_longitude_end})

@app.route('/driver_way_point', methods=["GET","POST"])
def get_position5():
    global driver_way_point, driver_latitude_way, driver_longitude_way
    if request.method == "GET":
        return jsonify({'address': driver_way_point})

    elif request.method == "POST":
        print("enter way point")
        data = request.get_json()
        driver_way_point = data.get('address')
        driver_latitude_way = data.get('latitude')
        driver_longitude_way = data.get('longitude')
        return jsonify({'address': driver_way_point,
                        'latitude':driver_latitude_way,
                        'longitude':driver_longitude_way})

# Running app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9000, debug = True)
