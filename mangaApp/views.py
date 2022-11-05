import io
import zipfile
from venv import create
from django.shortcuts import render, redirect
from .models import Manga, Chapter, Picture
from .forms import addChapterForm, addImageForm, addMangaForm, addMangaPackageForm
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.files.images import ImageFile
from django.core.files.base import ContentFile
from django.core.files import File as DjangoFile

#Manga Autocomplete

def mangaAutocomplete(request):
    #Remember to filter results for specific users
    if request.GET.get('term'):
        term = request.GET['term']
        data = Manga.objects.filter(name__icontains = term)[:10].values_list('name', flat = True)
        json = list(data)
        return JsonResponse(json, safe = False)
    
    else: HttpResponse("No cookies")

# Manga App Functions

mangaList = Manga.objects.all()
chapterList = Chapter.objects.all()

def index(request):
    context = {
        'mangaList': mangaList,
        'chapterList': chapterList,
    }
    
    return render(request, 'mangaApp/index.html', context)

def mangaDetails(request, pk):    
    manga = Manga.objects.get(pk = pk)
        
    return render(request, 'mangaApp/manga.html', {'manga': manga})

def chapterDetails(request, mangaPk, chapterPk):    
    if Chapter.objects.filter(pk = chapterPk).exists():
        manga = Manga.objects.get(pk = mangaPk) 
        chapter = Chapter.objects.get(pk = chapterPk)
        
        prevChapter = (Chapter.objects
                        .filter(mangaName = manga, index__lt = chapter.index)
                        .exclude(id = chapter.id)
                        .order_by('-index')
                        .first())
        
        nextChapter = (Chapter.objects
                        .filter(mangaName = manga, index__gt = chapter.index)
                        .exclude(id = chapter.id)
                        .order_by('index')
                        .first())
        
        context = {
            'chapter': chapter,
            'mangaId': manga.id,
            'nextChap': nextChapter.id if nextChapter is not None else 0,
            'prevChap': prevChapter.id if prevChapter is not None else 0,
        }
        
        return render(request, 'mangaApp/chapter.html', context)
    else: return HttpResponse('Chapter is not existed')

class addManga(LoginRequiredMixin, View):
    login_url = '/user/login/'
    def get(self, request):
        return render(request, 'mangaApp/addManga.html', {'addMangaForm': addMangaForm})
    
    def post(self, request):
        myForm = addMangaForm(request.POST)
        
        if myForm.is_valid(): 
            myForm.save()
            return HttpResponse('Manga added!!')
        else: return render(request, 'mangaApp/errorForm.html')

class addChapter(LoginRequiredMixin, View):
    login_url = '/user/login/'
    def get(self, request):
        context = {
            'chapForm' : addChapterForm,
            'mangaPackForm': addMangaPackageForm,
        }
        
        return render(request, 'mangaApp/addChapter.html', context)
    
    def post(self, request):
        if request.POST.get('index'):           
            myForm = addChapterForm(request.POST, request.FILES)
            
            print(myForm.errors)
            
            if myForm.is_valid():
                manga = Manga.objects.get(name = myForm.cleaned_data['mangaNameAutocomplete'])
                if manga is None:
                    return HttpResponse("Error Manga!! This manga is not exist!!")
            
                if Chapter.objects.filter(mangaName = manga, index = request.POST['index']).exists(): 
                    return HttpResponse("Error Form!! This chapter is existing!!")
                
                data = myForm.save(commit = False)
                data.mangaName = manga
                data.save()
                
                result = handleUploadedChapter(data.chapterZipData, data)
                if result == 0: 
                    return render(request, 'mangaApp/errorForm.html')
                
                return HttpResponse("Chapter added!!")
            else: return HttpResponse(myForm) #render(request, 'mangaApp/errorForm.html')
            
        else:
            myForm = addMangaPackageForm(request.POST, request.FILES)
            
            if myForm.is_valid():
                manga = Manga.objects.get(name = myForm.cleaned_data['mangaNameAutocomplete'])
                if manga is None:
                    return HttpResponse("Error Manga!! This manga is not exist!!")
            
                handleUploadedMangaPackage(request.FILES['chapterZipData'], manga)
                return HttpResponse("Manga's package added!!!")
            else: return render(request, 'mangaApp/errorForm.html')
        
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

