
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from flask_cors import CORS
import os
import dotenv

from sqlalchemy import create_engine, Column, String, Integer, text
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

dotenv.load_dotenv()

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')
DB_PORT = os.getenv('DB_PORT')
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
session = Session()

# Prepare the data for insertion
data = {
    'name': 'John Doe',
    'time': '2023-06-04',
    "type": "customer",
    'origin_address': '123 Main St',
    'origin_latitude': '123.456',
    'origin_longitude': '789.012',
    'destination_address': '456 Elm St',
    'destination_latitude': '456.789',
    'destination_longitude': '012.345',
    'waypoints_address': '',
    'waypoints_address_latitude': '',
    'waypoints_address_longitude': ''
}

# Create a new record
new_record = CurDriveData(**data)

# Add the new record to the session
session.add(new_record)

# Commit the session to persist the changes
session.commit()

# Close the session
session.close()

# customer_id = 1
# sql_cmd = f"""
# select * from cus_drive_data where id={customer_id}
# """
# print(sql_cmd)

sql_cmd = """
        select * from cus_drive_data where id = 1;
        """
conn = engine.connect()
query_data = conn.execute(text(sql_cmd)).fetchall()

# print(query_data[0][1])