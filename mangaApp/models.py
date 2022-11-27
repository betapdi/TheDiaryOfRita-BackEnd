from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

#Manga needed models
class Manga(models.Model):
	#topic
	name = models.CharField(max_length = 50)
	description = models.TextField(null = True, blank = True) #null = true for database, blank = true for saving
	cover = models.FileField(null = True)
 
	views = models.IntegerField(default = 0)
	likes = models.IntegerField(default = 0)
	totalStars = models.IntegerField(default = 0)
	totalVotes = models.IntegerField(default = 0)
 
	created = models.DateTimeField(auto_now_add = True) #auto_now: can change, auto_now_add: once
	updated = models.DateTimeField(auto_now = True)
	#auto_now only update when call Model.save(), Queryset.update() doesn't affect this. What a nice thing, luv it <3.

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
    
class Category(models.Model):
	mangas = models.ManyToManyField(Manga, blank = True)
	name = models.CharField(max_length = 30)

	def __str__(self):
		return self.name	
   

    
#Manga optional models
class FavouriteManga(models.Model):
	user = models.OneToOneField(User, on_delete = models.CASCADE, null = True, related_name = 'favourMangas')
	mangas = models.ManyToManyField(Manga, blank = True, related_name = 'favourMangas')
 
class Banner(models.Model):
	image = models.FileField(null = True)
 
	def __str__(self):
		return self.image.name

class DayViews(models.Model):
  manga = models.ForeignKey(Manga, on_delete = models.CASCADE, null = True, related_name = 'dayViews')
  currentDay = models.DateField(auto_now_add = True)
  views = models.IntegerField(default = 0)
  
class ReadingStatus(models.Model):
  user = models.OneToOneField(User, on_delete = models.CASCADE, null = True, related_name = 'readingHistory')
  mangas = models.ManyToManyField(Manga, through = 'MangaReadingHistory')
  
class MangaReadingHistory(models.Model):
	readingHistory = models.ForeignKey(ReadingStatus, on_delete = models.CASCADE)
	manga = models.ForeignKey(Manga, on_delete = models.CASCADE)
	lastRead = models.DateTimeField(auto_now = True)
    
