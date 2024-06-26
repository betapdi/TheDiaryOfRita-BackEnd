# Generated by Django 4.1 on 2022-11-24 04:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mangaApp', '0026_manga_likes_manga_totalstars_manga_totalvotes_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MangaReadingHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lastRead', models.DateTimeField(auto_now=True)),
                ('manga', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mangaApp.manga')),
            ],
        ),
        migrations.CreateModel(
            name='ReadingStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mangas', models.ManyToManyField(through='mangaApp.MangaReadingHistory', to='mangaApp.manga')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='readingHistory', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='mangareadinghistory',
            name='readingHistory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mangaApp.readingstatus'),
        ),
    ]
