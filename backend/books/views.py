from django.http import JsonResponse
from django.shortcuts import render
from .models import Book

# Create your views here.

def get_books_api (request):
    books =Book.objects.all()
    book_data = []

    for book in books:
        book_data.append({
            "id":book.ISBN,
            "title":book.title,
            "authors":[book.authors] if isinstance(book.authors,str) else book.authors,
            "category":book.category,
            "status": book.status,
            "image":book.image_url,
        })
    return JsonResponse(book_data,safe=False)

def browse_books_page(request):
    return render(request,'browse-books.html')
