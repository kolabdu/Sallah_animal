# Install Django and Django REST framework
pip install django djangorestframework

# Create a Django project
django-admin startproject sacrificial_animals

# Create a Django app
cd sacrificial_animals
python manage.py startapp listings

# Define models (models.py)
from django.db import models

class Animal(models.Model):
    TYPE_CHOICES = [
        ('sheep', 'Sheep'),
        ('goat', 'Goat'),
        ('cow', 'Cow'),
        ('camel', 'Camel'),
    ]
    type = models.CharField(choices=TYPE_CHOICES, max_length=10)
    age = models.IntegerField()
    weight = models.FloatField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='animals/')
    description = models.TextField()
    
    def __str__(self):
        return f"{self.type} - {self.price}"

# Register the model in admin.py
from django.contrib import admin
from .models import Animal

admin.site.register(Animal)

# Create serializers (serializers.py)
from rest_framework import serializers
from .models import Animal

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'

# Create views (views.py)
from rest_framework import viewsets
from .models import Animal
from .serializers import AnimalSerializer

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

# Define URLs (urls.py)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnimalViewSet

router = DefaultRouter()
router.register(r'animals', AnimalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
