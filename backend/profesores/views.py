from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Profesor
from .serializers import ProfesorSerializer

class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer
