from django.db import models
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
#from django.contrib.auth.models import AnonymousUser

# Create your models here.

    #def __unicode__(self):
    #    return self.usuario

class Persona (models.Model):
    is_carro = models.BooleanField(default=1)
    placa = models.CharField(max_length=7 , null = True, blank= True)
    fk_user = models.ForeignKey(User, related_name = 'personas')

class Seguidor(models.Model):
    fk_persona = models.ForeignKey(User, related_name = 'seguidores')
    fk_seguidor = models.ForeignKey(User, related_name = 'siguiendos')

class Ruta(models.Model):
    origen = models.CharField(max_length=30)
    destino= models.CharField(max_length=30)
    fecha = models.DateField(auto_now=True)
    fk_persona_ruta = models.ForeignKey(User, related_name = 'rutas')

class Coordenada_geografica(models.Model):
    latitude = models.DecimalField( max_digits=10,decimal_places=10)
    longitude = models.DecimalField( max_digits=10,decimal_places=10)
    fk_ruta = models.ForeignKey(Ruta, related_name = 'coordenadas_rutas')


class Peticion(models.Model):
    comentario = models.CharField(max_length=30)
    ubicacion_longitud = models.DecimalField( max_digits=10,decimal_places=10, null=True)
    ubicacion_latitude = models.DecimalField( max_digits=10,decimal_places=10, null=True)
    fecha_pe = models.DateField(auto_now=True)
    fk_persona_peticion = models.ForeignKey(User, related_name = 'peticiones')
    fk_pet_ruta = models.ForeignKey(Ruta, related_name = 'ruta', null=True)


