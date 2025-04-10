import zipfile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from mangaApp.models import Manga, Chapter, Picture, FavouriteManga, Category, Banner, DayViews, Album, MangaUserRating
from .serializers import BannerSerializer, ChapterSerializer, MangaSerializer, PictureSerializer, FavouriteMangaSerializer, CategorySerializer, MangaRankingSerializer, AlbumSerializer, MangaUserRatingSerializer
from django.core.files.images import ImageFile
from django.core.files import File as DjangoFile

#safe = False mean can use data by any languages like queryset of python to json data



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
        'GET /api/mangaApp/:id/:chapterId/',
        'DELETE /api/mangaApp/:id/:chapterId/delete/'
        '',
        'GET /api/mangaApp/favourites/',
        'POST /api/mangaApp/favourites/add/',
        'DELETE /api/mangaApp/favourites/remove/',
        '',
        'GET /api/mangaApp/categoryList/',
        '',
        'Get /api/mangaApp/bannerList/',
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
    manga = Manga.objects.create(name = data['mangaName'], description = data['description'], cover = data['cover_image'])
    for item in data.getlist('categories'):
        category = Category.objects.get(id = item)
        manga.categories.add(category)
    
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
def getImages(request, pk, chapterId):
    chapter = Chapter.objects.get(mangaName__id = pk, id = chapterId)
    pictures = chapter.image.all()
    serializer = PictureSerializer(pictures, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def addChapter(request, pk):
    manga = Manga.objects.get(id = pk)
    manga.save()
    chapter = Chapter.objects.create(mangaName = manga, chapterZipData = request.data['chapterData'], index = request.data['chapterId'])
    handleUploadedChapter(chapter.chapterZipData, chapter)
    serializer = ChapterSerializer(chapter, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def addMultiChapters(request, pk):
    manga = Manga.objects.get(id = pk)
    manga.save()
    handleUploadedMangaPackage(request.data['chapterData'], manga)
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
            
            childZipData = DjangoFile(data_zip.open(files[i], mode = 'r'))
            
            try:
                chapter = Chapter.objects.get(mangaName = mangaName, index = chapterIndex)
            except Chapter.DoesNotExist:
                Chapter.objects.create(mangaName = mangaName, chapterZipData = childZipData, index = chapterIndex)
                
            handleUploadedChapter(childZipData, Chapter.objects.latest('id'))

def handleUploadedChapter(myZipFile, chapterIndex):                                                                                                 
    with zipfile.ZipFile(myZipFile, 'r') as data_zip:
        files = data_zip.namelist()
        
        for i in range(len(files)):
            Picture.objects.create(chapter = chapterIndex, image = ImageFile(data_zip.open(files[i])))

@api_view(['DELETE'])
def deleteChapter(request, pk, chapterId):
    chapter = Chapter.objects.get(mangaName__id = pk, id = chapterId)
    chapter.delete()
    return Response('Chapter was deleted!')
            
            
            
            
####### Categories Handling #######
@api_view(['GET'])
def getCategoryList(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def addCategory(request):
    category, created = Category.objects.get_or_create(name = request.data['name'])
    serializer = CategorySerializer(category, many = False)
    return Response(serializer.data)
    
    
    
    
####### Banner Handling #######       
@api_view(['GET'])
def getBannerList(request):
    bannerList = Banner.objects.all()
    serializer = BannerSerializer(bannerList, many = True)
    return Response(serializer.data)
       
       
    
       
####### Albums Handling #######
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAlbums(request):
    user = request.user
    albumList = user.albums.all()
    serializer = AlbumSerializer(albumList, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAlbumMangaList(request, albumId):
    user = request.user
    album = user.albums.get(pk = albumId)
    mangaList = album.mangaList.all()
    serializer = MangaSerializer(mangaList, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createAlbum(request):
    user = request.user
    data = request.data
    newAlbum, created = Album.objects.get_or_create(name = data['name'], user = user)
    
    serializer = AlbumSerializer(newAlbum, many = False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addAlbumManga(request, albumId, mangaId):
    user = request.user
    album = user.albums.get(pk = albumId)
    manga = Manga.objects.get(pk = mangaId)
    
    #Favourite List
    if albumId == user.albums.get(name = "Favourites"): 
        manga.favourites += 1
        
    album.mangaList.add(manga)
    serializer = AlbumSerializer(album, many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAlbum(request, albumId):
    user = request.user
    album = user.albums.get(pk = albumId)
    
    #Only Favourite can't be deleted
    if (album.name != "Favourites"):
        album.delete()
    
    serializer = AlbumSerializer(user.albums, many = True)
    return Response(serializer.data)  

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeAlbumManga(request, albumId, mangaId):
    user = request.user
    album = user.albums.get(pk = albumId)
    manga = album.mangaList.get(pk = mangaId)
    
    album.mangaList.remove(manga)
    
    #Favourites
    if (album.name == "Favourites"):
        manga.favourites -= 1
    
    serializer = AlbumSerializer(album, many = False)
    return Response(serializer.data)     
            
            
            
####### Favourite Handling #######
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
    Manga.objects.filter(id = request.data['mangaId']).update(favourites = manga.favourites + 1)
    user.favourMangas.mangas.add(manga)
    
    favoMangas = user.favourMangas
    serializer = FavouriteMangaSerializer(favoMangas, many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeFavouriteManga(request):
    user = request.user
    manga = Manga.objects.get(id = request.data['mangaId'])
    Manga.objects.filter(id = request.data['mangaId']).update(favourites = manga.favourites - 1)
    user.favourMangas.mangas.remove(manga)
    
    favoMangas = user.favourMangas
    serializer = FavouriteMangaSerializer(favoMangas, many = False)
    return Response(serializer.data)


####### Manga Optional Stuff Handling #######
@api_view(['POST'])
def addView(request, pk):
    manga = Manga.objects.get(id = pk)
    Manga.objects.filter(id = pk).update(views = manga.views + 1)
    day = request.data['day']
    
    dayViews, created = DayViews.objects.get_or_create(manga = manga, day = day)
    dayViews.views += 1
    dayViews.save()
    
    return Response(status = status.HTTP_200_OK)

@api_view(['GET'])
def getMangaRanking(request):
    mangas = Manga.objects.all()
    serializer = MangaRankingSerializer(mangas, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMangaUserRating(request, pk):
    user = request.user
    userRating = user.mangaRatings.get(id = pk)

    serializer = MangaUserRatingSerializer(userRating)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rateManga(request, pk):
    user = request.user
    manga = Manga.objects.get(id = pk)
    userRating, created = MangaUserRating.objects.get_or_create(user = user, manga = manga)

    userRating.rating = request.data['rating']
    manga.totalStars += request.data['rating']
    manga.totalVotes += 1
    manga.save()
    userRating.save()


    