from bson import ObjectId
from flask import Flask, request, json, jsonify, send_file
from pymongo import MongoClient
import certifi
from uuid import uuid4
from datetime import datetime
# from dotenv import load_dotenv, find_dotenv
import os
from flask_cors import CORS
from flask_uploads import UploadSet, IMAGES, configure_uploads

# ********************************
#           APP CONFIG
# ********************************
app = Flask(__name__)
app.config['UPLOADED_IMAGES_DEST'] = 'static/images'
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
images = UploadSet('images', IMAGES)
configure_uploads(app, images)

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
    idea_info = db["ideas"].find().sort([("upvotes.length", -1)])
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
       "user_id": request_data["user_id"],
        "name": request_data["name"],
        "start_date": str(request_data["start_date"]),
        "end_date": str(request_data["end_date"]),
        "location": request_data["location"],
        "guests": [],
        "ideas": []
    }

    db["trips"].insert_one(trip)

    return "SUCCESS: Trip created"

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    image = request.files['image']
    trip_name = request.form['trip_name']
    filename = images.save(image)
    inserted_image = db["images"].insert_one({'filename': filename, 'trip_name': trip_name})
    return jsonify({'image_id': str(inserted_image.inserted_id)})

@app.route('/api/get-image/<string:trip_name>', methods=['GET'])
def get_image(trip_name):
    image = db["images"].find_one({'trip_name': trip_name})
    if image:
        return send_file(images.path(image['filename']))
    else:
        return jsonify({'error': 'Image not found'}), 404


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

    inserted_idea = db["ideas"].insert_one(idea)
    trip = db["trips"].find_one({'_id': ObjectId(request_data["associatedTrip"])})
    temp = trip
    temp["ideas"].append(str(inserted_idea.inserted_id))
    db["trips"].replace_one({'_id': ObjectId(request_data["associatedTrip"])}, temp)
    # filter = { '_id': request_data["associatedTrip"] }
    # newvalue = { "$push": { 'ideas': inserted_idea.inserted_id } }

    # db["trips"].update_one(filter, newvalue),


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
    args = request.args	
    args_dict = args.to_dict()	
    user_id = args_dict["user_id"]	
    trips = db["trips"].find({"user_id": user_id})	
    trip_list = []	
    for i in trips:	
        i["_id"] = str(i["_id"])	
        trip_list.append(i)	
    return trip_list

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
    idea_id = request.json["id"]
    user_id = request.json["user_id"]
    idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})
    if user_id in idea["upvotes"]:
        db["ideas"].update_one({"_id": ObjectId(idea_id)}, {"$pull": {"upvotes": user_id}})
        updated_idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})
        return jsonify(upvotes=updated_idea["upvotes"], downvotes=updated_idea["downvotes"], _id=idea_id)
    elif user_id in idea["downvotes"]:
        db["ideas"].update_one({"_id": ObjectId(idea_id)}, {"$pull": {"downvotes": user_id}, "$push": {"upvotes": user_id}})
        updated_idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})
        return jsonify(upvotes=updated_idea["upvotes"], downvotes=updated_idea["downvotes"], _id=idea_id)
    else:
        db["ideas"].update_one({"_id": ObjectId(idea_id)}, {"$push": {"upvotes": user_id}})
        updated_idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})
        return jsonify(upvotes=updated_idea["upvotes"], downvotes=updated_idea["downvotes"], _id=idea_id)

# Put request to update  downvotes
@app.route("/api/update-idea-downvotes", methods=["PUT"])
def update_idea_downvotes():
    idea_id = request.json["id"]
    user_id = request.json["user_id"]
    idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})
    if user_id in idea["downvotes"]:
        db["ideas"].update_one({"_id": ObjectId(idea_id)}, {"$pull": {"downvotes": user_id}})
        updated_idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})
        return jsonify(upvotes=updated_idea["upvotes"], downvotes=updated_idea["downvotes"], _id=idea_id)
    elif user_id in idea["upvotes"]:
        db["ideas"].update_one({"_id": ObjectId(idea_id)}, {"$pull": {"upvotes": user_id}, "$push": {"downvotes": user_id}})
        updated_idea =db["ideas"].find_one({"_id": ObjectId(idea_id)})
        return jsonify(upvotes=updated_idea["upvotes"], downvotes=updated_idea["downvotes"], _id=idea_id)
    else:
        db["ideas"].update_one({"_id": ObjectId(idea_id)}, {"$push": {"downvotes": user_id}})
        updated_idea = db["ideas"].find_one({"_id": ObjectId(idea_id)})
        return jsonify(upvotes=updated_idea["upvotes"], downvotes=updated_idea["downvotes"], _id=idea_id)

# Delete request for a trip


@app.route("/api/delete-trip", methods=["DELETE"])
def delete_trip():
    request_data = json.loads(request.data)
    trip = db["trips"].find_one({"_id": ObjectId(request_data["id"])})

    for idea in trip["ideas"]:
        db["ideas"].delete_one({"_id": ObjectId(idea)})

    db["trips"].delete_one({"_id": ObjectId(request_data["id"])})

    return "SUCCESS: Deleted trip"


# Delete request for idea
@app.route("/api/delete-idea", methods=["DELETE"])
@cross_origin()
def delete_idea():
    request_data = json.loads(request.data)
    db["ideas"].delete_one({"_id": ObjectId(request_data["id"])})

    return "SUCCESS: Deleted idea"


if __name__ == "__main__":
    app.run(debug=True)
