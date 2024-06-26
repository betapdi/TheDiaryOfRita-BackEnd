import os
import firebase_admin

from django.contrib.auth.models import User
from mangaApp.models import FavouriteManga

from django.utils import timezone
from firebase_admin import auth
from firebase_admin import credentials
from rest_framework import authentication

from .exceptions import FirebaseError
from .exceptions import InvalidAuthToken
from .exceptions import NoAuthToken

cred = credentials.Certificate({
  "type": os.environ.get('DJANGO_FIREBASE_TYPE'),
  "project_id": os.environ.get('DJANGO_FIREBASE_PROJECT_ID'),
  "private_key_id": os.environ.get('DJANGO_FIREBASE_PRIVATE_KEY_ID'),
  "private_key": os.environ.get('DJANGO_FIREBASE_PRIVATE_KEY').replace('\\n', '\n'),
  "client_email": os.environ.get('DJANGO_FIREBASE_CLIENT_EMAIL'),
  "client_id": os.environ.get('DJANGO_FIREBASE_CLIENT_ID'),
  "auth_uri": os.environ.get('DJANGO_FIREBASE_AUTH_URI'),
  "token_uri": os.environ.get('DJANGO_FIREBASE_TOKEN_URI'),
  "auth_provider_x509_cert_url": os.environ.get('DJANGO_FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
  "client_x509_cert_url": os.environ.get('DJANGO_FIREBASE_CLIENT_CERT_URL')
})

default_app = firebase_admin.initialize_app(cred)

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            return None

        id_token = auth_header.split(" ").pop()
        decoded_token = None
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise InvalidAuthToken("Invalid auth token")

        if not id_token or not decoded_token:
            return None

        try:
            uid = decoded_token.get("uid")
        except Exception:
            raise FirebaseError()

        user, created = User.objects.get_or_create(username=uid)
        
        if created:
          FavouriteManga.objects.create(user = user)

        return (user, None)