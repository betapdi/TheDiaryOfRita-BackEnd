from django import forms
from .models import Chapter, Manga, Picture, MangaPackage

class addChapterForm(forms.ModelForm):
    mangaNameAutocomplete = forms.CharField(label = 'MangaName', widget = forms.TextInput(
        attrs = {
            'class': 'mangaAutocomplete',
        }))
    
    class Meta:
        model = Chapter
        fields = ['mangaNameAutocomplete', 'mangaName', 'chapterZipData', 'index']
        widgets = {'mangaName': forms.HiddenInput()}
        
class addMangaPackageForm(forms.ModelForm):
    mangaNameAutocomplete = forms.CharField(label = 'MangaName', widget = forms.TextInput(
        attrs = {
            'class': 'mangaAutocomplete',
        }))
    
    class Meta:
        model = MangaPackage
        fields = ['mangaNameAutocomplete', 'mangaName', 'chapterZipData']
        widgets = {'mangaName': forms.HiddenInput()}

class addMangaForm(forms.ModelForm):
    class Meta:
        model = Manga
        fields = ['name', 'description']
        
class addImageForm(forms.ModelForm):
    class Meta:
        model = Picture
        fields = ['chapter', 'image']