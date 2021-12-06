from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    return 'profile_images/{id}/{filename}'.format(id=instance.id, filename=filename)

time_validator = RegexValidator(r'^([0-1][0-9]|2[0-3]):[0-5][0-9]$', "Time must be [00-24]:[00-59] input")

class User(AbstractUser):
    friend_list = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, default=None)
    friend_requests = models.ManyToManyField('FriendRequest', blank=True, default=None)
    profile_image = models.ImageField(_("Image"), upload_to=upload_to, blank=True, default=None)
    dark_mode = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username} (ID#: {self.id})"

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
    owner = models.ForeignKey('User', related_name='schedule', on_delete=models.CASCADE, blank=True, null=True, default=None)
    day_name = ArrayField(models.CharField(max_length=3, choices=DAYS_OF_WEEK), size=7)
    course_name = models.CharField(max_length=60)
    course_number = models.CharField(max_length=30)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    time_start = models.CharField(max_length=5, validators=[time_validator])
    time_end = models.CharField(max_length=5, validators=[time_validator])

    def __str__(self):
        return f"{self.course_number} - {self.course_name} for {self.owner}"

class FriendRequest(models.Model):
    from_user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='friend_requests_sent')
    to_user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='friend_requests_received')    
    pending = models.BooleanField(default=True)
    accepted = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['from_user', 'to_user'], name="unique_request")
        ]

    def __str__(self):
        return f'Friend Request from {self.from_user} to {self.to_user}'
