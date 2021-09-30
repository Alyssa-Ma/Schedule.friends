from rest_framework import serializers
from .models import Testing

class TestingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Testing
        fields = ('pk', 'name',)
