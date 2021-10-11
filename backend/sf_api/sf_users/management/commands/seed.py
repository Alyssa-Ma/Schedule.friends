from django.core.management.base import BaseCommand, CommandError
from ...models import User
from ...models import Course
from ...models import FriendRequest
from ...serializers import *

users_seed = [
    {
        "username": "Alyssa",
        "password": "test",
        "schedule": []
    },
    {
        "username": "David",
        "password": "test",
        "schedule": []
    },
    {
        "username": "Kobe",
        "password": "test",
        "schedule": []
    },
    {
        "username": "HenryC",
        "password": "test",
        "schedule": []
    }
]

courses_seed = [
    {
        "day_name": "MON",
        "course_name": "Calc",
        "course_number": "MATH",
        "time_start": "9AM",
        "time_end": "10AM"
    },
        {
        "day_name": "MON",
        "course_name": "Algo",
        "course_number": "CSCI",
        "time_start": "12PM",
        "time_end": "1PM"
    },
        {
        "day_name": "MON",
        "course_name": "Classic Lit",
        "course_number": "ENG",
        "time_start": "10AM",
        "time_end": "11AM"
    },
        {
        "day_name": "FRI",
        "course_name": "Bio",
        "course_number": "BIO",
        "time_start": "3PM",
        "time_end": "4PM"
    },
        {
        "day_name": "WED",
        "course_name": "Political Science",
        "course_number": "POL",
        "time_start": "2PM",
        "time_end": "3PM"
    },
]

MODE_REFRESH = 'refresh'

MODE_CLEAR = 'clear'


def clear_data():
    print("Deleting Users, Courses, and FriendRequests")
    FriendRequest.objects.all().delete()
    Course.objects.all().delete()
    User.objects.all().delete()
    print("Deleted Database")

def seed_data():
    print("Seeding database, clearing database first")
    clear_data()
    print("Writing to database")
    print("Creating users")
    for user in users_seed:
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
    alyssa_obj = User.objects.get(username='Alyssa')
    david_obj = User.objects.get(username='David')    
    kobe_obj = User.objects.get(username='Kobe')
    henryc_obj = User.objects.get(username='HenryC')
    print("Users created")
    print("Creating schedule")
    for i in range(len(courses_seed)):
        course_serializer = CourseSerializer(data=courses_seed[i])
        if course_serializer.is_valid():
            user_obj = {
                'schedule': [courses_seed[i]]
            }
            if i <= 1:
                user_serializer = UserSerializer(alyssa_obj, data=user_obj, context={'request': 'PATCH'}, partial=True)
            elif i == 2:
                user_serializer = UserSerializer(david_obj, data=user_obj, context={'request': 'PATCH'}, partial=True)
            elif i == 3:
                user_serializer = UserSerializer(kobe_obj, data=user_obj, context={'request': 'PATCH'}, partial=True)
            else:
                user_serializer = UserSerializer(henryc_obj, data=user_obj, context={'request': 'PATCH'}, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
    print("Schedule Created")
    print("Creating friend requests")
    friend_requests_seed = [
        {
            "from_user": alyssa_obj.id,
            "to_user": kobe_obj.id
        },
            {
            "from_user": henryc_obj.id,
            "to_user": david_obj.id
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
    print("Friend Requests Made")
    print("Creating friend lists")
    alyssa_obj.friend_list.add(kobe_obj.id)
    kobe_obj.friend_list.add(alyssa_obj.id)
    henryc_obj.friend_list.add(david_obj.id)
    david_obj.friend_list.add(henryc_obj.id)
    print("Created friend lists")

def run_seed(self, mode):
    clear_data()
    if mode == MODE_CLEAR:
        return
    seed_data()

class Command(BaseCommand):
    help = "Seed a database for testing and development"

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("Seed data management")
        run_seed(self, options['mode'])
        self.stdout.write("Done.")
