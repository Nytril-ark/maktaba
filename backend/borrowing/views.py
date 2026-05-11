from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import BorrowRecord
from django.http import JsonResponse

# Create your views here.
# PLACE HOLDERS


def borrow_book(request): pass
def return_book(request, pk): pass

@login_required
def borrowed_books(request): 
    borrowed_records = BorrowRecord.objects.filter(
        user=request.user,
        status='borrowed',
    )
    books = []

    for record in borrowed_records:
        books.append({
            'id' : record.book.id,
            'title' : record.book.title,
            'authors' : tuple(record.book.authors),
            'category' : record.book.category
        })
    
    return JsonResponse({'borrowedBooks':books})


def borrowed_books_page(request):
    return render(request,'BorrowedBooks.html')