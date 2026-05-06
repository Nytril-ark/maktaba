from django.db import models
from django.conf import settings
from books.models import Book
# Create your models here.

class BorrowRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    book = models.ForeignKey(Book,on_delete=models.CASCADE)
    STATUS_CHOICES = [("borrowed", "Borrowed"), ("returned", "Returned")]
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="borrowed")
    borrowDate = models.DateField(auto_now_add=True)
    returnDate = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} borrowed {self.book.title}"
