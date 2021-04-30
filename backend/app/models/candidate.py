from mongoengine import ObjectIdField, Document
from app import db


class Candidate(Document):
    """ Candidate class for declaring a model for Candidate collection """
    _id = ObjectIdField()
    name = db.StringField()
    email = db.StringField(unique=True)
    role = db.StringField()
    branch = db.StringField()
    personal_token = db.StringField()
    video_interview_path = db.StringField()
    cv_path = db.StringField()
    password = db.StringField()
