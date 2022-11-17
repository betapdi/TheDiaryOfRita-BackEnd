from django.contrib import admin
from .models import Manga, Chapter, Picture, FavouriteManga, Category, Banner

# Register your models here.
class MangaAdmin(admin.ModelAdmin):
    search_fields = ['name']
    
class SearchMangaAdmin(admin.ModelAdmin):
    autocomplete_fields = ['mangaName']

admin.site.register(Manga, MangaAdmin)
admin.site.register(Chapter, SearchMangaAdmin)
admin.site.register(Picture)
admin.site.register(FavouriteManga)
admin.site.register(Category)
admin.site.register(Banner)