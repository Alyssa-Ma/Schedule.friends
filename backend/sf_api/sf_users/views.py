from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User
from .models import Course
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
        serializer = UserSerializer(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
                return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def schedule_detail(request, user_pk, course_pk):
    try:
        course = Course.objects.get(pk=course_pk)
    except course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data)

    # elif request.method == 'PATCH':
    #     serializer = UserSerializer(user, data=request.data, context={'request': request}, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method == 'DELETE':
    #     user.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
