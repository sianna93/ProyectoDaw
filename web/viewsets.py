from web.models import *
from web.serializers import *
from rest_framework import viewsets
from rest_framework import filters
from rest_framework import generics

class PersonaViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    queryset = Persona.objects.all()

class RutaViewSet(viewsets.ModelViewSet):
    serializer_class = RutaSerializer
    queryset = Ruta.objects.all()

