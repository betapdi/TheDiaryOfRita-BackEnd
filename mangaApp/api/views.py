import zipfile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mangaApp.models import Manga, Chapter, Picture, FavouriteManga, Category
from .serializers import ChapterSerializer, MangaSerializer, PictureSerializer, FavouriteMangaSerializer, CategorySerializer
from django.core.files.images import ImageFile
from django.core.files.base import ContentFile
from django.core.files import File as DjangoFile
#safe = False mean can use data by any languages like queryset of python to json data


####### Customized Token Information #######
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['isSuperuser'] = user.is_superuser
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



####### Get Routes Of API #######
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api/',
        'GET /api/mangaApp/mangaList/',
        'POST /api/mangaApp/newManga/',
        'DELETE /api/mangaApp/:id/delete/',
        'GET /api/mangaApp/:id',
        '',
        'GET /api/mangaApp/:id/chapterList/',
        'POST /api/mangaApp/:id/chapter/upload/',
        'POST /api/mangaApp/:id/chapter/uploadMulti/',
        'GET /api/mangaApp/:id/:chapterId',
        '',
        'GET /api/mangaApp/favourites/',
        'POST /api/mangaApp/favourites/add/',
        'DELETE /api/mangaApp/favourites/remove/',
        '',
        'GET /api/mangaApp/categoryList/',
    ]
    
    return Response(routes)



####### Manga handling #######
@api_view(['GET'])
def getMangasList(request):
    mangas = Manga.objects.all()
    #many = True mean the object we use is the list of items, = False if single item
    serializer = MangaSerializer(mangas, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getMangaDetails(request, pk):
    manga = Manga.objects.get(id = pk)
    serializer = MangaSerializer(manga, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def addManga(request):
    data = request.data
    manga = Manga.objects.create(name = data['name'], description = data['description'])
    for item in data['categories']:
        category = Category.objects.get(name = item.label)
        manga.category_set.add(category)
    
    serializer = MangaSerializer(manga, many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteManga(request, pk):
    manga = Manga.objects.get(id = pk)
    manga.delete()
    return Response('Manga was deleted!!')



####### Chapter handling #######
@api_view(['GET'])
def getChapters(request, pk):
    manga = Manga.objects.get(id = pk)
    chapters = manga.chapter.all()
    serialzer = ChapterSerializer(chapters, many = True)
    return Response(serialzer.data)

@api_view(['GET'])
def getImages(request, pk, index):
    chapter = Chapter.objects.get(mangaName__id = pk, index = index)
    pictures = chapter.image.all()
    serializer = PictureSerializer(pictures, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def addChapter(request, pk):
    manga = Manga.objects.get(id = pk)
    chapter = Chapter.objects.create(mangaName = manga, chapterZipData = request.data['chapterZipData'], index = request.data['index'])
    handleUploadedChapter(chapter.chapterZipData, chapter)
    serializer = ChapterSerializer(chapter, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def addMultiChapters(request, pk):
    manga = Manga.objects.get(id = pk)
    handleUploadedMangaPackage(request.data['chapterZipData'], manga)
    chapters = Chapter.objects.filter(mangaName__id = pk)
    serializer = ChapterSerializer(chapters, many = True)
    return Response(serializer.data)

def handleUploadedMangaPackage(myZipFile, mangaName):                                                                                                 
    with zipfile.ZipFile(myZipFile, 'r') as data_zip:
        files = data_zip.namelist()
        for i in range(len(files)):
            chapterIndex = files[i] 
            chapterIndex = chapterIndex.replace('Chapter ', '')
            chapterIndex = int(chapterIndex.replace('.zip', ''))
            
            if Chapter.objects.filter(mangaName = mangaName, index = chapterIndex).exists(): 
                continue
            
            childZipData = DjangoFile(data_zip.open(files[i], mode = 'r'))
            Chapter.objects.create(mangaName = mangaName, chapterZipData = childZipData, index = chapterIndex)
            handleUploadedChapter(childZipData, Chapter.objects.latest('id'))

def handleUploadedChapter(myZipFile, chapterIndex):                                                                                                 
    with zipfile.ZipFile(myZipFile, 'r') as data_zip:
        files = data_zip.namelist()
        
        for i in range(len(files)):
            Picture.objects.create(chapter = chapterIndex, image = ImageFile(data_zip.open(files[i])))
            
            
            
            
####### Categories Handling #######
@api_view(['GET'])
def getCategoryList(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many = True)
    return Response(serializer.data)
    
            
            
            
####### Favourite Manga Handling #######
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFavouriteMangas(request):
    user = request.user
    favoMangas = user.favourMangas
    serializer = FavouriteMangaSerializer(favoMangas, many = False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFavouriteManga(request):
    user = request.user
    manga = Manga.objects.get(id = request.data['mangaId'])
    user.favourMangas.mangas.add(manga)
    
    favoMangas = user.favourMangas
    serializer = FavouriteMangaSerializer(favoMangas, many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeFavouriteManga(request):
    user = request.user
    manga = Manga.objects.get(id = request.data['mangaId'])
    user.favourMangas.mangas.remove(manga)
    
    favoMangas = user.favourMangas
    serializer = FavouriteMangaSerializer(favoMangas, many = False)
    return Response(serializer.data)
    
    