# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_auto_20150813_2202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coordenada_geografica',
            name='latitude',
            field=models.DecimalField(decimal_places=7, max_digits=11),
        ),
        migrations.AlterField(
            model_name='coordenada_geografica',
            name='longitude',
            field=models.DecimalField(decimal_places=7, max_digits=11),
        ),
    ]
