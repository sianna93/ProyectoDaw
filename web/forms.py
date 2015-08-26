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

        def save(self, commit=True):
            user = super(SignUpForm, self).save(commit=False)
            user.set_password(self.cleaned_data["password"])
            """
            user.username = form.cleaned_data["username"]
            user.password = form.cleaned_data["password"]
            user.first_name = form.cleaned_data["first_name"]
            user.last_name = form.cleaned_data["last_name"]
            user = User.objects.create_user(username, password)
            user.first_name = first_name
            user.last_name = last_name
            """
            if commit:
                user.save()
                return user
