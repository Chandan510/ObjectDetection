
from django.contrib import admin
from django.urls import path
from ObjectDetection import views

urlpatterns = [
    path('getframes/', views.Getframes.as_view(), name='getframes'),
    path('home/', views.Home.as_view(), name='home'),
    path('stopframes/', views.Stopframes.as_view(), name='stopframes'),
    path('getclassnames/', views.GetDetectedClass, name='getclassnames'),
    
]
