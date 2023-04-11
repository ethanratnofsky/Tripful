from bson import ObjectId
from flask import Flask, request, json, jsonify
from pymongo import MongoClient
import certifi
from uuid import uuid4
from datetime import datetime
# from dotenv import load_dotenv, find_dotenv
import os
from flask_cors import CORS

# ********************************
#           APP CONFIG
# ********************************
app = Flask(__name__)
CORS(app)

# ********************************
#         MONGODB CONFIG
# ********************************
# load_dotenv(find_dotenv())
# password = os.environ.get("MONGODB_PWD")
password = "ethansq"

cluster = MongoClient(
    f"mongodb+srv://admin:{password}@tripfulcluster.govpqrv.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
db = cluster["tripful"]

# ********************************
#             VIEWS
# ********************************

# basic sanity check
# @app.route("/api", methods=["GET"])
# def test():
#     return {"names": ["Nick Jonas", "Joe Jonas"]}

# Get all of the trips (for admin view)


@app.route("/api/read-trips", methods=["GET"])
def read_trips():
    trips = []
    trip_info = db["trips"].find()
    for trip in list(trip_info):
        trip["_id"] = str(trip["_id"])
        trips.append(trip)

    return trips

# Get all of the ideas (for admin view)


@app.route("/api/read-ideas", methods=["GET"])
def read_ideas():
    ideas = []
    idea_info = db["ideas"].find()
    for idea in list(idea_info):
        idea["_id"] = str(idea["_id"])
        ideas.append(idea)

    return ideas

# Get all users


@app.route("/api/read-users", methods=["GET"])
def read_users():
    users = []
    user_info = db["users"].find()
    for user in list(user_info):
        user["_id"] = str(user["_id"])
        users.append(user)

    return users

# Get single user


@app.route("/api/read-user", methods=["GET"])
def read_user():
    args = request.args
    args_dict = args.to_dict()
    user_id = args_dict["user_id"]

    user = db["users"].find_one({"_id": user_id})
    print(user)

    return user

# Post request to create a trip


@app.route("/api/create-trip", methods=["POST"])
def create_trip():
    request_data = json.loads(request.data)

    # lookup mongo user info from firebase user info

    trip = {
        # "created_by": "blahblah"
        "name": request_data["name"],
        "start_date": str(request_data["start_date"]),
        "end_date": str(request_data["end_date"]),
        "location": request_data["location"],
        "guests": [],
        "ideas": []
    }

    db["trips"].insert_one(trip)

    return "SUCCESS: Trip created"


@app.route("/api/create-user", methods=["POST"])
def create_user():
    request_data = json.loads(request.data)

    user = {
        "_id": request_data["_id"],
        "name": request_data["name"],
        "phone_number": request_data["phone_number"],
    }

    db["users"].insert_one(user)

    return "SUCCESS: User created"

# Post request to create a idea


@app.route("/api/create-idea", methods=["POST"])
def create_idea():
    request_data = json.loads(request.data)

    # lookup mongo user info from firebase user info

    idea = {
        "created_by": request_data["createdBy"],
        "title": request_data["title"],
        "associated_trip": request_data["associatedTrip"],
        "created_at": str(datetime.now().isoformat()),
        "last_edited": str(datetime.now().isoformat()),
        "content": request_data["content"],
        "upvotes": [],
        "downvotes": []
    }

    db["ideas"].insert_one(idea)

    return "SUCCESS: Idea created"

# Get request to read ideas from a specific trip


@app.route("/api/read-trip-ideas", methods=["GET"])
def read_trip_ideas():
    args = request.args
    args_dict = args.to_dict()
    trip_id = args_dict["trip_id"]

    trip_ideas_list = []

    trip_ideas = db["ideas"].find({"associated_trip": trip_id})
    for i in trip_ideas:
        i["_id"] = str(i["_id"])
        trip_ideas_list.append(i)

    return trip_ideas_list

# Get request to get a specific trip


@app.route("/api/read-trip", methods=["GET"])
def read_trip():
    args = request.args
    args_dict = args.to_dict()
    trip_id = args_dict["trip_id"]

    trip = db["trips"].find_one({"_id": ObjectId(trip_id)})
    trip["_id"] = str(trip["_id"])

    return trip

# Get request to read trips for a specific user


@app.route("/api/read-user-trips", methods=["GET"])
def read_user_trips():
    request_data = json.loads(request.data)
    trips = db["trips"].find({"created_by": request_data["created_by"]})

    return trips

# Put request to update a trip


@app.route("/api/update-trip", methods=["PUT"])
def update_trip():
    request_data = json.loads(request.data)
    id = str(request_data["_id"])

    trip = {
        # "created_by": "blahblah"
        "name": request_data["name"],
        "start_date": request_data["start_date"],
        "end_date": request_data["end_date"],
        "location": request_data["location"],
        "guests": request_data["guests"],
        "ideas": request_data["ideas"]
    }

    db["trips"].replace_one({"_id": ObjectId(id)}, trip)

    return "SUCCESS: Trip updated"

# Put request to update  idea


@app.route("/api/update-idea", methods=["PUT"])
def update_idea():
    request_data = json.loads(request.data)
    id = str(request_data["_id"])

    idea = {
        "_id": ObjectId(id),
        "title": request_data["title"],
        "associated_trip": request_data["associated_trip"],
        "created_by": request_data["created_by"],
        "created_at": request_data["created_at"],
        "last_edited": str(datetime.now().isoformat()),
        "content": request_data["content"],
        "upvotes": request_data["upvotes"],
        "downvotes": request_data["downvotes"]
    }

    db["ideas"].replace_one({"_id": ObjectId(id)}, idea)

    return "SUCCESS: Idea updated"

# Put request to update  upvotes


@app.route("/api/update-idea-upvotes", methods=["PUT"])
def update_idea_upvotes():
    args = request.args
    args_dict = args.to_dict()
    idea_id = args_dict["idea_id"]

    idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})

    idea = {
        "_id": idea["_id"],
        "created_by": "Jon Doe",  # TO DO CHANGE THIS TO NAME
        "title": idea["title"],
        "associated_trip": idea["associated_trip"],
        "created_at": idea["created_at"],
        "last_edited": str(datetime.now().isoformat()),
        "content": idea["content"],
        "upvotes": idea["upvotes"].append(idea_id),
        "downvotes": idea["downvotes"]
    }

    db["ideas"].replace_one({"_id": ObjectId(idea_id)}, idea)

    return "SUCCESS: Idea updated"

# Put request to update  downvotes


@app.route("/api/update-idea-downvotes", methods=["PUT"])
def update_idea_downvotes():
    args = request.args
    args_dict = args.to_dict()
    idea_id = args_dict["idea_id"]

    idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})

    idea = {
        "_id": idea["_id"],
        "created_by": "Jon Doe",  # TO DO CHANGE THIS TO NAME
        "title": idea["title"],
        "associated_trip": idea["associated_trip"],
        "created_at": idea["created_at"],
        "last_edited": str(datetime.now().isoformat()),
        "content": idea["content"],
        "upvotes": idea["upvotes"],
        "downvotes": idea["downvotes"].append(idea_id)
    }

    db["ideas"].replace_one({"_id": ObjectId(idea_id)}, idea)

    return "SUCCESS: Idea updated"

# Delete request for a trip


@app.route("/api/delete-trip", methods=["DELETE"])
def delete_trip():
    request_data = json.loads(request.data)
    db["trips"].delete_one({"_id": ObjectId(request_data["id"])})

    return "SUCCESS: Deleted trip"


# Delete request for idea
@app.route("/api/delete-idea", methods=["DELETE"])
def delete_idea():
    request_data = json.loads(request.data)
    db["ideas"].delete_one({"_id": ObjectId(request_data["id"])})

    return "SUCCESS: Deleted idea"


if __name__ == "__main__":
    app.run(debug=True)
