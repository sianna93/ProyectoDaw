# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='persona',
            name='seguidore',
            field=models.ManyToManyField(related_name='seguidores', null=True, to='web.Persona'),
        ),
        migrations.AlterField(
            model_name='persona',
            name='siguiendo',
            field=models.ManyToManyField(related_name='siguiendos', null=True, to='web.Persona'),
        ),
    ]
