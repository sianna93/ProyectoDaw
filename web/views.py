from django.shortcuts import render, redirect
from django.shortcuts import render_to_response
from django.template.context_processors import csrf
from web.models import *
from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse, HttpResponseForbidden
from django.core.serializers.json import *

from django.contrib.auth.decorators import login_required
# Create your views here.

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
        routes = Ruta.objects.all()
        response = render_to_response(
            'json/routes.json',
            {'routes': routes}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response



