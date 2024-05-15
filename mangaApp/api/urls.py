from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    
    ### Manga url ###
    path('mangaList/', views.getMangasList),
    path('newManga/', views.addManga),
    path('<int:pk>/delete/', views.deleteManga),
    path('<int:pk>/', views.getMangaDetails),
    
    ### Chapter url ###
    path('<int:pk>/chapterList/', views.getChapters),
    path('<int:pk>/chapter/upload/', views.addChapter),
    path('<int:pk>/chapter/uploadMulti/', views.addMultiChapters),
    path('<int:pk>/<int:chapterId>/delete/', views.deleteChapter),
    path('<int:pk>/<int:chapterId>/', views.getImages),
    
    ### Album url ###
    path('albums/', views.getAlbums),
    path('albums/<int:albumId>/', views.getAlbumMangaList),
    path('albums/create/', views.createAlbum),
    path('albums/add/<int:albumId>/<int:mangaId>/', views.addAlbumManga),
    path('albums/remove/<int:albumId>/<int:mangaId>/', views.removeAlbumManga),
    path('albums/delete/<int:albumId>/', views.deleteAlbum),
    
    ### Favourite Manga url ###
    path('favourites/', views.getFavouriteMangas),
    path('favourites/add/', views.addFavouriteManga),
    path('favourites/remove/', views.removeFavouriteManga),
    
    ### Category url ###
    path('categoryList/', views.getCategoryList),
    
    ### Banner url ###
    path('bannerList/', views.getBannerList),
    
    ### Manga ranking ###
    path('topMangas/', views.getMangaRanking),
]
