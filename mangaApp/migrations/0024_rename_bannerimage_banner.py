# Generated by Django 4.1 on 2022-11-17 13:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mangaApp', '0023_bannerimage'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BannerImage',
            new_name='Banner',
        ),
    ]