from django.core.management.base import BaseCommand, CommandError
from ...models import User
from ...models import Course
from ...models import FriendRequest
from ...serializers import *

users_seed = [
    {
        "username": "alyssa",
        "first_name": "Alyssa",
        "last_name": "Ma",
        "password": "test",
        "schedule": []
    },
    {
        "username": "david",
        "first_name": "David",
        "last_name": "Dejesus",
        "password": "test",
        "schedule": []
    },
    {
        "username": "kobe",
        "first_name": "Kobe",
        "last_name": "Dejesus",
        "password": "test",
        "schedule": []
    },
    {
        "username": "henryC",
        "first_name": "Henry",
        "last_name": "Cevallos",
        "password": "test",
        "schedule": []
    }
]

courses_seed = [
    {
        "day_name": ["MON", "WED"],
        "course_name": "Calc",
        "course_number": "MATH",
        "time_start": "9AM",
        "time_end": "10AM"
    },
        {
        "day_name": ["MON"],
        "course_name": "Algo",
        "course_number": "CSCI",
        "time_start": "12PM",
        "time_end": "1PM"
    },
        {
        "day_name": ["MON"],
        "course_name": "Classic Lit",
        "course_number": "ENG",
        "time_start": "10AM",
        "time_end": "11AM"
    },
        {
        "day_name": ["TUE,FRI"],
        "course_name": "Bio",
        "course_number": "BIO",
        "time_start": "3PM",
        "time_end": "4PM"
    },
        {
        "day_name": ["WED","SAT"],
        "course_name": "Political Science",
        "course_number": "POL",
        "time_start": "2PM",
        "time_end": "3PM"
    },
]

MODE_REFRESH = 'refresh'

MODE_CLEAR = 'clear'

def clear_data(self):
    self.stdout.write("Deleting Users, Courses, and FriendRequests")
    FriendRequest.objects.all().delete()
    Course.objects.all().delete()
    User.objects.all().delete()
    self.stdout.write("Deleted Database")

def seed_data(self):
    self.stdout.write("Seeding database, clearing database first")
    clear_data(self)
    self.stdout.write("Writing to database")
    
    self.stdout.write("Creating users")
    user_database = []
    for user in users_seed:
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
            user_database.append(User.objects.get(username=user['username']))
    self.stdout.write("Users created")

    self.stdout.write("Creating schedule")
    for i in range(len(courses_seed)):
        course_serializer = CourseSerializer(data=courses_seed[i])
        if course_serializer.is_valid():
            user_obj = {
                'schedule': [courses_seed[i]]
            }
            if i <= 1:
                user_serializer = UserSerializer(user_database[0], data=user_obj, context={'request': 'PATCH'}, partial=True)
            elif i == 2:
                user_serializer = UserSerializer(user_database[1], data=user_obj, context={'request': 'PATCH'}, partial=True)
            elif i == 3:
                user_serializer = UserSerializer(user_database[2], data=user_obj, context={'request': 'PATCH'}, partial=True)
            else:
                user_serializer = UserSerializer(user_database[3], data=user_obj, context={'request': 'PATCH'}, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
    self.stdout.write("Schedule Created")

    self.stdout.write("Creating friend requests")
    friend_requests_seed = [
        {
            "from_user": user_database[0].id,
            "to_user": user_database[2].id
        },
            {
            "from_user": user_database[3].id,
            "to_user": user_database[1].id
        },
    ]
    for friend_request in friend_requests_seed:
        fr_serializer = FriendRequestSerializer(data=friend_request)
        if fr_serializer.is_valid():
            fr_serializer.save()
            from_user = User.objects.get(pk=friend_request['from_user'])
            to_user = User.objects.get(pk=friend_request['to_user'])
            from_user.friend_requests.add(fr_serializer.data['id'])
            from_user.save()
            to_user.friend_requests.add(fr_serializer.data['id'])
            to_user.save()
    self.stdout.write("Friend Requests Made")

    self.stdout.write("Creating friend lists")
    user_database[0].friend_list.add(user_database[1].id)
    user_database[1].friend_list.add(user_database[0].id)
    user_database[3].friend_list.add(user_database[2].id)
    user_database[2].friend_list.add(user_database[3].id)
    self.stdout.write("Created friend lists")

def run_seed(self, mode):
    clear_data(self)
    if mode == MODE_CLEAR:
        return
    seed_data(self)

class Command(BaseCommand):
    help = "Seed a database for testing and development"

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("Seed data management")
        run_seed(self, options['mode'])
        self.stdout.write("Done.")
