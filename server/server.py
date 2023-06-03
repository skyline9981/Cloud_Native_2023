#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from flask_cors import CORS
import os
import dotenv

from sqlalchemy import create_engine, Column, String, Integer, text
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

dotenv.load_dotenv()

# Initializing flask app
app = Flask(__name__)

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')
DB_PORT = os.getenv('DB_PORT')
CORS(app)
engine:Engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@127.0.0.1:{DB_PORT}/{DB_NAME}")

# Define the SQLAlchemy base class
Base = declarative_base()

# Define the table class for your data
class CurDriveData(Base):
    __tablename__ = 'cus_drive_data'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    type = Column(String)
    time = Column(String)
    origin_address = Column(String)
    origin_latitude = Column(String)
    origin_longitude = Column(String)
    destination_address = Column(String)
    destination_latitude = Column(String)
    destination_longitude = Column(String)
    waypoints_address = Column(String)
    waypoints_address_latitude = Column(String)
    waypoints_address_longitude = Column(String) 

# Create the table if it doesn't exist
Base.metadata.create_all(engine)

# Create a session to interact with the database
Session = sessionmaker(bind=engine)

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
        print("aaa")
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

    elif request.method == "POST":
        print("enter user destination point")
        req = request.get_json()

        hard_code = {
            "type": "customer",
            "waypoints_address" : '',
            "waypoints_address_latitude" : '',
            "waypoints_address_longitude" : '',
        }
        
        data = {**req, **hard_code}
        
        with Session() as session:
            new_record = CurDriveData(**data)
            session.add(new_record)
            session.commit()
        
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
    app.run(host="0.0.0.0", debug = True)
