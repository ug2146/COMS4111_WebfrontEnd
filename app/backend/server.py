import os
from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask_cors import CORS, cross_origin
from flask import Flask, request, render_template, g, redirect, Response, jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime
from uuid import uuid4
import logging


tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app = Flask(__name__, template_folder=tmpl_dir)
app.config["JWT_SECRET_KEY"] = "darklordrules"
jwt = JWTManager(app)

DATABASEURI = "postgresql://ug2146:9466@34.75.94.195/proj1part2"

#
# This line creates a database engine that knows how to connect to the URI above.
#
engine = create_engine(DATABASEURI)

############
# @app.route('/api/dishes/top', methods=['GET'])
# @cross_origin()
# def top_dishes():
#   #todo add restaurant id here
#   cursor = g.conn.execute("SELECT D.dish_category"  
#   " FROM Adds A NATURAL JOIN Dishes D"
#   " GROUP BY D.dish_category"
#   " ORDER BY COUNT(*) DESC"
#   " LIMIT 5")
#   names = []
#   for result in cursor:
#     names.append(result['dish_category'])
#   cursor.close()
#   print(names)
#   return jsonify(names)
############



@app.before_request
def before_request():
  """
  This function is run at the beginning of every web request
  (every time you enter an address in the web browser).
  The variable g is globally accessible.
  """
  try:
    g.conn = engine.connect()
  except:
    print("uh oh, problem connecting to database")
    import traceback; traceback.print_exc()
    g.conn = None

@app.teardown_request
def teardown_request(exception):
  """
  At the end of the web request, this makes sure to close the database connection.
  If you don't, the database could run out of memory!
  """
  try:
    g.conn.close()
  except Exception as e:
    pass

#@jwt_required()
####### Customer Sign up ###########
@app.route('/api/auth/signup/customer', methods=['POST'])
@cross_origin()
def signup_customer():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
  phoneno = request.json.get('phoneno', None)
  name = request.json.get('name', None)
  print("email: ", email)
  print("password: ", password)
  print("phoneno: ", phoneno)
  print("name: ", name)
  #todo add staff and customer auth
  g.conn.execute("INSERT INTO Customers (email_id, username, user_password, mobile_no) VALUES (%s, %s, %s, %s)", email, name, password, phoneno)
  return jsonify({"msg": "Customer created successfully"}), 200

####### Staff Sign up ###########
@app.route('/api/auth/signup/staff', methods=['POST'])
@cross_origin()
def signup_staff():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
  staffid = request.json.get('staffid', None)
  name = request.json.get('name', None)
  print("email: ", email)
  print("password: ", password)
  print("phoneno: ", staffid)
  print("name: ", name)
  #todo add staff and customer auth
  g.conn.execute("INSERT INTO Customers (email_id, username, user_password, staff_id) VALUES (%s, %s, %s, %s)", email, name, password, staffid)
  return jsonify({"msg": "Staff created successfully"}), 200

@app.route('/api/auth/login', methods=['POST'])
@cross_origin()
def login():
  email = request.json.get("email", None)
  password = request.json.get("password", None)
  cmd = "SELECT COUNT(*) FROM Users WHERE EmailId = \"" + email + "\""
  cursor = g.conn.execute(cmd)
  user = cursor.fetchone()[0]
  if user == 0:
    return jsonify({"msg": "User not registered"}), 401
  
  cmd = "SELECT COUNT(*) FROM Users WHERE EmailId = \"" + email + "\" AND Password = \"" + password + "\""
  cursor = g.conn.execute(cmd)
  user = cursor.fetchone()[0]
  if user == 0:
    return jsonify({"msg": "Wrong password"}), 401

  access_token = create_access_token(identity=email)
  response = {"access_token":access_token}
  return response


@app.route('/api/auth/logout', methods=['POST'])
@cross_origin()
def logout():
  response = jsonify({"msg": "logout successful"})
  unset_jwt_cookies(response)
  return response

@app.route('/api/restaurants/top', methods=['GET'])
@cross_origin()
def top_restaurants():
  #todo add restaurant id here
  cursor = g.conn.execute("SELECT RestaurantName"  
  " FROM Restaurants r"
  " WHERE r.LicenseNo IN ("
      "(SELECT rr.LicenseNo"
      " FROM RestaurantReview rr NATURAL JOIN Restaurants"
      " GROUP BY rr.LicenseNo"
      " HAVING AVG((Ambience + Crowd + Service) / 3) > 4)"
      " UNION"
      " (SELECT v.LicenseNo"
      " FROM Views v"
      " WHERE Favorite = 1"
      " GROUP BY v.LicenseNo"
      " HAVING COUNT(*) > 110))"
      )
  names = []
  for result in cursor:
    names.append(result['RestaurantName'])
  cursor.close()
  return jsonify(names)

@app.route('/api/users/top', methods=['GET'])
@cross_origin()
def top_users():
  cursor = g.conn.execute("SELECT DISTINCT Name"
    " FROM Users"
    " WHERE EmailId IN ("
      " SELECT EmailId"
      " FROM RestaurantReview"
      " GROUP BY EmailId"
      " HAVING COUNT(*) >= 2"
      " UNION"
      " SELECT EmailId"
      " FROM DishReview"
      " GROUP BY EmailId"
      " HAVING COUNT(*) >= 2"
      ")"
      )
  names = []
  for result in cursor:
    names.append(result['Name'])
  cursor.close()
  return jsonify(names)

@app.route('/api/users/reviews/<email>', methods=['GET'])
@cross_origin()
def user_reviews(email):
  cursor = g.conn.execute("SELECT ReviewId, RestaurantName, WrittenReview"
    " FROM Restaurants NATURAL JOIN RestaurantReview"
    " WHERE RestaurantReview.EmailId = \"" + email + "\""
      )
  names = []
  for result in cursor:
    names.append({"reviewId": result['ReviewId'], "restaurantName": result['RestaurantName'], "writtenReview": result['WrittenReview']})
  cursor.close()
  return jsonify(names)

@app.route('/api/restaurants/search/<searchKey>', methods=['GET'])
@cross_origin()
def search(searchKey):
  print(searchKey)
  names = []
  # search by restaurant or dish
  # SELECT RestaurantName FROM Restaurants WHERE RestaurantName LIKE "%Thai%";
  cmd = ""
  if searchKey == "0" or searchKey is None:
    cmd = "SELECT RestaurantName FROM Restaurants"
  else:
    cmd = "SELECT RestaurantName FROM Restaurants WHERE RestaurantName LIKE \"%%" + searchKey + "%%\""
  print(cmd)
  cursor = g.conn.execute(cmd)
  print(cursor)
  for result in cursor:
    print(result)
    names.append(result['RestaurantName'])
  cursor.close()
  print(names)
  return jsonify(names)

@app.route('/api/reviews/add', methods=['POST'])
@cross_origin()
def addReview():
  # search by restaurant or dish
  # SELECT RestaurantName FROM Restaurants WHERE RestaurantName LIKE "%Thai%";
  email = request.json.get("email", None)
  restaurant = request.json.get("restaurant", None)
  review = request.json.get("review", None)
  reviewId = str(uuid4())[:20]
  cmd = "SELECT LicenseNo FROM Restaurants WHERE RestaurantName = \"" + restaurant + "\""
  cursor = g.conn.execute(cmd)
  licenseNo = cursor.fetchone()[0]
  cmd = f"INSERT INTO RestaurantReview (ReviewId, LicenseNo, EmailId, WrittenReview) VALUES ('{reviewId}', '{licenseNo}', '{email}', '{review}')"
  cursor = g.conn.execute(cmd)
  return jsonify("Added successfully")

@app.route('/api/reviews/delete', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def deleteReview():
  reviewId = request.json.get("reviewId", None)
  app.logger.info(reviewId)
  cmd = f"DELETE FROM RestaurantReview WHERE ReviewId = '{reviewId}'"
  cursor = g.conn.execute(cmd)
  return jsonify("Deleted successfully")

@app.route('/api/reviews/edit', methods=['PUT'])
@cross_origin()
def editReview():
  # search by restaurant or dish
  # SELECT RestaurantName FROM Restaurants WHERE RestaurantName LIKE "%Thai%";
  reviewId = request.json.get("reviewId", None)
  app.logger.info(reviewId)
  print('reviewId', reviewId)
  writtenReview = request.json.get("writtenReview", None)
  cmd = "UPDATE RestaurantReview SET WrittenReview = \""+ writtenReview + "\" WHERE ReviewId = \"" + reviewId+ "\""
  cursor = g.conn.execute(cmd)
  return jsonify("Edited successfully")

if __name__ == "__main__":
  import click

  @click.command()
  @click.option('--debug', is_flag=True)
  @click.option('--threaded', is_flag=True)
  @click.argument('HOST', default='0.0.0.0')
  @click.argument('PORT', default=8111, type=int)
  def run(debug, threaded, host, port):
    HOST, PORT = host, port
    print("running on %s:%d" % (HOST, PORT))
    app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)

  run()
