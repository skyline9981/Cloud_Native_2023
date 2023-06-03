from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import create_engine,  Engine,text

# Initializing flask app
app = Flask(__name__)

# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://skyline:skyline@127.0.0.1:5432/uber"
CORS(app)
engine:Engine = create_engine("postgresql://skyline:skyline@127.0.0.1:5432/uber")
@app.route('/')
def index():
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
    
    return '<html><body><h1>{}</h1></body></html>'.format(result)
 
 
if __name__ == "__main__":
    app.run()