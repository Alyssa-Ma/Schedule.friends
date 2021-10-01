from rest_framework import serializers
from .models import User

class userSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'last_login', 
            'is_superuser',
            'date_joined',
            'first_name',
            'last_name',
            'email',
            'password'
            'schedule'
        )
