from django.shortcuts import render
from django.db.models import Count
from django.http import JsonResponse
from books.models import Book
# Create your views here.
# PLACEHOLDER



def top_rated_books(request):
    top_rated_books=Book.objects.order_by('-rating')[:8]

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

def top_categories(request):
    top_cats = Book.objects.values('category').annotate(
            book_count=Count('category')
        ).order_by('-book_count')[:5]
    
    categories_data = []
    for cat in top_cats:
        if cat['category']: 
            categories_data.append({
                'name': cat['category'],
            })  
    
    return JsonResponse({'topCat':categories_data})

def index(request):
    return render(request,'index.html')

def contact(request):
    return render(request,'contact.html')
def Error(request):
    return render(request,'404.html')
