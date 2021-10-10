from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User
from .models import Course
from .models import FriendRequest
from .serializers import *

# Users request methods
@api_view(['GET', 'POST'])
def users_list(request):
    if request.method == 'GET':
        data = User.objects.all()
        serializer = UserSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH', 'DELETE'])
def users_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except user.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PATCH':
        print("USER PATCH method called")
        serializer = UserSerializer(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ======================================

# Schedule request methods
@api_view(['GET', 'POST'])
def schedule_list(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except user.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CourseSerializer(user.schedule, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        course_serializer = CourseSerializer(data=request.data)
        if course_serializer.is_valid():
            user_obj = {
                'schedule': [request.data]
            }
            user_serializer = UserSerializer(user, data=user_obj, context={'request': 'PATCH'}, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH', 'DELETE'])
def schedule_detail(request, user_pk, course_pk):
    try:
        course = Course.objects.get(pk=course_pk)
    except course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = CourseSerializer(course, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def fr_list(request):
    if request.method == 'GET':
        data = FriendRequest.objects.all()
        serializer = FriendRequestSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        try:
            from_user = User.objects.get(pk=request.data['from_user'])
        except from_user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            to_user = User.objects.get(pk=request.data['to_user'])
        except to_user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
       
        fr_serializer = FriendRequestSerializer(data=request.data)
        if fr_serializer.is_valid():
            fr_serializer.save()
            from_user.friend_requests.add(fr_serializer.data['id'])
            from_user.save()
            to_user.friend_requests.add(fr_serializer.data['id'])
            to_user.save()
            return Response(status=status.HTTP_201_CREATED) 
        return Response(fr_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH', 'DELETE'])
def fr_detail(request, pk):
    try:
        friend_request = FriendRequest.objects.get(pk=pk)
    except friend_request.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FriendRequestSerializer(friends_request, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PATCH':
        fr_serializer = FriendRequestSerializer(friend_request, data=request.data, context={'request': request}, partial=True)
        if fr_serializer.is_valid():
            fr_serializer.save()
            if fr_serializer.data['accepted']:
                try:
                    from_user = User.objects.get(pk=fr_serializer.data['from_user'])
                except from_user.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                try:
                    to_user = User.objects.get(pk=fr_serializer.data['to_user'])
                except to_user.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)

                from_user.friend_list.add(to_user.id)
                to_user.friend_list.add(from_user.id)
            friend_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        friend_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
