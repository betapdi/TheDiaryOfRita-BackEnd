from rest_framework.serializers import ModelSerializer, SerializerMethodField
from mangaApp.models import Manga, Chapter, Picture, FavouriteManga, Category, Banner

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