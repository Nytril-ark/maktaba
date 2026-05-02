from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    image_url = models.URLField(max_length=1000,null=True,blank=True)
    pages = models.IntegerField()
    language = models.CharField(max_length=100)
    description = models.TextField(null=True,blank=True)
    status = models.CharField(max_length=50)
    rating = models.IntegerField()
    ISBN = models.CharField(max_length=100,unique=True,null=True,blank=True)

    def __str__(self):
        return self.title
    