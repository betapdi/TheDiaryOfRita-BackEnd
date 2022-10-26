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
    
    path('mangas/', views.getMangasList),
    path('mangas/favourites/', views.getFavouriteMangas),
    path('mangas/favourites/add/', views.addFavouriteManga),
    path('mangas/favourites/remove/', views.removeFavouriteManga),
    path('mangas/newManga/', views.addManga),
    
    path('manga/<int:pk>/', views.getMangaDetails),
    path('manga/<int:pk>/<int:index>', views.getImages),
    path('manga/<int:pk>/chapters/', views.getChapters),
    path('manga/<int:pk>/chapters/upload/', views.addChapter),
    path('manga/<int:pk>/chapters/uploadMulti/', views.addMultiChapters),
    path('manga/<int:pk>/delete/', views.deleteManga),
]
