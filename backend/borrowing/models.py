from django.db import models
from django.conf import settings
from books.models import Book
# Create your models here.

class BorrowRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    book = models.ForeignKey(Book,on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    borrowDate = models.DateField()
    returnDate = models.DateField()

    def __str__(self):
        return f"{self.user.email} borrowed {self.book.title}"