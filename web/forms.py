from django import forms
from web.models import *
from django.forms import ModelForm
from django.contrib.auth.models import User




class SignUpForm(ModelForm):

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name']

        widgets = {
            'password': forms.PasswordInput(),
        }

class SignUpForm2(ModelForm):
    class Meta:
        model = Persona
        fields = ['is_carro','placa']

       