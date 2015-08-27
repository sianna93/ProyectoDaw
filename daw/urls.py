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


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^menu','web.views.menu'),
    #url(r'^inicio','web.views.inicio'),
    #url(r'^login','web.views.login'),
    url(r'^ruta','web.views.guardarRuta'),
    url(r'^coordenadas','web.views.guardarCoordenadas'),
    url(r'^misRutas','web.views.obtenerRutas'),
    url(r'^usuarios','web.views.obtenerUsuarios'),
    url(r'^cuenta', 'web.views.home'),
    url(r'^seguidores', 'web.views.obtenerSeguidores'),
    url(r'^siguiendos', 'web.views.obtenerSiguiendos'),
    url(r'^busqueda', 'web.views.BuscarPer'),#para buscar una sola persona
    url(r'^filtrarNombres', 'web.views.filtrarNombres'),
    
    url(r'^$', 'web.views.inicio', name='inicio'),
    url(r'^signup$', 'web.views.signup', name='signup'), #registrar nuevo usuario
    url(r'^login$', login, {'template_name': 'inicio.html', }, name="login"), #login con funcion de django
    url(r'^menu$', 'web.views.menu', name='menu'), 
    url(r'^logout$', logout, {'template_name': 'inicio.html', }, name="logout"),  #cerrar sesion
    url(r'^datos', 'web.views.datos_person')
  
    
	
]
