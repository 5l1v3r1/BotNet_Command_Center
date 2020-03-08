# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

# Create your models here.
'''
This model declaration message.

'''
class Shouts(models.Model):
	text = models.TextField(blank=True)
	name = models.CharField(max_length=150)
	created = models.IntegerField() 

	def __str__(self):

		return "{}:{}:{}".format(self.name, self.text, self.created)
				
