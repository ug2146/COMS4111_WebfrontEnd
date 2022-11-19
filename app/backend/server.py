import os
from sqlalchemy import *
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.pool import NullPool
from flask_cors import CORS, cross_origin
from flask import Flask, request, render_template, g, redirect, Response, jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime
import uuid
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

@app.route('/', methods=['GET'])
@cross_origin()
def basic():
  restaurant_name = "a"
  cursor = g.conn.execute("SELECT license_no, restaurant_name from Restaurants_Fetches NATURAL JOIN Manages")

  names = []
  for result in cursor:
    names.append({"license_no" : result['license_no'], "restaurant_name" : result['restaurant_name']})
  cursor.close()
  return jsonify(names)

####### Customer Sign up ###########
@app.route('/api/auth/signup/customer', methods=['POST'])
@cross_origin()
def signup_customer():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
  phoneno = request.json.get('phoneno', None)
  name = request.json.get('name', None)
  cmd = f"INSERT INTO Customers(email_id, username, user_password, mobile_no) VALUES \
              ('{email}', '{name}', '{password}', '{phoneno}')"
  errflag = 0
  try:
    cursor = g.conn.execute(cmd)
  except Exception as err:
    print("###### " + str(err.orig) + " for parameters" + str(err.params))
    errflag = 1
  
  if not errflag:
    return jsonify({"msg": "Customer created successfully"}), 200
  else:
    return jsonify({"msg": "Invalid entries"}), 200

####### Staff Sign up ###########
@app.route('/api/auth/signup/staff', methods=['POST'])
@cross_origin()
def signup_staff():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
  staffid = request.json.get('staffid', None)
  name = request.json.get('name', None)
  cmd = f"INSERT INTO Staff(email_id, username, user_password, staff_id) VALUES \
          ('{email}', '{name}', '{password}', '{staffid}')"
  errflag = 0
  try:
    cursor = g.conn.execute(cmd)
  except Exception as err:
    print("###### " + str(err.orig) + " for parameters" + str(err.params))
    errflag = 1
  
  if not errflag:
    return jsonify({"msg": "Staff created successfully"}), 200
  else:
    return jsonify({"msg": "Invalid entries"}), 200
  

@app.route('/api/auth/login', methods=['POST'])
@cross_origin()
def login():
  print("lgn")
  email = request.json.get("email", None)
  password = request.json.get("password", None)
  tick = request.json.get("tick", None)
  print(tick)
  if tick != False:
    print("check true")
    cmd = "SELECT COUNT(*) FROM Staff S WHERE S.email_id = \'" + email + "\'"
  else:
    print("falserr")
    cmd = "SELECT COUNT(*) FROM Customers C WHERE C.email_id = \'" + email + "\'"
  
  cursor = g.conn.execute(cmd)
  user = cursor.fetchone()[0]
  if user == 0:
    return jsonify({"access_token":""}), 200
  
  if tick != False:
    print("checking staff")
    cmd = "SELECT COUNT(*) FROM Staff S WHERE S.email_id = \'" + email + "\' AND S.user_password = \'" + password + "\'"
  else:
    cmd = "SELECT COUNT(*) FROM Customers C WHERE C.email_id = \'" + email + "\' AND C.user_password = \'" + password + "\'"
  
  cursor = g.conn.execute(cmd)
  user = cursor.fetchone()[0]
  
  if user == 0:
    return jsonify({"access_token":""}), 200

  access_token = create_access_token(identity=email)
  response = {"access_token":access_token}
  return response


@app.route('/api/auth/logout', methods=['POST'])
@cross_origin()
def logout():
  response = jsonify({"msg": "logout successful"})
  unset_jwt_cookies(response)
  return response

@app.route('/api/restaurant/dishes', methods= ['GET'])
@cross_origin()
def get_dishes():
  license_no = request.args.get('licenseNo')
  #print(restaurant_name)
  cursor = g.conn.execute("SELECT dish_name, dish_category, price from Restaurants_Fetches NATURAL JOIN Adds NATURAL JOIN Dishes" 
  " WHERE license_no = \'" + license_no + "\'")
  names = []
  for result in cursor:
    names.append({"dish_name" : result['dish_name'], "dish_category" : result['dish_category'], "price": result['price']})
  cursor.close()
  return jsonify(names)

@app.route('/api/restaurant/addDish', methods= ['POST'])
@cross_origin()
def add_dish():
  licenseNo = request.json.get("licenseNo", None)
  dish_name = request.json.get("dish_name", None)
  dish_category = request.json.get("dish_category", None)
  price = request.json.get('price', None)
  id = str(uuid.uuid1())[:19]
  print(id)
  g.conn.execute("INSERT INTO Dishes (dish_id, dish_name, dish_category, price) VALUES (%s, %s, %s, %s)", id, dish_name, dish_category, float(price))
  g.conn.execute("INSERT INTO Adds (dish_id,license_no) VALUES (%s, %s)", id, licenseNo)
  return jsonify({"msg": "Dish added successfully"}), 200

@app.route('/api/restaurants/top', methods=['GET'])
@cross_origin()
def top_restaurants():
  #todo add restaurant id here
  cursor = g.conn.execute("SELECT rf.license_no, rf.restaurant_name, round(AVG((ra.ambience + ra.crowd + ra.customer_service + ra.value_for_money + ra.taste + ra.cooked)/6.0), 2) AS Average_Rating"  
  " FROM Restaurants_Fetches rf, rates r, ratings ra"
  " WHERE rf.license_no = r.license_no"
      " AND r.rating_id = ra.rating_id"
      " GROUP BY rf.license_no, rf.restaurant_name"
      " HAVING (AVG((ra.ambience + ra.crowd + ra.customer_service + ra.value_for_money + ra.taste + ra.cooked)/6.0) >= 4)"
      " ORDER BY Average_Rating DESC"
      )
  names = []
  for result in cursor:
    print(result['license_no'])
    print(result[0])
    print(result['restaurant_name'])
    names.append({"restaurantName" : result['restaurant_name'], "avg_rating" : str(result[2]), "license_no": result['license_no']})
  cursor.close()
  return jsonify(names)

@app.route('/api/staff/restaurants/<email>', methods=['GET'])
@cross_origin()
def staff_restaurants(email):
  #todo add restaurant id here
  
  cursor = g.conn.execute("Select rf.restaurant_name, license_no from Restaurants_Fetches rf NATURAL JOIN Manages"
      " WHERE Manages.email_id = \'" + email + "\'"
      )
      # Select rf.restaurant_name from Restaurants_Fetches rf NATURAL JOIN Manages
  names = []
  for result in cursor:
    names.append({"restaurantName" : result['restaurant_name'], "license_no": result['license_no']})
  cursor.close()
  return jsonify(names)

def getArea(zipcode):
  cursor = g.conn.execute("SELECT area FROM locations Where zipcode = \'" + zipcode + "\'")
  area = cursor.fetchone()[0]
  return area

@app.route('/api/staff/addRestaurant', methods=['POST'])
@cross_origin()
def addRestaurants():
  licenseNo = request.json.get("licenseNo", None)
  restaurant_name = request.json.get("restaurant_name", None)
  customer_service_no = request.json.get("customer_service_no", None)
  street_address = request.json.get("street_address", None)
  Zipcode = int(request.json.get('zipcode', None))

  email = request.json.get('email', None)
  area = getArea(str(Zipcode))
  
  g.conn.execute("INSERT INTO Restaurants_Fetches (license_no, restaurant_name, customer_service_no, street_address,zipcode,area) VALUES (%s, %s, %s, %s, %s, %s)", licenseNo, restaurant_name, customer_service_no, street_address, str(Zipcode), area)
  g.conn.execute("INSERT INTO Manages (license_no, email_id) VALUES (%s, %s)", licenseNo, email)

  #user = cursor.fetchone()[0]
  return jsonify({"msg": "Customer created successfully"}), 200


@app.route('/api/users/top', methods=['GET'])
@cross_origin()
def top_users():
  cmd = "SELECT username, COUNT(*) FROM customers c, rates r WHERE c.email_id= r.email_id GROUP BY c.email_id, username HAVING COUNT(*) > 1 ORDER BY COUNT(*) DESC Limit 10"
  cursor = g.conn.execute(cmd)
  names = []
  for result in cursor:
    names.append({"userName" : result['username'], "numReviews" : result[1]})
  cursor.close()
  return jsonify(names)

@app.route('/api/users/reviews/<email>', methods=['GET'])
@cross_origin()
def user_reviews(email):
  cmd = "SELECT RA.rating_id, RF.restaurant_name, round((RA.ambience + RA.crowd + RA.customer_service + RA.value_for_money + RA.taste + RA.cooked)/6.0, 2) AS average_rating, RA.overall_written_review FROM Customers C, Rates R, Ratings RA, Restaurants_Fetches RF WHERE C.email_id = R.email_id  AND R.rating_id = RA.rating_id AND RF.license_no = R.license_no AND C.email_id = \'" + email + "\' ORDER BY average_rating DESC"
  cursor = g.conn.execute(cmd)
  names = []
  for result in cursor:
    names.append({"ratingId": result['rating_id'], "restaurantName": result['restaurant_name'], "avgRating": str(result[2]), "writtenReview": result['overall_written_review']})
  cursor.close()
  return jsonify(names)

@app.route('/api/users/favorites/<email>', methods=['GET'])
@cross_origin()
def user_favorites(email):
  cmd = "SELECT RF.license_no, RF.restaurant_name, round(AVG((ra.ambience + ra.crowd + ra.customer_service + ra.value_for_money + ra.taste + ra.cooked)/6.0), 2) AS average_rating FROM Views V, Rates R, Ratings RA, Restaurants_Fetches RF WHERE R.rating_id = RA.rating_id AND RF.license_no = R.license_no AND RF.license_no IN (SELECT V.license_no FROM Views V WHERE V.email_id = \'" + email + "\' AND V.favorite IS TRUE)  GROUP BY RF.license_no, RF.restaurant_name ORDER BY average_rating DESC NULLS LAST"
  cursor = g.conn.execute(cmd)
  names = []
  for result in cursor:
    names.append({"licenseNo": result['license_no'], "restaurantName": result['restaurant_name'], "avgRating": str(result[2])})
  cursor.close()
  return jsonify(names)

@app.route('/api/restaurants/search/area/<searchKey>', methods=['GET'])
@cross_origin()
def search_area(searchKey):
  names = []
  # search a restaurant based on area
  cmd = ""
  if searchKey == "0" or searchKey is None:
    cmd = "SELECT rf.license_no, rf.restaurant_name, round(AVG((ra.ambience + ra.crowd + ra.customer_service + ra.value_for_money + ra.taste + ra.cooked)/6.0), 2) AS Average_Rating FROM Restaurants_Fetches rf LEFT JOIN rates r On  rf.license_no = r.license_no LEFT JOIN ratings ra ON r.rating_id = ra.rating_id GROUP BY rf.license_no, rf.restaurant_name ORDER BY Average_Rating DESC NULLS LAST"
  else:
    cmd = "SELECT rf.license_no, rf.restaurant_name, round(AVG((ra.ambience + ra.crowd + ra.customer_service + ra.value_for_money + ra.taste + ra.cooked)/6.0), 2) AS Average_Rating FROM Restaurants_Fetches rf LEFT JOIN rates r On  rf.license_no = r.license_no LEFT JOIN ratings ra ON r.rating_id = ra.rating_id WHERE rf.area LIKE \'%%" + searchKey + "%%\' GROUP BY rf.license_no, rf.restaurant_name ORDER BY Average_Rating DESC NULLS LAST"
  
  cursor = g.conn.execute(cmd)
  for result in cursor:
    names.append({"licenseNo" : result['license_no'], "restaurantName" : result['restaurant_name'], "avg_rating" : str(result[2])})
  cursor.close()
  return jsonify(names)

@app.route('/api/restaurants/search/res/<searchKey>', methods=['GET'])
@cross_origin()
def search_res(searchKey):
  names = []
  # search a restaurant based on its name
  cmd = ""
  if searchKey == "0" or searchKey is None:
    cmd = "SELECT rf.license_no, rf.restaurant_name, round(AVG((ra.ambience + ra.crowd + ra.customer_service + ra.value_for_money + ra.taste + ra.cooked)/6.0), 2) AS Average_Rating FROM Restaurants_Fetches rf LEFT JOIN rates r On  rf.license_no = r.license_no LEFT JOIN ratings ra ON r.rating_id = ra.rating_id GROUP BY rf.license_no, rf.restaurant_name ORDER BY Average_Rating DESC NULLS LAST"
  else:
    cmd = "SELECT rf.license_no, rf.restaurant_name, round(AVG((ra.ambience + ra.crowd + ra.customer_service + ra.value_for_money + ra.taste + ra.cooked)/6.0), 2) AS Average_Rating FROM Restaurants_Fetches rf LEFT JOIN rates r On  rf.license_no = r.license_no LEFT JOIN ratings ra ON r.rating_id = ra.rating_id WHERE rf.restaurant_name LIKE \'%%" + searchKey + "%%\' GROUP BY rf.license_no, rf.restaurant_name ORDER BY Average_Rating DESC NULLS LAST"
  
  cursor = g.conn.execute(cmd)
  for result in cursor:
    names.append({"licenseNo" : result['license_no'], "restaurantName" : result['restaurant_name'], "avg_rating" : str(result[2])})
  cursor.close()
  return jsonify(names)


# @app.route('/api/area/<searchKey>', methods=['GET'])
# @cross_origin()
# def search(searchKey):
#   print(searchKey)
#   names = []
#   # search by area
#   # SELECT RestaurantName FROM Restaurants WHERE RestaurantName LIKE "%Thai%";
#   cmd = ""
#   if searchKey == "0" or searchKey is None:
#     cmd = "SELECT area,zipcode FROM locations order by zipcode"
#   else:
#     cmd = "SELECT area,zipcode FROM locations Where area LIKE \'%%" + searchKey + "%%\' order by zipcode"
#   print(cmd)
#   cursor = g.conn.execute(cmd)
#   print(cursor)
#   for result in cursor:
#     print(result)
#     names.append({"area" : result['area'], "zipcode" : str(result[1])})
#   cursor.close()
#   print(names)
#   return jsonify(names)


@app.route('/api/reviews/add', methods=['POST'])
@cross_origin()
def addReview():
  # search by restaurant or dish
  # SELECT RestaurantName FROM Restaurants WHERE RestaurantName LIKE "%Thai%";
  email = request.json.get("email", None)
  license_num = request.json.get("restaurant_license", None)
  
  ambience = request.json.get("ambience", None)
  crowd = request.json.get("crowd", None)
  customer_service = request.json.get("customer_service", None)
  value_for_money = request.json.get("value_for_money", None)
  taste = request.json.get("taste", None)
  cooked = request.json.get("cooked", None)
  writtenReview = request.json.get("writtenReview", None)

  cmd = f"SELECT COUNT(*) FROM Ratings R, Rates RA WHERE R.rating_id = RA.rating_id AND RA.email_id = '{str(email)}' AND RA.license_no = '{str(license_num)}'"
  cursor = g.conn.execute(cmd)

  for result in cursor:
    review_exists = result[0]

  if review_exists != 0:
    cmd = f"SELECT DISTINCT R.rating_id FROM Ratings R, Rates RA WHERE R.rating_id = RA.rating_id AND RA.email_id = '{str(email)}' AND RA.license_no = '{str(license_num)}'"
    cursor = g.conn.execute(cmd)

    for result in cursor:
      existing_rating_id = result[0]

    #print("Existing id: ", existing_rating_id)
    cmd = f"UPDATE Ratings SET ambience = {ambience}, crowd = {crowd}, customer_service = {customer_service}, value_for_money = {value_for_money}, taste = {taste}, cooked = {cooked}," + " overall_written_review = \'" + str(writtenReview) + "\' WHERE rating_id = \'" + str(existing_rating_id) + "\'"
    errflag = 0
    try:
      cursor = g.conn.execute(cmd)
    except Exception as err:
      print("###### " + str(err.orig) + " for parameters" + str(err.params))
      errflag = 1
    
    if not errflag:
      return jsonify("Rating already exists. So successfully modified it")
    else:
      return jsonify("Invalid entries")
  else:
    cmd = "SELECT COUNT(*) FROM Ratings"
    cursor = g.conn.execute(cmd)
    num_ratings = cursor.fetchone()[0]
    new_rating_id = str(int(num_ratings) + 10).zfill(5)
    #print(new_rating_id)
    cmd = f"INSERT INTO Ratings(rating_id, overall_written_review, ambience, crowd, customer_service, value_for_money, taste, cooked) VALUES ('{new_rating_id}', '{writtenReview}', {ambience}, {crowd}, {customer_service}, {value_for_money}, {taste}, {cooked})"
    errflag = 0
    try:
      cursor = g.conn.execute(cmd)
    except Exception as err:
      print("###### " + str(err.orig) + " for parameters" + str(err.params))
      errflag = 1
    
    if not errflag:
      cmd = f"INSERT INTO Rates(rating_id, email_id, license_no) VALUES ('{new_rating_id}', '{email}', '{license_num}')"
      cursor = g.conn.execute(cmd)
      return jsonify("Added a new rating successfully")
    else:
      return jsonify("Invalid entries")

@app.route('/api/reviews/delete', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def deleteReview():
  ratingId = request.json.get("ratingId", None)
  app.logger.info(ratingId)
  cmd = f"DELETE FROM Ratings WHERE rating_id = '{ratingId}'"
  cursor = g.conn.execute(cmd)
  return jsonify("Deleted the existing rating successfully")

@app.route('/api/reviews/edit', methods=['PUT'])
@cross_origin()
def editReview():
  # search by restaurant or dish
  # SELECT RestaurantName FROM Restaurants WHERE RestaurantName LIKE "%Thai%";
  ratingId = request.json.get("ratingId", None)
  app.logger.info(ratingId)
  #print('ratingId', ratingId)
  ambience = request.json.get("ambience", None)
  crowd = request.json.get("crowd", None)
  customer_service = request.json.get("customer_service", None)
  value_for_money = request.json.get("value_for_money", None)
  taste = request.json.get("taste", None)
  cooked = request.json.get("cooked", None)
  writtenReview = request.json.get("writtenReview", None)
  cmd = f"UPDATE Ratings SET ambience = {ambience}, crowd = {crowd}, customer_service = {customer_service}, value_for_money = {value_for_money}, taste = {taste}, cooked = {cooked}," + " overall_written_review = \'" + str(writtenReview) + "\' WHERE rating_id = \'" + str(ratingId) + "\'"
  errflag = 0
  try:
    cursor = g.conn.execute(cmd)
  except Exception as err:
    print("###### " + str(err.orig) + " for parameters" + str(err.params))
    errflag = 1
  
  if not errflag:
    return jsonify("Successfully edited the review")
  else:
    return jsonify("Invalid entries")

@app.route('/api/favorite/add', methods=['POST'])
@cross_origin()
def add_favorite_res():
  #favorite this restaurant
  email = request.json.get("email", None)
  license_num = request.json.get("restaurant_license", None)
  fav_value = request.json.get("fav_value", None)

  cmd = f"SELECT COUNT(*) FROM Views WHERE email_id = '{email}' AND license_no = '{license_num}'"
  cursor = g.conn.execute(cmd)

  for result in cursor:
    existing_count = result[0]

  if int(existing_count) == 0 and (fav_value == 'Y' or fav_value == 'y'):
    cmd = f"INSERT INTO Views(email_id, license_no, favorite) VALUES('{email}','{license_num}','TRUE')"
    cursor = g.conn.execute(cmd)
  
  return jsonify("Favorited the Restaurant")

@app.route('/api/favorite/delete', methods=['POST'])
@cross_origin()
def rem_favorite_res():
  #favorite this restaurant
  email = request.json.get("email", None)
  license_num = request.json.get("restaurant_license", None)
  rem_value = request.json.get("rem_value", None)

  cmd = f"SELECT COUNT(*) FROM Views WHERE email_id = '{email}' AND license_no = '{license_num}'"
  cursor = g.conn.execute(cmd)

  for result in cursor:
    existing_count = result[0]
  
  if int(existing_count) == 1 and (rem_value == 'Y' or rem_value == 'y'):
    cmd = f"DELETE FROM Views WHERE email_id = '{email}' AND license_no = '{license_num}'"
    cursor = g.conn.execute(cmd)
  
  return jsonify("Removed the favorite of Restaurant")


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
    app.run(host=HOST, port=PORT, debug=True, threaded=threaded)

  run()
