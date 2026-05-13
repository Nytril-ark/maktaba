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
    STATUS_CHOICES = [("available", "Available"), ("unavailable", "Unavailable")]
    status = models.CharField(max_length=50,choices=STATUS_CHOICES)
    rating = models.IntegerField()
    id = models.CharField(max_length=100,primary_key=True)

    def __str__(self):
        return self.title