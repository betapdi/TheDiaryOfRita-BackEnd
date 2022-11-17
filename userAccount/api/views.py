from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from mangaApp.models import FavouriteManga

####### Customized Token Information #######
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['isSuperuser'] = user.is_superuser
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']

    if User.objects.filter(Q(username = username) | Q(email = email)).exists():
        return Response(status = status.HTTP_409_CONFLICT)

    user = User.objects.create_user(username, email, password)
    user.save()

    FavouriteManga.objects.create(user = user)
    return Response(status = status.HTTP_201_CREATED)