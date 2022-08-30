from django.urls import path, include, re_path
from . import views

app_name = 'mangaApp'

urlpatterns = [
    path('', views.index, name = 'home'),
    path('addManga/', views.addManga.as_view(), name = 'addManga'),
    path('addChapter/', views.addChapter.as_view(), name = 'addChapter'),
    path('mangaAutocomplete/', views.mangaAutocomplete, name = 'mangaAutocomplete'),
    path('<int:pk>/', views.mangaDetails, name = 'mangaDetails'),
    path('<int:mangaPk>/<int:chapterPk>/', views.chapterDetails, name = 'chapterDetails'),
    
]