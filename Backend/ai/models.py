from django.db import models

# Create your models here.

class Useform(models.Model):
    
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    age = models.IntegerField()
    qualification = models.CharField(max_length=100)
    level = models.CharField(max_length=100)


    class Meta:

        db_table = 'userdetails'

        
