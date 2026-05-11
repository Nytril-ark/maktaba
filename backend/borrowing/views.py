from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse
import datetime
from .models import BorrowRecord
from books.models import Book

# Create your views here.
# PLACE HOLDERS


def borrow_book(request): pass

@login_required
@require_POST
@csrf_exempt
def return_book(request, pk):
    updated=BorrowRecord.objects.filter(
        user=request.user,
        book_id=pk,
        status='borrowed'
    ).update(
        status='returned',
        returnDate=datetime.datetime.now(),
    )
    
    Book.objects.filter(
        id=pk
    ).update(
        status='availble'
    )

    if updated > 0:
        return JsonResponse({'status': 'success', 'message': 'Book returned successfully'})
    
    else:
        return JsonResponse({'status': 'error', 'message': 'Fail to return The book'}, status=404)


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

@ensure_csrf_cookie
def borrowed_books_page(request):
    return render(request,'BorrowedBooks.html')