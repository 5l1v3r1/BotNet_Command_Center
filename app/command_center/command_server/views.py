# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Shouts
from .forms import ShoutForm


# Create your views here.
def outputIndexPage(request):
	return render(request,"command_server/index.html")


def returnLastShoutAsJSON(request):
	lastShout = Shouts.objects.latest("id")
	#convert the Shouts objects to JSON format. 
	lastShoutJSON = {
						"name":lastShout.name,
						"text":lastShout.text,
						"created":lastShout.created
					}
	return JsonResponse(lastShoutJSON)


def returnAllShoutsAsJSON(request):
	shoutsList = []
	allShouts = list(Shouts.objects.all())

	for i in allShouts:
		shoutsList.append({"name":i.name, "text":i.text, "created":i.created})
	
	return JsonResponse({"shouts":shoutsList})


@csrf_exempt
def pushShout(request):
	if request.method == 'POST':
		
		postData = {"name":request.POST["name"], "text":request.POST["text"]}
		newShout = ShoutForm(postData)
		newShout.is_valid()
		newShout.save()
		return HttpResponse("success")
	else:
		return HttpResponse("<h2>Method not allowed</h2>")

