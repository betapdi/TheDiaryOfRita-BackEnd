# Generated by Django 4.1 on 2022-08-22 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mangaApp', '0004_chapter_images_delete_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='index',
            field=models.IntegerField(default=0),
        ),
    ]
