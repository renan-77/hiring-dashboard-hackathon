from random import randint
from random_object_id import generate
import jwt


def create_random_candidate():
"""
Function that creates a random candidate based on a name list and a last name list
:return: Returns a JSON candidate object
"""
    names_list = ['Abigail', 'Alexandra', 'Alison', 'Amanda', 'Amelia', 'Amy', 'Andrea', 'Angela', 'Anna', 'Anne',
                  'Audrey',
                  'Ava', 'Bella', 'Bernadette', 'Carol', 'Caroline', 'Carolyn', 'Chloe', 'Claire', 'Deirdre', 'Diana',
                  'Diane', 'Donna', 'Dorothy', 'Elizabeth', 'Ella', 'Emily', 'Emma', 'Faith', 'Felicity', 'Fiona',
                  'Gabrielle', 'Grace', 'Hannah', 'Heather', 'Irene', 'Jan', 'Jane', 'Jasmine', 'Jennifer', 'Jessica',
                  'Joan', 'Joanne', 'Julia', 'Karen', 'Katherine', 'Kimberly', 'Kylie', 'Lauren', 'Leah', 'Lillian',
                  'Lily',
                  'Lisa', 'Madeleine', 'Maria', 'Mary', 'Megan', 'Melanie', 'Michelle', 'Molly', 'Natalie', 'Nicola',
                  'Olivia', 'Penelope', 'Pippa', 'Rachel', 'Rebecca', 'Rose', 'Ruth', 'Sally', 'Samantha', 'Sarah',
                  'Sonia',
                  'Sophie', 'Stephanie', 'Sue', 'Theresa', 'Tracey', 'Una', 'Vanessa', 'Victoria', 'Virginia', 'Wanda',
                  'Wendy', 'Yvonne', 'Zoe', 'Adam', 'Adrian', 'Alan', 'Alexander', 'Andrew', 'Anthony', 'Austin',
                  'Benjamin',
                  'Blake', 'Boris', 'Brandon', 'Brian', 'Cameron', 'Carl', 'Charles', 'Christian', 'Christopher',
                  'Colin',
                  'Connor', 'Dan', 'David', 'Dominic', 'Dylan', 'Edward', 'Eric', 'Evan', 'Frank', 'Gavin', 'Gordon',
                  'Harry',
                  'Ian', 'Isaac', 'Jack', 'Jacob', 'Jake', 'James', 'Jason', 'Joe', 'John', 'Jonathan', 'Joseph',
                  'Joshua',
                  'Julian', 'Justin', 'Keith', 'Kevin', 'Leonard', 'Liam', 'Lucas', 'Luke', 'Matt', 'Max', 'Michael',
                  'Nathan', 'Neil', 'Nicholas', 'Oliver', 'Owen', 'Paul', 'Peter', 'Phil', 'Piers', 'Richard', 'Robert',
                  'Ryan', 'Sam', 'Sean', 'Sebastian', 'Simon', 'Stephen', 'Steven', 'Stewart', 'Thomas', 'Tim',
                  'Trevor',
                  'Victor', 'Warren', 'William',
                  ]

    last_names_list = ['Abraham', 'Allan', 'Alsop', 'Anderson', 'Arnold', 'Avery', 'Bailey', 'Baker', 'Ball', 'Bell',
                       'Berry',
                       'Black', 'Blake', 'Bond', 'Bower', 'Brown', 'Buckland', 'Burgess', 'Butler', 'Cameron',
                       'Campbell',
                       'Carr', 'Chapman', 'Churchill', 'Clark', 'Clarkson', 'Coleman', 'Cornish', 'Davidson', 'Davies',
                       'Dickens', 'Dowd', 'Duncan', 'Dyer', 'Edmunds', 'Ellison', 'Ferguson', 'Fisher', 'Forsyth',
                       'Fraser',
                       'Gibson', 'Gill', 'Glover', 'Graham', 'Grant', 'Gray', 'Greene', 'Hamilton', 'Hardacre',
                       'Harris',
                       'Hart', 'Hemmings', 'Henderson', 'Hill', 'Hodges', 'Howard', 'Hudson', 'Hughes', 'Hunter',
                       'Ince',
                       'Jackson', 'James', 'Johnston', 'Jones', 'Kelly', 'Kerr', 'King', 'Knox', 'Lambert', 'Langdon',
                       'Lawrence', 'Lee', 'Lewis', 'Lyman', 'MacDonald', 'Mackay', 'Mackenzie', 'MacLeod', 'Manning',
                       'Marshall', 'Martin', 'Mathis', 'May', 'McDonald', 'McLean', 'McGrath', 'Metcalfe', 'Miller',
                       'Mills',
                       'Mitchell', 'Morgan', 'Morrison', 'Murray', 'Nash', 'Newman', 'Nolan', 'North', 'Ogden',
                       'Oliver',
                       'Paige', 'Parr', 'Parsons', 'Paterson', 'Payne', 'Peake', 'Peters', 'Piper', 'Poole', 'Powell',
                       'Pullman', 'Quinn', 'Rampling', 'Randall', 'Rees', 'Reid', 'Roberts', 'Robertson', 'Ross',
                       'Russell',
                       'Rutherford', 'Sanderson', 'Scott', 'Sharp', 'Short', 'Simpson', 'Skinner', 'Slater', 'Smith',
                       'Springer', 'Stewart', 'Sutherland', 'Taylor', 'Terry', 'Thomson', 'Tucker', 'Turner',
                       'Underwood',
                       'Vance', 'Vaughan', 'Walker', 'Wallace', 'Walsh', 'Watson', 'Welch', 'White', 'Wilkins',
                       'Wilson',
                       'Wright', 'Young',
                       ]

    # Declaring random indexes based on length of the arrays (number from 0 to length - 1).
    first_name_idx = randint(0, len(names_list) - 1)
    last_name_idx = randint(0, len(last_names_list) - 1)

    # Creating full name string based on first and last names.
    full_name = f'{names_list[first_name_idx]} {last_names_list[last_name_idx]}'

    # Creating email string based on first and last names.
    email = f'{names_list[first_name_idx].lower()}.{last_names_list[last_name_idx].lower()}@email.com'

    # Generating JWT token from function using email as key.
    token = generate_jwt_token(email)

    # Generating object id.
    id = generate()

    # Writing json candidate object
    candidate = {
        '_id': id,
        'name': full_name,
        'email': email,
        'role': get_random_role(),
        'branch': get_random_location(),
        'personal_token': token,
        'video_interview_path': '',
        'cv_path': '',
        'password': f'{names_list[first_name_idx].lower()}123'
    }

    return candidate


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
        candidates.append(create_random_candidate())


    f = open(f'{file_name}.json', 'w')
    f.write(str(candidates))


