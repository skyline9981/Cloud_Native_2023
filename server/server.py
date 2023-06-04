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


name = "no data"
time = "no data"
origin_address = "no data"
origin_latitude = "no data"
origin_longitude = "no data"
destination_address = "no data"
destination_latitude = "no data" 
destination_longitude = "no data"
waypoints_address = "no data"
waypoints_address_latitude = "no data"
waypoints_address_longitude = "no data"

def get_current_customer_id():
    li = []
    sql_cmd = """
    select id,type 
    from cus_drive_data
    """
    conn = engine.connect()
    query_data = conn.execute(text(sql_cmd)).fetchall()
    for row in query_data:
        if(row[1] == "customer"):
            li.append(row[0])
    return li[-1]

def get_current_driver_id():
    li = []
    sql_cmd = """
    select id,type 
    from cus_drive_data
    """
    conn = engine.connect()
    query_data = conn.execute(text(sql_cmd)).fetchall()
    for row in query_data:
        if(row[1] == "driver"):
            li.append(row[0])
    return li[-1]

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


@app.route('/passenger', methods=["GET","POST"])
def get_passenger_data():
    global name, time, origin_address, origin_latitude, origin_longitude, destination_address, destination_latitude, destination_longitude
    if request.method == "GET":
        
        customer_id = get_current_customer_id()
        sql_cmd = f"""
        select * from cus_drive_data where id={customer_id}
        """
        conn = engine.connect()
        query_data = conn.execute(text(sql_cmd)).fetchall()
        
        
        return jsonify({'role': "passenger",
                        'name': query_data[0][1],
                        'time': query_data[0][3],                        
                        'origin_address': query_data[0][4],
                        'origin_latitude': query_data[0][5],
                        'origin_longitude': query_data[0][6],
                        'destination_address': query_data[0][7],
                        'destination_latitude': query_data[0][8],
                        'destination_longitude': query_data[0][9],
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
        
        return jsonify({'role': "passenger",
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

@app.route('/driver', methods=["GET","POST"])
def get_driver_data():
    global name, time, origin_address, origin_latitude, origin_longitude, destination_address, destination_latitude, destination_longitude
    if request.method == "GET":
        driver_id = get_current_driver_id()
        sql_cmd = f"""
        select * from cus_drive_data where id={driver_id}
        """
        conn = engine.connect()
        query_data = conn.execute(text(sql_cmd)).fetchall()
        
        return jsonify({'role': "driver",
                        'name': query_data[0][1],
                        'time': query_data[0][3],                        
                        'origin_address': query_data[0][4],
                        'origin_latitude': query_data[0][5],
                        'origin_longitude': query_data[0][6],
                        'destination_address': query_data[0][7],
                        'destination_latitude': query_data[0][8],
                        'destination_longitude': query_data[0][9],
                        'waypoints_address': query_data[0][10],
                        'waypoints_address_latitude':query_data[0][11],
                        'waypoints_address_longitude':query_data[0][12]})
    
    elif request.method == "POST":
        print("enter driver way point")
        req = request.get_json()

        hard_code = {
            "type": "driver",
        }
        
        data = {**req, **hard_code}
        
        with Session() as session:
            new_record = CurDriveData(**data)
            session.add(new_record)
            session.commit()
        
        return jsonify({'role': "Driver",
                        'name': name,
                        'time': time,                        
                        'origin_address': origin_address,
                        'origin_latitude': origin_latitude,
                        'origin_longitude': origin_longitude,
                        'destination_address': destination_address,
                        'destination_latitude': destination_latitude,
                        'destination_longitude': destination_longitude,
                        'waypoints_address': waypoints_address,
                        'waypoints_address_latitude':waypoints_address_latitude,
                        'waypoints_address_longitude':waypoints_address_longitude})


# Running app
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug = True)
