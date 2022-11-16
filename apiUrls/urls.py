from django.urls import path, include

urlpatterns = [
  path('auth/', include('userAccount.api.urls')),
  path('mangaApp/', include('mangaApp.api.urls'))
]