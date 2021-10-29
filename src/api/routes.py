"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Contact
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

@api.route('/user', methods=['POST'])
def register():
    info = request.json 
    user_exists = User.query.filter_by(email=info['email'])
    if user_exists:
        raise APIException('This user already exists', status_code=409)
    else:    
        new_user = User(email=info['email'], password=info['password'])
        db.session.add(new_user)
        db.session.commit()

        user_created = User.query.filter_by(email=info['email'])
        if user_created:
            return jsonify("The user has been created"), 200    
        else:    
            raise APIException("User registration failed", status_code=500)

@api.route('/contacts', methods=['GET'])
def get_all_contacts():
    contacts = Contact.query.all()
    contacts = list(map(lambda x:x.serialize(), contacts))
    return jsonify(contacts), 200            

@api.route('/contacts', methods=['POST'])
def add_contact():
    body = request.json
    contact_exists = Contact.query.filter_by(full_name=body["full_name"]).first()
    print("CONTACT_EXISTS", contact_exists)
    if contact_exists:
        return jsonify({
            'msg':'This contact already exists. Use new name.',
            'status': 409
            }), 409

    new_contact = Contact(full_name=body["full_name"], email=body["email"], phone=body["phone"], address=body["address"])
    db.session.add(new_contact)
    db.session.commit()

    contact_created = Contact.query.filter_by(full_name=body['full_name'])
    if contact_created:
        return jsonify({
            'msg':'Contact was saved.',
            'status': 200
            }), 200    
    else:    
        raise APIException("Contact was not saved", status_code=500)

@api.route('/contacts', methods=['PUT'])
def update_contact():
    body = request.json
    contact = Contact.query.get(body['id'])

    if contact is None:
        raise APIException('Contact not found', status_code=404)

    if "full_name" not in body and "email" not in body and "phone" not in body and "address" not in body: 
        raise APIException('No new data was received', status_code=404)
    
    if "full_name" in body:
        contact.full_name = body['full_name']

    if "email" in body:
        contact.email = body['email']

    if "phone" in body:    
        contact.password = body['phone']

    if "address" in body:
        contact.address = body['address']
    db.session.commit()
    
    return jsonify("Contact was updated"), 200


@api.route('/contacts/<id>', methods=['DELETE'])
def delete_contact(id):
    selected_contact = Contact.query.get(id)
    print(selected_contact)

    if selected_contact is None:
        return jsonify({
            'msg':'Contact not found',
            'status': 404
            }), 404

    db.session.delete(selected_contact)
    db.session.commit()

    check_contact = Contact.query.get(id)       
    if check_contact is None: 
        return jsonify({
            'msg':'Contact was deleted',
            'status': 200
            }), 200