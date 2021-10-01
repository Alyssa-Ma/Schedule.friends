# Create your models here.
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    # Will need to look into how to correctly implement hashing strings
    password = models.CharField(max_length=50)
    schedule = models.ForeignKey('Day', on_delete=models.CASCADE, null=True)
    friend_list = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.email

DAYS_OF_WEEK = [
    ('SUN', 'Sunday'),
    ('MON', 'Monday'),
    ('TUE', 'Tuesday'),
    ('WED', 'Wednesday'),
    ('THU', "Thursday"),
    ('FRI', 'Friday'),
    ('SAT', 'Saturday')
]

class Day(models.Model):
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    courses = models.ForeignKey('Course', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.get_day_display()

class Course(models.Model):
    course_name = models.CharField(max_length=50)
    course_number = models.CharField(max_length=30)
    
    # time_start and time_end will likely need more approriate
    # fields that will parse better with the front-end apps
    time_start = models.CharField(max_length=7)
    time_end = models.CharField(max_length=7)

    def __str__(self):
        return self.course_name
