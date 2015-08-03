# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0006_auto_20150803_1746'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seguidores',
            name='fk_seguidor',
            field=models.ForeignKey(related_name='siguiendos', to='web.Persona'),
        ),
    ]
