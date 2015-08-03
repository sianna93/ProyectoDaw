# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('usuario', models.CharField(unique=True, max_length=10)),
                ('apellido', models.CharField(max_length=30)),
                ('nombre', models.CharField(max_length=30)),
                ('iscarro', models.BooleanField(default=1)),
                ('placa', models.CharField(max_length=7, null=True)),
                ('seguidore', models.ManyToManyField(related_name='seguidores', to='web.Persona')),
                ('siguiendo', models.ManyToManyField(related_name='siguiendos', to='web.Persona')),
            ],
        ),
        migrations.CreateModel(
            name='Peticion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comentario', models.CharField(max_length=30)),
                ('fecha_pe', models.DateField()),
                ('fk_persona_pe', models.ForeignKey(related_name='peticiones', to='web.Persona')),
            ],
        ),
        migrations.CreateModel(
            name='Rutas',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('origen', models.CharField(max_length=30)),
                ('destino', models.CharField(max_length=30)),
                ('fecha', models.DateField()),
                ('fk_persona_ru', models.ForeignKey(to='web.Persona')),
            ],
        ),
    ]
