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

    def update(self, instance, validated_data):
        instance.day_name = validated_data.get('day_name', instance.day_name)
        instance.courses.set(validated.get('courses'))
        return instance
        
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
    
    # designed only to create a user, as whena  new user is made, they did not input a schedule yet
    def create(self, validated_data):
        schedule_data = validated_data.pop('schedule')
        user = User.objects.create(**validated_data)
        # if schedule_data:
        #     for schedule_dict in schedule_data:
        #         courses_data = schedule_dict.pop('courses')
        #         day = Day.objects.create(user=user, **schedule_dict)
        #         for courses_dict in courses_data:
        #             Course.objects.create(day=day, **courses_dict)
        return user

    # designed to only update info; ignores schedule field
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.password)
        # print(instance.schedule)
        # print(validated_data.get('schedule'))
        # instance.schedule.set(instance.schedule)
        instance.save()
        return instance
        