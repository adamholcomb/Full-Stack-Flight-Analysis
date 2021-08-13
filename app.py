# Import dependecies
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from flask import Flask
from flask_cors import CORS

########################################################################
# Configure database connection
rds_string = "postgresql://postgres:postgres@localhost:5432/flight_db"
engine = create_engine(rds_string)
conn = engine.connect()

########################################################################
# Configure Flask server
app = Flask(__name__)
CORS(app)

########################################################################
# Build routes
@app.route("/visualization1")
def test1():
    data = pd.read_sql("SELECT * FROM flight", conn)

    # ADD CODE HERE TO FORMAT DATA FOR VISUALIZATION 1
    data = data[['origin_name','dest_home','min_price_usd','origin_gps','dest_gps']]

    return(data.to_json())

@app.route("/visualization2")
def test2():
    data = pd.read_sql("SELECT * FROM flight", conn)


    # ADD CODE HERE TO FORMAT DATA FOR VISUALIZATION 2
    data = data[['origin_name','dest_home','min_price_usd']]

    return(data.to_json())

@app.route("/visualization3")
def test3():
    data = pd.read_sql("SELECT * FROM flight", conn)


    # ADD CODE HERE TO FORMAT DATA FOR VISUALIZATION 3
    data = data[['carrier','min_price_usd']]
    test_df = data[['carrier','min_price_usd']]
    test_df1 = test_df.groupby('carrier').min()

    test_df2 = test_df.groupby('carrier').count()

    carrier_df = pd.merge(test_df1,test_df2,how="inner",on="carrier")
    carrier_df = carrier_df.rename({'min_price_usd_x': 'min_cost', 'min_price_usd_y': 'flight_count'}, axis='columns')
    data = carrier_df
    
    return(data.to_json())

@app.route("/visualization4")
def test4():
    data = pd.read_sql("SELECT DISTINCT(origin_name) FROM flight", conn)


    # ADD CODE HERE TO FORMAT DATA FOR VISUALIZATION 3

    
    return(data.to_json())



if __name__ == "__main__":
    app.run(debug=True)
