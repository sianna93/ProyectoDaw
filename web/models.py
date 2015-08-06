from django.db import models

# Create your models here.


class Persona(models.Model):
    usuario = models.CharField(max_length=10, unique=True)
    password = models.CharField (max_length=10 , null= False)
    apellido = models.CharField(max_length=30)
    nombre = models.CharField(max_length=30)
    iscarro = models.BooleanField(default=1)
    placa = models.CharField(max_length=7 , null = True)

    def __unicode__(self):
        return self.usuario
   

                            
                                        
class Seguidor(models.Model):
    fk_persona = models.ForeignKey(Persona, related_name = 'seguidores')
    fk_seguidor = models.ForeignKey(Persona, related_name = 'siguiendos')

class Ruta(models.Model):
    origen = models.CharField(max_length=30)
    destino= models.CharField(max_length=30)
    fecha = models.DateField()
    fk_persona_ru = models.ForeignKey(Persona, related_name = 'rutas')


class Coordenada_geografica(models.Model):
    latitude = models.DecimalField( max_digits=10,decimal_places=10)
    longitude = models.DecimalField( max_digits=10,decimal_places=10)
    fk_ruta = models.ForeignKey(Ruta, related_name = 'coordenadas_rutas')

    
class Peticion(models.Model) :
    comentario = models.CharField(max_length=30)
    fecha_pe = models.DateField()
    fk_persona_ruta = models.ForeignKey(Persona, related_name = 'peticiones')
    fk_coordenada = models.ForeignKey(Coordenada_geografica, related_name = 'coordenada')                        





