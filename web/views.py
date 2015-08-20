from django.shortcuts import render, redirect
from django.shortcuts import render_to_response
from django.template.context_processors import csrf
from django.template import RequestContext
from web.models import *
from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse, HttpResponseForbidden
from django.core.serializers.json import *
from datetime import datetime, timedelta # Importar funciones para cálculo del tiempo
from daw import settings # Importar configuraciones del proyecto
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.conf import settings
# Create your views here.


class AutoLogout:
     def process_request(self, request):
        if not request.user.is_authenticated() :
         return
        try:
            if datetime.now() - request.session['last_touch'] > timedelta( 0, settings.AUTO_LOGOUT_DELAY * 60, 0):
                auth.logout(request) 
                del request.session['last_touch']
                print("hola")
                return
        except KeyError:
         pass
         request.session['last_touch'] = datetime.now() 
             
"""
class InactivityLogout(object):
     def process_request( self, request ):
        COOKIE_AGE = getattr(settings, 'SESSION_COOKIE_AGE', 15)
        if datetime.now() – request.session.get_expiry_date() < timedelta(seconds = COOKIE_AGE):
            request.session.set_expiry(datetime.now() + timedelta(seconds = COOKIE_AGE))
            return None
"""



def getSeguidores(request):
    if request.method == 'GET':
        personas = Persona.objects.all()
        mesiguen = Seguidores.objects.filter(fk_persona = personas[0])
        yosigo = Seguidores.objects.filter(fk_seguidor = personas[0])
        return render_to_response('seguidores.html',{'mesiguen':mesiguen})
def menu(request):
    c = {}
    c.update(csrf(request))
    return render_to_response('menu.html',c)

def inicio(request):
    c = {}
    c.update(csrf(request))
    return render_to_response('inicio.html',c)

    #GET ALL FOLLOWERS
def validar_sesion(request,usuario, contrasena):
    if request.method == 'GET':
        personas = Persona.objects.all()
        return render_to_response('inicio.js', {'personas': personas})

def login(request):
    #if not request.is_ajax() or request.method != 'GET':
    #    return
    try:
        username = request.POST['username']
        password = request.POST['password']
    except:
        return HttpResponseBadRequest('Bad parameters')



    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            # Correct password, and the user is marked "active"
            auth_login(request,user)

            response_content = {
                'username': user.username,
            }

            response =  HttpResponse(json.dumps(response_content))
            response['Content-Type'] = 'application/json; charset=utf-8'
            response['Cache-Control'] = 'no-cache'
            return redirect('/menu')
        else:
            # Return a 'disabled account' error message
            return render(request, 'inicio.html', {'error':'Usuario deshabilitado' , 'error2':'true'})
    else:
        # Return an 'invalid login' error message.
         return render(request, 'inicio.html', {'error':'Credenciales no encontradas' ,'error2':'true'})

#funcion que me valida quien logueo, retorna los datos de quien inicio sesion con el url cuenta
def home(request):
    usuario=request.user
    template = 'inicio.html'
    
    if usuario.is_authenticated():
        print(usuario.username)
        return render_to_response(
            'json/user.json',
            {'usuario': usuario}
            )        
    else:
        return render(request, template, {})

@login_required
def guardarRuta(request):
    if request.method == 'POST':
        from django.utils import timezone
        orig = request.POST.get('txtOrigen',None)
        dest = request.POST.get('txtDestino',None)
        user = request.user
        print(orig)
        print(dest)
        print(user.pk)
        if orig is not None and dest is not None:
            ruta = Ruta(origen= orig, destino= dest,fk_persona_ruta_id= user.pk )
            print(ruta)
            ruta.save()
            return HttpResponse('todo posi')

def obtenerRutas(request):
    if request.method == 'GET':
        routes = Ruta.objects.filter(fk_persona_ruta=request.user)
        response = render_to_response(
            'json/routes.json',
            {'routes': routes}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response


def obtenerUsuarios(request):
    if request.method == 'GET':
        
        users=User.objects.all()
        response = render_to_response(
            'json/users.json',
            {'users':users},
            context_instance=RequestContext(request)
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response

def obtenerSeguidores(request):
    if request.method == 'GET':
        seguidores = Seguidor.objects.all()
        listSeguidores = list()
        usuario=request.user
        if usuario.is_authenticated():
            for seg in seguidores:
                if seg.fk_persona==usuario:
                    listSeguidores.append(seg)
            response = render_to_response(
                'json/seguidores.json',
                {'seguidores':listSeguidores},
                context_instance=RequestContext(request)
            )
            response['Content-Type'] = 'application/json; charset=utf-8'
            response['Cache-Control'] = 'no-cache'
        return response

def obtenerSiguiendos(request):
    if request.method == 'GET':
        seguidores = Seguidor.objects.all()
        listSiguiendos = list()
        usuario=request.user
        print (usuario.username)
        if usuario.is_authenticated():
            for seg in seguidores:
                print("antes",seg.fk_persona)
                if seg.fk_seguidor==usuario:
                    listSiguiendos.append(seg)
                    print("seg: ",seg)
            print(listSiguiendos)
            response = render_to_response(
                'json/seguidores.json',
                {'seguidores':listSiguiendos},
                context_instance=RequestContext(request)
            )
            response['Content-Type'] = 'application/json; charset=utf-8'
            response['Cache-Control'] = 'no-cache'
        return response
		

