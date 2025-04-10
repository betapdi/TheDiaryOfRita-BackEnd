from django import forms

class registerForm(forms.Form):
	username = forms.CharField(max_length = 20)
	email = forms.EmailField()
	password = forms.CharField(max_length = 20, widget = forms.PasswordInput)

class loginForm(forms.Form):
	username = forms.CharField()
	password = forms.CharField(max_length = 20, widget = forms.PasswordInput)
