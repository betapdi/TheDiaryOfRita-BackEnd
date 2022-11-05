from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#Manga needed models
class Manga(models.Model):
	#topic
	name = models.CharField(max_length = 50)
	description = models.TextField(null = True, blank = True) #null = true for database, blank = true for saving
	created = models.DateTimeField(auto_now_add = True) #auto_now: can change, auto_now_add: once
	cover = models.ImageField(null = True)

	def __str__(self):
		return self.name

class MangaPackage(models.Model):
	mangaName = models.ForeignKey(Manga, on_delete = models.CASCADE, related_name = 'mangaPackage', null = True, blank = True, default = None)
	chapterZipData = models.FileField(null = True)

	def __str__(self):
		return self.chapterZipData.name

class Chapter(models.Model):
	mangaName = models.ForeignKey(Manga, on_delete = models.CASCADE, related_name = 'chapter', null = True, blank = True, default = None)
	chapterZipData = models.FileField(null = True)
	index = models.IntegerField(default = 0)
 
	class Meta:
		ordering = ('index', )
 
	def __str__(self):
		return self.chapterZipData.name

class Picture(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete = models.CASCADE, blank = True, null = True, related_name = 'image')
    image = models.FileField(null = True)
    
    def __str__(self):
        return self.image.name
    
    
    
#Manga optional models
class FavouriteManga(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, null = True, related_name = 'favourMangas')
    mangas = models.ManyToManyField(Manga, blank = True)
    
