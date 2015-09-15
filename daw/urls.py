"""daw URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from web.views import *
from django.contrib.auth.views import login, logout

from rest_framework import routers, serializers, viewsets

from web.viewsets import *
router = routers.DefaultRouter()
router.register(r'Persona', PersonaViewSet)
router.register(r'Ruta', RutaViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^ruta','web.views.guardarRuta'),
    url(r'^guardarPeticion','web.views.guardarPeticion'),
    url(r'^saveCoordenadas','web.views.guardarCoordenadas'),
    url(r'^misRutas','web.views.obtenerRutas'),
    url(r'^usuarios','web.views.obtenerUsuarios'),
    url(r'^cuenta', 'web.views.home'),
    url(r'^Rutas','web.views.obtenerTodasRutas'),
    url(r'^filtro_rutas','web.views.obtenerTodasRutas_filtro'),
    url(r'^coordenadas','web.views.obtenerCoordenadas'),
    url(r'^usuarios','web.views.obtenerUsuarios'),
    url(r'^nombres','web.views.getName'),               #webservices
    url(r'^todosSeguidores', 'web.views.obtenerTablaSeguidores'),
    url(r'^todosPeticiones', 'web.views.obtenerTodasPeticiones'),
    url(r'^filtro', 'web.views.obtenerTodasPeticiones_filtro'),
    url(r'^update', 'web.views.update_estado'),
    url(r'^seguidores', 'web.views.obtenerSeguidores'),
    url(r'^siguiendos', 'web.views.obtenerSiguiendos'),
    url(r'^busqueda', 'web.views.BuscarPer'),#para buscar una sola persona
    url(r'^filtrarNombres', 'web.views.filtrarNombres'),
    url(r'^$', 'web.views.inicio', name='inicio'),
    #url(r'^signup$', 'web.views.signup', name='signup'), #registrar nuevo usuario
    url(r'^login$', login, {'template_name': 'inicio.html', }, name="login"), #login con funcion de django
    url(r'^menu$', 'web.views.menu', name='menu'),
    url(r'^logout$', logout, {'template_name': 'inicio.html', }, name="logout"),  #cerrar sesion
    url(r'^datos', 'web.views.datos_person'),
    url(r'^chat$', include('daw.chat.urls')),
    url(r'^validaruser', 'web.views.existeUsuario'),
    url(r'^registrar', 'web.views.guardarUsuario'),
    url(r'^seguir','web.views.Seguir'),
    url(r'^registrar$', 'web.views.guardarUsuario',name="guardarUsuario"),#guarda usuario en la base
    url(r'^registro$', 'web.views.regis',name="regis"),#acceso a la pag registrar
    url(r'^noseguir','web.views.Dejar_de_seguir'),#para el views de dejar_de_seguir
    url(r'^api/', include(router.urls)),
    url(r'^cambiar','web.views.cambiar_estado'),#para el views de dejar_de_seguir
    url(r'^unapersona','web.views.obtener_una_person'),#obtener una persona
    url(r'^personaCarro','web.views.personaCarro'),#obtener una persona
    


]
