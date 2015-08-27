from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http.response import HttpResponseRedirect
from django.template.context import RequestContext
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
import csv
from web.forms import SignUpForm, SignUpForm2


class AutoLogout:
     def process_request(self, request):
        if not request.user.is_authenticated() :
         return
        try:
            if datetime.now() - request.session['last_touch'] > timedelta( 0, settings.AUTO_LOGOUT_DELAY * 60, 0):
                auth.logout(request) 
                del request.session['last_touch']
                print ("holaaaaaaaaaaaa")
                return
        except KeyError:
         pass
         request.session['last_touch'] = datetime.now()


def getSeguidores(request):
    if request.method == 'GET':
        personas = Persona.objects.all()
        mesiguen = Seguidores.objects.filter(fk_persona = personas[0])
        yosigo = Seguidores.objects.filter(fk_seguidor = personas[0])
        return render_to_response('seguidores.html',{'mesiguen':mesiguen})


    #GET ALL FOLLOWERS
def validar_sesion(request,usuario, contrasena):
    if request.method == 'GET':
        personas = Persona.objects.all()
        return render_to_response('inicio.js', {'personas': personas})
"""
def login_s(request):
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
"""
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

def guardarCoordenadas(request):
     if request.method == 'POST':
        from django.utils import timezone
        punto_lat = request.POST.get('coord_lat',None)
        punto_long = request.POST.get('coord_long',None)
        user = request.user
        rutas = Ruta.objects.all()
        print("aqui:",Decimal(punto_lat))
        print(Decimal(punto_long))
        if punto_lat is not None and punto_long is not None:

            punto = Coordenada_geografica(latitude= Decimal(punto_lat), longitude= Decimal(punto_long),fk_ruta_id = rutas[len(rutas)-1].pk )
            print(punto)
            punto.save()
            return HttpResponse('Guardado con exito')

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



def BuscarPer(request):
    #nombre = 'sianna'
    if request.method == 'POST':
        nombre = request.POST.get('txtBuscar',None)
        users=User.objects.all()
        listUsers = list()
        for u in users:
            if u.first_name==nombre:
                listUsers.append(u)
                response = render_to_response(
                      'json/users.json',
                      {'users':listUsers},
            context_instance=RequestContext(request)
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response

def filtrarNombres(request):

    if request.method == 'GET':
        bsq=request.GET["q"]
        print("2-->",bsq)
        
        users=User.objects.filter(username__contains=bsq) 
        list_user=list()
        #users=User.objects.raw('SELECT * FROM auth_user WHERE auth_user.username LIKE ''%s'%'',[bsq])       
        print("3-->",users)
        #for u in users:
        #   list_user.append(u.username)
        #print(list_user)
        response = render_to_response(
            'json/buscar_amigo.json',
            {'users':users},
            context_instance=RequestContext(request)
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response

#funcion para registrar nuevosusuarios
def signup(request):
    if request.method == 'POST':  # If the form has been submitted...
        
        form = SignUpForm(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass
            
                      # Process the data in form.cleaned_data
            username1 = form.cleaned_data["username"]
            password1 = form.cleaned_data["password"]
 
            first_name = form.cleaned_data["first_name"]
            last_name = form.cleaned_data["last_name"]
 
           
            user = User.objects.create_user(username=username1, password=password1)
            user.first_name = first_name
            user.last_name = last_name
 
         
                     

            user.save()
            print(form.fields)
 
            

        form2= SignUpForm2(request.POST)  # A form bound to the POST data
        if form2.is_valid():  # All validation rules pass
            
                      # Process the data in form.cleaned_data
            is_carro1 = form2.cleaned_data["is_carro"]
            placa1 = form2.cleaned_data["placa"]
 
            usuarios= User.objects.all()

            
           
            persona = Persona(is_carro=is_carro1, placa=placa1, fk_user_id=usuarios[len(usuarios)-1].pk)                     

            persona.save()
 
            return HttpResponseRedirect(reverse('login'))  # Redirect after POST
    else:
        form = SignUpForm()
        form2= SignUpForm2()
 
    data = {
        'form': form,
        'form2': form2,
    }
    return render_to_response('registrarse.html', data, context_instance=RequestContext(request))

def inicio(request):
    return render_to_response('inicio.html', {}, context_instance=RequestContext(request))

@login_required()
def menu(request):
    return render_to_response('menu.html', {'user': request.user}, context_instance=RequestContext(request))
    
def datos_person(request):
    if request.method == 'GET':
        personas=Persona.objects.all()
        response = render_to_response(
            'json/person.json',
            {'personas':personas},
            context_instance=RequestContext(request)
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response
