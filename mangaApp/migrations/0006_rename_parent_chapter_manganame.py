# Generated by Django 4.1 on 2022-08-22 08:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mangaApp', '0005_chapter_index'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chapter',
            old_name='parent',
            new_name='mangaName',
        ),
    ]
