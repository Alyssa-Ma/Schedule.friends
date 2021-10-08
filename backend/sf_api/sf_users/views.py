from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User
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

@api_view(['GET', 'PUT', 'DELETE'])
def users_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except user.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data,context={'request': request})
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
    if request.method == 'GET':
        try:
            user = User.objects.get(pk=pk)
        except user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DaySerializer(user.schedule, context={'request': request}, many=True)

        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(status=status.HTTP_201_CREATED)
            
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
