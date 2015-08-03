from django.shortcuts import render
from django.shortcuts import render_to_response
from web.models import *
# Create your views here.

def getSeguidores(request):
    if request.method == 'GET':
        personas = Persona.objects.all()
        mesiguen = Seguidores.objects.filter(fk_persona = personas[0])
        yosigo = Seguidores.objects.filter(fk_seguidor = personas[0])
        return render_to_response('seguidores.html',{'mesiguen':mesiguen})
def menu(request):
    pass
    #GET ALL FOLLOWERS 
