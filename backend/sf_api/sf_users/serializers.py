from enum import unique
from rest_framework import serializers
from .models import User
from .models import Course
from .models import FriendRequest
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.exceptions import ValidationError

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course

    # Show all fields
        # fields = '__all__'
         
    # Select which fields to accept/return
        fields = (
            "id",
            "day_name",
            "course_name",
            "course_number",
            "time_start",
            "time_end",
            # "date_created",
            # "dated_modified",
            "owner"
        )

    def create(self, validated_data):
        if validated_data['time_start'] == validated_data['time_end']:
            raise ValidationError({
                    'non_field_errors': ["time_start and time_end cannot be the same time"]}, code=unique) 
        elif int(validated_data['time_start'].replace(':', '')) > int(validated_data['time_end'].replace(':', '')):
            raise ValidationError({
                    'non_field_errors': ["time_start cannot happen after time_end"]}, code=unique) 
        course = Course.objects.create(**validated_data)
        return course
    
    def update(self, instance, validated_data):
        print(validated_data)
        if validated_data['time_start'] == validated_data['time_end']:
            raise ValidationError({
                    'non_field_errors': ["time_start and time_end cannot be the same time"]}, code=unique) 
        elif int(validated_data['time_start'].replace(':', '')) > int(validated_data['time_end'].replace(':', '')):
            raise ValidationError({
                    'non_field_errors': ["time_start cannot happen after time_end"]}, code=unique)
        instance.day_name = validated_data.get('day_name', instance.day_name)
        instance.course_name = validated_data.get('course_name', instance.course_name)
        instance.course_number = validated_data.get('course_number', instance.course_number) 
        instance.time_start = validated_data.get('time_start', instance.time_start)
        instance.time_end = validated_data.get('time_end', instance.time_end)
        instance.save()
        return instance

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest

    # Show all fields
        # fields = '__all__'
         
    # Select which fields to accept/return
        fields = (
            "id",
            "from_user",
            "to_user",
            "pending",
            "accepted",
            # "date_created",
            # "dated_modified"
        )
        validators = [
            UniqueTogetherValidator(
                queryset=FriendRequest.objects.all(),
                fields=['to_user', 'from_user']
            )
        ]

    def create(self, validated_data):
        try:
            if validated_data['to_user'] == validated_data['from_user']:
                raise ValidationError({
                    'non_field_errors': ["The fields to_user and from_user cannot be the same value."]}, code=unique) 
            elif FriendRequest.objects.get(from_user=validated_data['to_user'], to_user=validated_data['from_user']):
                raise ValidationError({
                    'non_field_errors': ["The fields from_user, to_user must make a unique set."]}, code=unique) 
        except FriendRequest.DoesNotExist:
            friend_request = FriendRequest.objects.create(**validated_data)
            return friend_request

    def update(self, instance, validated_data):
        instance.from_user = validated_data.get('from_user', instance.from_user)
        instance.to_user = validated_data.get('to_user', instance.to_user)
        instance.pending = validated_data.get('pending', instance.pending)
        instance.accepted = validated_data.get('accepted', instance.accepted)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    schedule = CourseSerializer(many = True, allow_null = True)
    class Meta:
        model = User

    # Show all fields
        # fields = '__all__'
         
    # Select which fields accept/return
        fields = (
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            # "date_joined",
            # "last_login",
            "is_superuser",
            # "is_staff",
            # "is_active",
            # "groups",
            # "user_permissions",
            "schedule",
            "friend_list",
            "friend_requests",
            "profile_image",
            "dark_mode"
        )

    # Prevents password from returning in JSON
        extra_kwargs = {'password': {'write_only': True}}

    # designed only to create a user, as when a new user is made, they did not input a schedule yet
    def create(self, validated_data):
        validated_data.pop('schedule')
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data["password"])
        return user

    def update(self, instance, validated_data):
        # Creates a new course into schedule if included in validated data
        if 'schedule' in validated_data:
            schedule_data = validated_data.pop('schedule')
            for schedule_dict in schedule_data:
                Course.objects.create(owner=instance, **schedule_dict)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.password)
        instance.email = validated_data.get('email', instance.email)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.dark_mode = validated_data.get('dark_mode', instance.dark_mode)
        instance.save()
        return instance
