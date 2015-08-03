# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0003_auto_20150803_1713'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seguidores',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Siguiendo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='persona',
            name='seguidore',
        ),
        migrations.RemoveField(
            model_name='persona',
            name='siguiendo',
        ),
        migrations.AlterField(
            model_name='rutas',
            name='fk_persona_ru',
            field=models.ForeignKey(related_name='rutas', to='web.Persona'),
        ),
        migrations.AddField(
            model_name='siguiendo',
            name='fk_persona_si',
            field=models.ForeignKey(related_name='seguidos', to='web.Persona'),
        ),
        migrations.AddField(
            model_name='siguiendo',
            name='fk_siguiendo',
            field=models.ForeignKey(related_name='sigo', to='web.Persona'),
        ),
        migrations.AddField(
            model_name='seguidores',
            name='fk_persona',
            field=models.ForeignKey(related_name='seguidores', to='web.Persona'),
        ),
        migrations.AddField(
            model_name='seguidores',
            name='fk_seguidor',
            field=models.ForeignKey(related_name='+', to='web.Persona'),
        ),
    ]
