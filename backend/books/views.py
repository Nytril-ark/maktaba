from django.http import JsonResponse
from django.shortcuts import render
from .models import Book

# Create your views here.

def get_books_api (request):
    books =Book.objects.all()
    book_data = []

    for book in books:
        book_data.append({
            "id":book.id,
            "title":book.title,
            "authors":[book.authors] if isinstance(book.authors,str) else book.authors,
            "category":book.category,
            "status": book.status,
            "image":book.image_url,
            "pages":book.pages,
            "language": book.language,
            "description": book.description,
            "rating": book.rating,
        })
    return JsonResponse(book_data,safe=False)

def browse_books_page(request):
    return render(request,'browse-books.html')

def book_details_page(request):
    return render(request,'book.html')
