from rest_framework.serializers import ModelSerializer, SerializerMethodField
from mangaApp.models import Manga, Chapter, Picture, FavouriteManga, Category, Banner, DayViews, Album, MangaUserRating
from django.db.models import Sum
from rest_framework import serializers
import datetime

#Manga needed serializer
class MangaSerializer(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many = True)
    class Meta:
        model = Manga
        fields = ['id', 'name', 'description', 'cover', 'views', 'favourites', 'totalStars', 'totalVotes', 'created', 'updated', 'categories']
        
class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'index', 'title']
        
class PictureSerializer(ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'image']
        
class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class BannerSerializer(ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'

#Manga optional serializer
class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'name', 'mangaList']

class FavouriteMangaSerializer(ModelSerializer):
    mangaList = SerializerMethodField()

    def get_mangaList(self, obj):
        return MangaSerializer(Manga.objects.filter(favourMangas = obj), many = True).data

    class Meta:
        model = FavouriteManga
        fields = ['id', 'user', 'mangaList']
        

class MangaRankingSerializer(ModelSerializer):
    viewsDay = SerializerMethodField()
    viewsWeek = SerializerMethodField()
    viewsMonth = SerializerMethodField()

    def get_viewsDay(self, obj):
        today = datetime.date.today()

        if DayViews.objects.filter(manga = obj, currentDay = today).exists():
            views = DayViews.objects.get(manga = obj, currentDay = today).views
            return views

        return 0
        
    def get_viewsWeek(self, obj):
        today = datetime.date.today()
        monday = today - datetime.timedelta(today.weekday())
        sunday = today + datetime.timedelta(7 - today.weekday() - 1)

        if DayViews.objects.filter(manga = obj, currentDay__range = [monday, sunday]).exists():
            chosenDays = DayViews.objects.filter(manga = obj, currentDay__range = [monday, sunday])
            views = chosenDays.aggregate(totalViews = Sum('views'))
            return views['totalViews']
        
        return 0
        
    def get_viewsMonth(self, obj):
        currentMonth = datetime.date.today().month
        
        if DayViews.objects.filter(manga = obj, currentDay__month = currentMonth).exists():
            chosenDays = DayViews.objects.filter(manga = obj, currentDay__month = currentMonth)
            views = chosenDays.aggregate(totalViews = Sum('views'))
            return views['totalViews']

        return 0

    class Meta:
        model = Manga
        fields = '__all__'

class MangaUserRatingSerializer(ModelSerializer):
    class Meta:
        model = MangaUserRating
        fields = ['id', 'rating']