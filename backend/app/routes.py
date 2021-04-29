from datetime import timedelta
from flask import jsonify, request, make_response
from flask_restplus import Resource
from app import api, password_encrypt, app
from app.models.staff import Staff
from app.models.candidate import Candidate
from flask_jwt_extended import jwt_required, create_access_token


# Creating staff route for get and post requests.
@api.route('/staff')
class StaffAll(Resource):
    """ Creating StaffAll class inherited from resource to implement flask_restplus api functionality """

    def get(self):
        """
        Function to get all staffs in the database

        :return: Returns a json with all existing staffs from the database.
        """
        return make_response(jsonify(Staff.objects.all()), 200)


@api.route('/register')
# @jwt_required()
class StaffRegister(Resource):
    def post(self):
        """
        Function to add new staffs on the

        :return: Response based on success of add.
        """
        try:
            # Assigning API payload to variable
            data = api.payload

            # Encrypting plain password from request.
            data['password'] = password_encrypt.hash_password(data['password'])

            # Adding new register to database
            Staff(name=data['name'], email=data['email'], password=data['password'], isStaff=True).save()
            return make_response(jsonify(message='Successfully Registered'), 201)

        except:
            return make_response(jsonify(message='Sorry, an error has occurred'), 406)


# Creating login route for post request.
@api.route('/login')
class StaffByEmail(Resource):
    """ StaffByEmail inherits from Resource for usage of flask_restplus """

    # Function to check for staff and it's password.
    def post(self):
        """
        Function that checks if the staff login was successful (checks for staff email and password) in case login is
        successful, a JWT Token is created and returned for that staff.

        :return: Response and a login boolean based on success of login, if successful it will return a token as well
        as the response.
        """
        try:
            data = api.payload
            # Checking if staff exists in database by email (defined as unique).
            if Staff.objects(email=data['email']):

                # Checking if the password match with the one hashed on the db.
                if password_encrypt.compare_passwords(data['password'], Staff.objects(email=data['email'])[0].password):

                    # Creating access token for staff
                    access_token = create_access_token(expires_delta=timedelta(days=60), identity=data['email'])
                    return make_response(jsonify(message='Login Successful', login=True, access_token=access_token),
                                         201)

                else:
                    return make_response(jsonify(message='Password is wrong!', login=False), 401)

            else:
                return make_response(jsonify(message='Staff does not exist', login=False), 401)

        except Exception as e:
            return make_response(jsonify(message='An error has occurred', error=str(e), login=False), 406)


@api.route('/add_candidate')
@jwt_required()
class CandidateRegister(Resource):
    def post(self):
        """
        Function to add new candidates on the database

        :return: Response based on success of add.
        """
        try:
            # Assigning API payload to variable
            data = api.payload

            # Encrypting plain password from request.
            data['password'] = password_encrypt.hash_password(data['password'])

            access_token = create_access_token(expires_delta=timedelta(days=60), identity=data['email'])
            # Adding new register to database
            Candidate(name=data['name'], email=data['email'], personal_token=access_token,
                              video_interview_path='', cv_path='', password=data['password']).save()
            return make_response(jsonify(message='Successfully Registered'), 201)

        except:
            return make_response(jsonify(message='Sorry, an error has occurred'), 406)
