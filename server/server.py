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

current_state1 = "true"
current_state = "not started"
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
    app.run(host="0.0.0.0", debug = True)
