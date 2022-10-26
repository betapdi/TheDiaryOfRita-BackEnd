from rest_framework.serializers import ModelSerializer
from mangaApp.models import Manga, Chapter, Picture, FavouriteManga

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
        


#Manga optional serializer
class FavouriteMangaSerializer(ModelSerializer):
    class Meta:
        model = FavouriteManga
        fields = '__all__'