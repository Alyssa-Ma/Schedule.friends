from rest_framework import serializers
from .models import User
from .models import Day
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            "course_name",
            "course_number",
            "time_start",
            "time_end"
        )

class DaySerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many = True, allow_null = True)
    class Meta:
        model = Day
        fields = (
            "day_name",
            "courses"
        )
    
    def create(self, validated_data):
        courses_data = validated_data.pop('courses')
        day = Day.objects.create(**validated_data)
        for courses_data in courses_data:
            Course.objects.create(day=day, **courses_data)
        return day
        
class UserSerializer(serializers.ModelSerializer):
    schedule = DaySerializer(many = True, allow_null = True)
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'last_login', 
            'is_superuser',
            'date_joined',
            'first_name',
            'last_name',
            'email',
            'password',
            'schedule'
        )
    
    def create(self, validated_data):
        schedule_data = validated_data.pop('schedule')
        user = User.objects.create(**validated_data)
        for schedule_dict in schedule_data:
            courses_data = schedule_dict.pop('courses')
            day = Day.objects.create(user=user, **schedule_dict)
            for courses_dict in courses_data:
                Course.objects.create(day=day, **courses_dict)
        return user
