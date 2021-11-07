"""sf_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from sf_users import views
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    # GET and POST path for making a user
    # Accepts a ?query= parameter
    re_path(r'^api/sf_users/$', views.get_users_list),
    # POST path for making a user
    re_path(r'^api/sf_users/create$', views.create_user),
    # GET by ID, PATCH and DELETE path for a user with ID
    re_path(r'^api/sf_users/([0-9]+)$', views.users_detail),
    # GET entire schedule by user ID and POST path to make a new course
    re_path(r'^api/sf_users/([0-9]+)/schedule/$', views.schedule_list),
    # GET course by ID, PATCH and DELETE course by ID
    re_path(r'^api/sf_users/([0-9]+)/schedule/([0-9]+)$', views.schedule_detail),
    # GET All and POST FriendRequest
    re_path(r'^api/sf_users/friend_requests/$', views.fr_list),
    # GET by ID, PATCH, and DELETE friend request
    re_path(r'^api/sf_users/friend_requests/([0-9]+)$', views.fr_detail),
    # DELETE path that removes friend association between two users
    # It is set up that that first user ID (initiator) is unfriending from the second user ID
    re_path(r'^api/sf_users/([0-9]+)/remove/([0-9]+)$', views.remove_friend),
    # GET friend requests that are only to user by ID, in expanded form
    re_path(r'^api/sf_users/([0-9]+)/fr_to_user/$', views.get_fr_to_user),
    # GET friend requests that are only from user by ID, in expanded form
    re_path(r'^api/sf_users/([0-9]+)/fr_from_user/$', views.get_fr_from_user),
    # GET friend requests that are both to and from user by ID, in expanded form
    re_path(r'^api/sf_users/([0-9]+)/fr_with_user/$', views.get_fr_with_user),

    # User Auth Paths
    re_path(r'^api/sf_users/login', views.ObtainAuthTokenWithUser.as_view())
]
