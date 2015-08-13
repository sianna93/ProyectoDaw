# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='peticion',
            name='fk_coordenada',
        ),
        migrations.AddField(
            model_name='peticion',
            name='fk_pet_ruta',
            field=models.ForeignKey(to='web.Ruta', null=True, related_name='ruta'),
        ),
        migrations.AddField(
            model_name='peticion',
            name='ubicacion_latitude',
            field=models.DecimalField(null=True, max_digits=10, decimal_places=10),
        ),
        migrations.AddField(
            model_name='peticion',
            name='ubicacion_longitud',
            field=models.DecimalField(null=True, max_digits=10, decimal_places=10),
        ),
        migrations.AlterField(
            model_name='peticion',
            name='fecha_pe',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='ruta',
            name='fecha',
            field=models.DateField(auto_now=True),
        ),
    ]
