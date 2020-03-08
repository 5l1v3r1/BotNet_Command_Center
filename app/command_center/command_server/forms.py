from django import forms
from .models import Shouts
import time

class ShoutForm(forms.Form):
	text = forms.CharField(max_length=1000)
	name = forms.CharField(max_length=150)


	def save(self):
		newShout = Shouts.objects.create(
			text = self.cleaned_data["text"],
			name = self.cleaned_data["name"],
			created =  int(time.time())
			)

		return newShout