from django.db import models

# Create your models here.


class Persona(models.Model):
    usuario = models.CharField(max_length=10, unique=True)
    apellido = models.CharField(max_length=30)
    nombre = models.CharField(max_length=30)
    iscarro = models.BooleanField(default=1)
    placa = models.CharField(max_length=7 , null = True)

    def __unicode__(self):
        return self.usuario


class Seguidores(models.Model):
    fk_persona = models.ForeignKey(Persona, related_name = 'seguidores')
    fk_seguidor = models.ForeignKey(Persona, related_name = 'siguiendos')

class Siguiendo(models.Model):
    fk_persona_si = models.ForeignKey(Persona, related_name = 'seguidos')
    fk_siguiendo = models.ForeignKey(Persona, related_name = 'sigo')

class Rutas (models.Model):
    origen = models.CharField(max_length=30)
    destino= models.CharField(max_length=30)
    fecha = models.DateField()
    fk_persona_ru = models.ForeignKey(Persona, related_name = 'rutas')

class Peticion(models.Model) :
    comentario = models.CharField(max_length=30)
    fecha_pe = models.DateField()
    fk_persona_pe = models.ForeignKey(Persona, related_name = 'peticiones')





