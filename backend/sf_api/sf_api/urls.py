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
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/sf_users/$', views.users_list),
    re_path(r'^api/sf_users/([0-9]+)$', views.users_detail),
    re_path(r'^api/sf_users/([0-9]+)/schedule/$', views.schedule_list)
    # re_path(r'^api/sf_users/([0-9]+)/schedule/$', views.courses_detail)
]
