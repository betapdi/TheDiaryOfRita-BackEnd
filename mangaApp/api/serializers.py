from rest_framework.serializers import ModelSerializer, SerializerMethodField
from mangaApp.models import Manga, Chapter, Picture, FavouriteManga, Category, Banner, DayViews
from django.db.models import Sum
import datetime

#Manga needed serializer
class MangaSerializer(ModelSerializer):
    class Meta:
        model = Manga
        fields = '__all__'
        
class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'index']
        
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
        views = DayViews.objects.get(manga = obj, currentDay = today).views
        return views
        
    def get_viewsWeek(self, obj):
        today = datetime.date.today()
        monday = today - datetime.timedelta(today.weekday())
        sunday = today + datetime.timedelta(7 - today.weekday() - 1)
        chosenDays = DayViews.objects.filter(currentDay__range = [monday, sunday])
        views = chosenDays.aggregate(totalViews = Sum('views'))
        return views['totalViews']
        
    def get_viewsMonth(self, obj):
        currentMonth = datetime.date.today().month
        views = DayViews.objects.filter(currentDay__month = currentMonth).aggregate(totalViews = Sum('views'))
        return views['totalViews']

    class Meta:
        model = Manga
        fields = '__all__'