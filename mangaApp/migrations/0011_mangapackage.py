# Generated by Django 4.1 on 2022-08-23 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mangaApp', '0010_alter_image_chapter'),
    ]

    operations = [
        migrations.CreateModel(
            name='MangaPackage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chapterZipData', models.FileField(null=True, upload_to='')),
                ('mangaName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mangaApp.manga')),
            ],
        ),
    ]
