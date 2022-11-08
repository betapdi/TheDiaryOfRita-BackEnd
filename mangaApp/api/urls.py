from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    ### Manga url ###
    path('mangaApp/mangaList/', views.getMangasList),
    path('mangaApp/newManga/', views.addManga),
    path('mangaApp/<int:pk>/delete/', views.deleteManga),
    path('mangaApp/<int:pk>/', views.getMangaDetails),
    
    ### Chapter url ###
    path('mangaApp/<int:pk>/chapterList/', views.getChapters),
    path('mangaApp/<int:pk>/chapter/upload/', views.addChapter),
    path('mangaApp/<int:pk>/chapter/uploadMulti/', views.addMultiChapters),
    path('mangaApp/<int:pk>/<int:index>', views.getImages),
    
    ### Favourite Manga url ###
    path('mangaApp/favourites/', views.getFavouriteMangas),
    path('mangaApp/favourites/add/', views.addFavouriteManga),
    path('mangaApp/favourites/remove/', views.removeFavouriteManga),
    
    ### Category url ###
    path('mangaApp/categoryList/', views.getCategoryList),
]
