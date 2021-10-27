"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity
import datetime, json, os 


api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    credentials = request.json
    email = credentials.get('email', None)
    password = credentials.get('password', None)
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None:
        return jsonify({"msg": "Invalid email or password"}), 401

    expires = datetime.timedelta(days=7)
    access_token = create_access_token(identity=email, expires_delta=expires)

    return jsonify(user=email, token=access_token), 200    
