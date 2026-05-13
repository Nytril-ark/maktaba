from django.shortcuts import render
from django.http import JsonResponse
from books.models import Book
# Create your views here.
# PLACEHOLDER



def top_rated_books(request):
    top_rated_books=Book.objects.order_by('rating')[:10]

    top_rated_data = []
    for book in top_rated_books:
        top_rated_data.append({
            "id": book.id,
            "title": book.title,
            "authors": [book.authors] if isinstance(book.authors, str) else book.authors,
            "image": book.image_url, 
            "rating": book.rating
        })

    return JsonResponse({'topRated':top_rated_data})

def index(request):
    return render(request,'index.html')
