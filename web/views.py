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
from decimal import Decimal
import time

#funcion que
class AutoLogout:
     def process_request(self, request):
        if not request.user.is_authenticated() :
         return
        try:
            if datetime.now() - request.session['last_touch'] > timedelta( 0, settings.AUTO_LOGOUT_DELAY * 60, 0):
                auth.logout(request)
                del request.session['last_touch']
                print ("La sesion se ha cerrado por inactividad")
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
        origLat=request.POST.get('origLat',None)
        origLng=request.POST.get('origLng',None)
        dstgLat=request.POST.get('dstgLat',None)
        dstgLng=request.POST.get('dstgLng',None)
        user = request.user
        print(user.pk)
        if orig is not None and dest is not None:
            ruta = Ruta(origen= orig, origen_lt= Decimal(origLat), origen_lg=Decimal(origLng),destino= dest,destino_lt=Decimal(dstgLat),destino_lg=Decimal(dstgLng),fk_persona_ruta_id= user.pk )
            print("holaaa",ruta)
            ruta.save()
            return HttpResponse('todo posi')


@login_required
def guardarPeticion(request):
    if request.method == 'POST':
        from django.utils import timezone
        Rcomentario = request.POST.get('comentario',None)
        Rubicacion_longitud = request.POST.get('glongitud',None)
        Rubicacion_latitude=request.POST.get('glatitud',None)
        #Rfecha_pe=request.POST.get('gfecha',None)
        user = request.user
        #fk_pcomentarioersona_peticion =request.POST.get('dstgLat',None)
        Rfk_pet_ruta=request.POST.get('gruta',None)
        estadopeticion = request.POST.get('pestado',None)
        print(Rcomentario)
        print(Rubicacion_latitude)
        print(Rubicacion_longitud)
        #print(Rfecha_pe)
        print(Rfk_pet_ruta)
        print(user.pk)
        print(estadopeticion)

        miRuta=Ruta.objects.filter(id=Rfk_pet_ruta)
        print (miRuta[0].origen)
        AllRutas= Ruta.objects.all()

        if Rcomentario is not None :
            peticion = Peticion(comentario= Rcomentario, ubicacion_longitud= Decimal(Rubicacion_longitud), ubicacion_latitude=Decimal(Rubicacion_latitude),fk_persona_peticion= user,fk_pet_ruta= miRuta[0],estado= estadopeticion)
            print("holaaa",peticion)
            peticion.save()
            return HttpResponse('todo posi')

def Seguir(request):
    if request.method == 'POST':
        from django.utils import timezone
        Seguidor_conect = request.POST.get('seguidor',None)
        usuarios = User.objects.all()
        for u in usuarios:
            if u.username==Seguidor_conect:
                user_pk = u
        user = request.user
        print(Seguidor_conect,"soy el que va a seguir")
        print("hola user",user.pk)
        print("hola",user_pk.pk)
        if Seguidor is not None:
            vaseguir = Seguidor(fk_persona_id= user_pk.pk ,fk_seguidor_id = user.pk)
            print("holaaa",vaseguir)
            vaseguir.save()
            return HttpResponse('todo posi')


def Dejar_de_seguir(request):
    if request.method == 'POST':
        from django.utils import timezone
        Seguidor_conect = request.POST.get('seguidor',None)
        usuarios = User.objects.all()
        for u in usuarios:
            if u.username==Seguidor_conect:
                user_pk = u
        user = request.user
        print(Seguidor_conect,"soy el que va a seguir")
        print("hola user",user.pk)
        print("hola",user_pk.pk)
        if Seguidor_conect is not None:
            print('dddd')
            try:
                print(user_pk.id)
                print(user.id)
                dejar_seguirs = Seguidor.objects.all()
                for d in dejar_seguirs:
                    if d.fk_persona == user_pk and d.fk_seguidor == user:
                        dejar_seguir = d
                dejar_seguir.delete()
                print('ddddddd')
            except e:
                print(e)
            return HttpResponse('todo posi')
    return HttpResponseBadRequest('d')
    #return ender_to_response('menu.html', data, context_instance=RequestContext(request))


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

def obtenerCoordenadas(request):
    if request.method == 'GET':
        coordenadas = Coordenada_geografica.objects.all()
        response = render_to_response(
            'json/coordenadas.json',
            {'puntos': coordenadas}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response


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

def obtenerTodasRutas(request):
    if request.method == 'GET':
        routes = Ruta.objects.all()
        response = render_to_response(
            'json/routes.json',
            {'routes': routes}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response



def obtenerTodasRutas_filtro(request):
    import time
    tiempo = time.strftime("%Y-%m-%d")
    if request.method == 'GET':
        rutas = Ruta.objects.filter(fecha=tiempo)
        rutas_creadas= rutas.exclude(fk_persona_ruta=request.user)
        response = render_to_response(
            'json/Rutas_filter.json',
            {'routes_f': rutas_creadas}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response

def obtenerTodasRutas_Hoy(request):
    import time
    tiempo = time.strftime("%Y-%m-%d")
    if request.method == 'GET':
        rutas = Ruta.objects.filter(fecha=tiempo,fk_persona_ruta=request.user)
        response = render_to_response(
            'json/Rutas_filter.json',
            {'routes_f': rutas_creadas}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response

def update_estado(request):
    if request.method == 'POST':
        from django.utils import timezone
        id_peticion = request.POST.get('id_p',None)
        p_estado = request.POST.get('estado_p',None)
        print(id_peticion)
        print(p_estado)
        if id_peticion is not none :
            Peticion.objects.filter()
        return HttpResponse('todo posi')


def cambiar_estado(request):
    if request.method == 'POST':
        from django.utils import timezone
        id_peticion = request.POST.get('id_p',None)
        p_estado = request.POST.get('estado_p',None)
        print(id_peticion)
        print(p_estado)
        peticion = Peticion.objects.get(pk=id_peticion)
        print(peticion.estado)
        peticion.estado = p_estado
        peticion.save()
        return HttpResponse('todo posi')


def obtenerTodasPeticiones(request):
    if request.method == 'GET':
        peticiones = Peticion.objects.filter(fk_persona_peticion=request.user)
        response = render_to_response(
            'json/peticiones.json',
            {'peticiones': peticiones}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response


def obtenerTodasPeticiones_filtro(request):
    import time
    tiempo = time.strftime("%Y-%m-%d")
    if request.method == 'GET':
        usuario= request.user
        peticiones_f = Peticion.objects.filter(fecha_pe=tiempo)
        rutas= Ruta.objects.filter(fk_persona_ruta=usuario)
        list_peticion=list()
        for ruta in rutas:
            for p in peticiones_f:
                if(p.fk_pet_ruta==ruta):
                    list_peticion.append(p)

        response = render_to_response(
            'json/peticiones_filter.json',
            {'peticiones_f': list_peticion}
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response

def obtenerTodasPeticiones_filtro_Pendiente(request):
    import time
    tiempo = time.strftime("%Y-%m-%d")
    if request.method == 'GET':
        usuario= request.user
        peticiones_f = Peticion.objects.filter(fecha_pe=tiempo,estado='Pendiente')
        rutas= Ruta.objects.filter(fk_persona_ruta=usuario)
        list_peticion=list()
        for ruta in rutas:
            for p in peticiones_f:
                if(p.fk_pet_ruta==ruta):
                    list_peticion.append(p)

        response = render_to_response(
            'json/peticiones_filter.json',
            {'peticiones_f': list_peticion}
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

def obtenerTablaSeguidores(request):
    if request.method == 'GET':
        seguidores = Seguidor.objects.all()
        response = render_to_response(
            'json/seguidores.json',
            {'seguidores':seguidores},
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
        #NumSeguidores=len(listSeguidores)
        #print(NumSeguidores)
        return response

#pregunta si el fk_seguidor es igual al usuario osea si el seguidor soy yo entonces yo lo sigo
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
        #NumSiguiendos=len(listSiguiendos)
        #print(NumSiguiendos)
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
#funcion para registrar nuevosusuarios
existe=0
"""
def signup(request):
    #registra los valores Users
    usuarios=User.objects.all()
    if request.method == 'POST':  # If the form has been submitted...

        form = SignUpForm(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass

            # Process the data in form.cleaned_data
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            first_name = form.cleaned_data["first_name"]
            last_name = form.cleaned_data["last_name"]

            user = User.objects.create_user(username=username, password=password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            print(form.fields)

        #registra los valores de placa y si tiene carro
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

"""
def existeUsuario(request):
    #registra los valores Users
    usuarios=User.objects.all()
    if request.method == 'POST':  # If the form has been submitted...

        form = SignUpForm(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass

            # Process the data in form.cleaned_data
            username1 = form.cleaned_data["username"]

            existe=0
            for u in usuarios:
                if u.username == username1:
                    existe=1
                    break

            response = render_to_response(
                'json/validar.json',
                {'existe':existe},
                context_instance=RequestContext(request)
                )
            response['Content-Type'] = 'application/json; charset=utf-8'
            response['Cache-Control'] = 'no-cache'
            return response

def guardarUsuario(request):
    #registra los valores Users
    usuarios=User.objects.all()
    if request.method == 'POST':
        from django.utils import timezone
        try:
            nickname = request.POST.get('username',None)
            nombre = request.POST.get('first_name',None)
            apellido=request.POST.get('last_name',None)
            contraseña=request.POST.get('password',None)
            carro=str(request.POST.get('is_carro',':checked'))
            placa=request.POST.get('placa',None)
            if nickname is not None and contraseña is not None:
                user = User.objects.create_user(username=nickname, password=contraseña, first_name=nombre, last_name=apellido)
        except:
            #si no se registra correctamente el usuario se queda en la misma pagina de regisstrar
            return HttpResponseRedirect(reverse('regis')) 
        user.save()
        #Se guarda la persona  con los datos de placa y si tiene o no carro
        usuarios= User.objects.all()
        if carro == "si":
            carro_valor = 1
        else:
            carro_valor = 0
        persona = Persona(is_carro=carro_valor, placa=placa, fk_user_id=usuarios[len(usuarios)-1].pk)
        persona.save()

    return render_to_response('inicio.html',{}, context_instance=RequestContext(request))


def inicio(request):
    return render_to_response('inicio.html', {}, context_instance=RequestContext(request))

def regis(request):
    return render_to_response('registrarse.html', {}, context_instance=RequestContext(request))


@login_required()
def menu(request):
    return render_to_response('menu.html', {'user': request.user}, context_instance=RequestContext(request))

def obtener_una_person(request):

    if request.method == 'GET':
        persona=Persona.objects.filter(fk_user= request.user)
        response = render_to_response(
            'json/person.json',
            {'personas':persona},
            context_instance=RequestContext(request)
        )
        response['Content-Type'] = 'application/json; charset=utf-8'
        response['Cache-Control'] = 'no-cache'
        return response

def personaCarro(request):
    person=Persona.objects.filter(fk_user_id=request.user)
    return render(request,'menu.html',{'carro_persona':person[0].is_carro})

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

def getRuta_Usuarios(request) :
    import time
    tiempo = time.strftime("%Y-%m-%d")
    if request.method=='GET':
       user=request.GET.get("username")
       print("USER RECIBIDO",user)
       usuario = User.objects.filter(username=user)
       print("miUsuario", usuario[0].username)
       rutas= Ruta.objects.filter(fk_persona_ruta=usuario[0].pk, fecha=tiempo)
       print("miUsuario", usuario[0].username)
       print("rutas",rutas)
       response = render_to_response(
            'json/routes.json',
            {'routes':rutas},
            context_instance=RequestContext(request)
        )
       response['Content-Type'] = 'application/json; charset=utf-8'
       response['Cache-Control'] = 'no-cache'
       return response


#FUNCION QUE CONSUME EL WEB SERVICES DE LA ESPOL
def getName(request) :
    if request.method=='GET':
       user=request.GET.get("user_n")
       print(user)
       from suds.xsd.doctor import ImportDoctor, Import
       from suds.client import Client
       url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL'
       imp = Import('http://www.w3.org/2001/XMLSchema')
       imp.filter.add('http://tempuri.org/')
       doctor = ImportDoctor(imp)
       client = Client(url, doctor=doctor)
       auth = client.service
   #debes revisar el dato ye ir viendo los datos para sacar la informacion

       datos = auth.wsInfoUsuario(user).diffgram[0][0]
       response = render_to_response(
            'json/nombre.json',
            {'datos':datos},
            context_instance=RequestContext(request)
        )
       response['Content-Type'] = 'application/json; charset=utf-8'
       response['Cache-Control'] = 'no-cache'
       return response
