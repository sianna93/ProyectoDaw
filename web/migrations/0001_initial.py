# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Coordenada_geografica',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('latitude', models.DecimalField(max_digits=10, decimal_places=10)),
                ('longitude', models.DecimalField(max_digits=10, decimal_places=10)),
            ],
        ),
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('is_carro', models.BooleanField(default=1)),
                ('placa', models.CharField(max_length=7, null=True, blank=True)),
                ('fk_user', models.ForeignKey(related_name='personas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Peticion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comentario', models.CharField(max_length=30)),
                ('fecha_pe', models.DateField()),
                ('fk_coordenada', models.ForeignKey(related_name='coordenada', to='web.Coordenada_geografica')),
                ('fk_persona_peticion', models.ForeignKey(related_name='peticiones', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ruta',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('origen', models.CharField(max_length=30)),
                ('destino', models.CharField(max_length=30)),
                ('fecha', models.DateField()),
                ('fk_persona_ruta', models.ForeignKey(related_name='rutas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Seguidor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fk_persona', models.ForeignKey(related_name='seguidores', to=settings.AUTH_USER_MODEL)),
                ('fk_seguidor', models.ForeignKey(related_name='siguiendos', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='coordenada_geografica',
            name='fk_ruta',
            field=models.ForeignKey(related_name='coordenadas_rutas', to='web.Ruta'),
        ),
    ]
