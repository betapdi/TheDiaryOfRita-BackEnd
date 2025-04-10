from django.shortcuts import render, redirect
from .forms import registerForm, loginForm
from django.views import View
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required #normal
from django.contrib.auth.mixins import LoginRequiredMixin #class based-view


# Create your views here.

class registerUser(View):
	def get(self, request):
		rF = registerForm
		return render(request, 'userAccount/register.html', {'rF' : rF})

	def post(self, request):
		username = request.POST['username']
		email = request.POST['email']
		password = request.POST['password']

		user = User.objects.create_user(username, email, password)
		user.save()
		return HttpResponse('saved!!')

class loginUser(View):
	def get(self, request):
		if request.user.is_authenticated:
			return redirect('userAccount:info')

		lF = loginForm
		return render(request, 'userAccount/login.html', {'lF': lF})

	def post(self, request):
		username = request.POST['username']
		password = request.POST['password']

		user = authenticate(request, username = username, password = password)

		if user is not None:
			login(request, user)
			return redirect('userAccount:info')
		else:
			return HttpResponse('Fuck you, wrong username or password!!!')

def logoutUser(request):
	logout(request)
	return redirect('userAccount:loginUser')

class infoPage(LoginRequiredMixin, View):
	login_url = '/user/login/'
	def get(self, request):
		return render(request, 'userAccount/info.html')

		