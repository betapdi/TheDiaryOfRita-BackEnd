from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

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
    path('<int:pk>/<int:index>', views.getImages),
    
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
