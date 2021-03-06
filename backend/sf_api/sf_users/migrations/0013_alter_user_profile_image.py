# Generated by Django 3.2.7 on 2021-12-06 06:51

from django.db import migrations, models
import sf_users.models


class Migration(migrations.Migration):

    dependencies = [
        ('sf_users', '0012_alter_user_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(blank=True, default=None, max_length=150, null=True, upload_to=sf_users.models.upload_to),
        ),
    ]
