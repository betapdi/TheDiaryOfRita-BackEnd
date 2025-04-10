from django.urls import path
from . import views

app_name = 'userAccount'

urlpatterns = [
    path('register/', views.registerUser.as_view(), name = 'registerUser'),
    path('login/', views.loginUser.as_view(), name = 'loginUser'),
    path('logout/', views.logoutUser, name = 'logoutUser'),
    path('info/', views.infoPage.as_view(), name = 'info'),
]