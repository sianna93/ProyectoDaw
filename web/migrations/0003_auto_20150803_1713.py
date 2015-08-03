# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_auto_20150803_1711'),
    ]

    operations = [
        migrations.AlterField(
            model_name='persona',
            name='seguidore',
            field=models.ManyToManyField(related_name='seguidores', to='web.Persona', blank=True),
        ),
        migrations.AlterField(
            model_name='persona',
            name='siguiendo',
            field=models.ManyToManyField(related_name='siguiendos', to='web.Persona', blank=True),
        ),
    ]
