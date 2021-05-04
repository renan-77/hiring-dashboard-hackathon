from random import randint, choice
from faker import Faker
from random_object_id import generate
import jwt
import names


def create_random_candidate():
    """
    Function that creates a random candidate based on a name list and a last name list
    :return: Returns a JSON candidate object
    """

    # Declaring random indexes based on length of the arrays (number from 0 to length - 1).
    first_name = names.get_first_name()
    last_name = names.get_last_name()

    # Creating full name string based on first and last names.
    full_name = f'{first_name.title()} {last_name.title()}'

    # Creating email string based on first and last names.
    email = f'{first_name.lower()}.{last_name.lower()}@email.com'

    # Generating JWT token from function using email as key.
    token = generate_jwt_token(email)

    # Generating object id.
    id = generate()

    # Generating random address from library.
    address = get_random_address()

    # Writing json candidate object
    candidate = {
        '_id': id,
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'role': get_random_role(),
        'branch': get_random_location(),
        'personal_token': token,
        'college': get_random_college(),
        'street_address': address['street'],
        'city': address['city'],
        'country': address['country'],
        'postcode': address['postcode'],
        'status': get_random_status(),
        'hasInterviewVideo': get_random_boolean(),
        'hasUpdatedCv': get_random_boolean(),
        'password': f'{first_name.lower()}123'
    }

    return candidate


def get_random_status():
    """
    Function that returns a random status based on a status list
    :return: Returns random status
    """
    status = ['approved', 'denied', 'pending']
    status_idx = randint(0, len(status) - 1)
    return status[status_idx]


def get_random_boolean():
    return choice([True, False])


def get_random_address():
    """
    Getting random address from library Fake
    :returns: a list of address elements (street, city, country, postcode).
    """
    fake = Faker()
    return {'street': fake.street_address(), 'city': fake.city(), 'country': fake.country(),
            'postcode': fake.postcode()}


def get_random_location():
    """
    Function that returns a random location based on a location list
    :return: Returns random location
    """
    locations = ['Cork, Mahon', 'Cork, Ovens', 'Limerick', 'Dublin']
    location_idx = randint(0, len(locations) - 1)
    return locations[location_idx]


def generate_jwt_token(key):
    """
    Function that returns a jwt token based on a key
    :return: Returns JWT Token
    """
    return jwt.encode({"some": "payload"}, key, algorithm="HS256")


def get_random_college():
    """
    Function that returns a random college based on a college list
    :return: Returns a random college.
    """
    colleges = ['Munster Technological University', 'University College Cork', 'University College Dublin',
             'Trinity College', 'National University of Ireland Galway', 'Galway Mayo Institute of Technology',
             'Limerick Institute of Technology', 'Griffith College', 'University of Limerick']
    college_idx = randint(0, len(colleges) - 1)
    return colleges[college_idx]


def get_random_role():
    """
    Function that returns a random role based on a role list
    :return: Returns a random role.
    """
    roles = ['Software Engineer', 'Finance', 'Supply Chain', 'IT', 'HR', 'Customer Support', 'Cyber Security', 'Sales',
             'Logistics', 'Marketing']
    role_idx = randint(0, len(roles) - 1)
    return roles[role_idx]


def write_candidate_list(number_of_candidates, file_name):
    """
    Function that writes candidate list to file

    :param number_of_candidates: The total number of registers to be created
    :param file_name: Name of file to be created
    """
    candidates = []

    for i in range(0, number_of_candidates):
        print(f'Writing candidate number: {i+1}')
        candidates.append(create_random_candidate())

    f = open(f'{file_name}.json', 'w')
    f.write(str(candidates))


write_candidate_list(600, 'candidates')
