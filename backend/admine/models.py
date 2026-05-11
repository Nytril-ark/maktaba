from django.db import models

# Create your models here.

class Admine(models.Model):
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.TextField(null=True,blank=True)
    status = models.CharField(max_length=50)
    ISBN = models.CharField(max_length=100,unique=True,null=True,blank=True)
    publication_year = models.DateField(auto_now_add=True)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title