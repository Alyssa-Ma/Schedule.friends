from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

class User(AbstractUser):
    friend_list = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, default=None)
    friend_requests = models.ManyToManyField('FriendRequest', blank=True, default=None)

    def __str__(self):
        return self.username

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
    user = models.ForeignKey('User', related_name='schedule', on_delete=models.CASCADE, blank=True, null=True, default=None)
    day_name = ArrayField(models.CharField(max_length=3, choices=DAYS_OF_WEEK), size=7)
    course_name = models.CharField(max_length=50)
    course_number = models.CharField(max_length=30)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    
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
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'From {self.from_user} to {self.to_user}'

# Leftover Day model, leaving here for now in case we need to rollback
# class Day(models.Model):
#     user = models.ForeignKey('User', related_name='schedule', on_delete=models.CASCADE, null=True, blank=True)
#     day_name = models.CharField(max_length=3, choices=DAYS_OF_WEEK)

#     def __str__(self):
#         return self.get_day_display()
