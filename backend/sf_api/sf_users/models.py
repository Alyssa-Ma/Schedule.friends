# Create your models here.
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30)
    # Will need to look into how to correctly implement hashing strings
    password = models.CharField(max_length=50)
    friend_list = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    friend_requests = models.ManyToManyField('FriendRequest', blank=True)

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

class Course(models.Model):
    # day = models.ForeignKey('Day', related_name='courses', on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey('User', related_name='schedule', on_delete=models.CASCADE, null=True, blank=True)
    day_name = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    course_name = models.CharField(max_length=50)
    course_number = models.CharField(max_length=30)
    
    # time_start and time_end will likely need more approriate
    # fields that will parse better with the front-end apps
    time_start = models.CharField(max_length=7)
    time_end = models.CharField(max_length=7)

    def __str__(self):
        return self.course_name

class FriendRequest(models.Model):
    from_user = models.IntegerField()
    to_user = models.IntegerField()
    pending = models.BooleanField(default=True)
    accepted = models.BooleanField(default=False)

# Leftover Day model, leaving here for now in case we need to rollback
# class Day(models.Model):
#     user = models.ForeignKey('User', related_name='schedule', on_delete=models.CASCADE, null=True, blank=True)
#     day_name = models.CharField(max_length=3, choices=DAYS_OF_WEEK)

#     def __str__(self):
#         return self.get_day_display()
