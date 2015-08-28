# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import swampdragon.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Coordenada_geografica',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('latitude', models.DecimalField(decimal_places=7, max_digits=11)),
                ('longitude', models.DecimalField(decimal_places=7, max_digits=11)),
            ],
        ),
        migrations.CreateModel(
            name='Foo',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=100)),
            ],
            bases=(swampdragon.models.SelfPublishModel, models.Model),
        ),
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('is_carro', models.BooleanField(default=0)),
                ('placa', models.CharField(blank=True, max_length=7, null=True)),
                ('fk_user', models.ForeignKey(related_name='personas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Peticion',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('comentario', models.CharField(max_length=50)),
                ('ubicacion_longitud', models.DecimalField(decimal_places=10, max_digits=10, null=True)),
                ('ubicacion_latitude', models.DecimalField(decimal_places=10, max_digits=10, null=True)),
                ('fecha_pe', models.DateField(auto_now=True)),
                ('fk_persona_peticion', models.ForeignKey(related_name='peticiones', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ruta',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('origen', models.CharField(max_length=30)),
                ('origen_lt', models.DecimalField(decimal_places=7, max_digits=11)),
                ('origen_lg', models.DecimalField(decimal_places=7, max_digits=11)),
                ('destino', models.CharField(max_length=30)),
                ('destino_lt', models.DecimalField(decimal_places=7, max_digits=11)),
                ('destino_lg', models.DecimalField(decimal_places=7, max_digits=11)),
                ('fecha', models.DateField(auto_now=True)),
                ('fk_persona_ruta', models.ForeignKey(related_name='rutas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Seguidor',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('fk_persona', models.ForeignKey(related_name='seguidores', to=settings.AUTH_USER_MODEL)),
                ('fk_seguidor', models.ForeignKey(related_name='siguiendos', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='peticion',
            name='fk_pet_ruta',
            field=models.ForeignKey(related_name='ruta', to='web.Ruta', null=True),
        ),
        migrations.AddField(
            model_name='coordenada_geografica',
            name='fk_ruta',
            field=models.ForeignKey(related_name='coordenadas_rutas', to='web.Ruta'),
        ),
    ]
