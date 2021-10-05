# Generated by Django 3.2.7 on 2021-10-05 08:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sf_users', '0009_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='day',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='sf_users.day'),
        ),
        migrations.AlterField(
            model_name='day',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='schedule', to=settings.AUTH_USER_MODEL),
        ),
    ]
