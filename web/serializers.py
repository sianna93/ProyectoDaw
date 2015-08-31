from swampdragon.serializers.model_serializer import ModelSerializer
from web.models import *

from rest_framework import serializers
class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        depth = 1
        field = ('is_carro','placa','fk_user')
class RutaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ruta
        depth = 1
        field = ('origen','origen_lt','origen_lg','destino','destino_lt','destino_lg','fecha','fk_persona_ruta')

class FooSerializer(ModelSerializer):
    class Meta:
        model = 'web.Foo'
        publish_fields = ('text', )
        update_fields = ('text', )
