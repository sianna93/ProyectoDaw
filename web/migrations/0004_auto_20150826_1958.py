# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0003_auto_20150824_0139'),
    ]

    operations = [
        migrations.AlterField(
            model_name='persona',
            name='is_carro',
            field=models.BooleanField(default=0),
        ),
    ]
