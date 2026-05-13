from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse
import json
import datetime
from .models import BorrowRecord
from books.models import Book

# Create your views here.
# PLACE HOLDERS

@login_required
@require_POST
@csrf_exempt
def borrow_book(request):
    data = json.loads(request.body)
    book_id = data.get('book_id')
    book = Book.objects.get(id=book_id)

    already_borrowed=BorrowRecord.objects.filter(
        user=request.user,
        book=book,
        )

    if book.status=='available':
        BorrowRecord.objects.create(
            user=request.user,
            book=book,
            status='borrowed',
            returnDate = datetime.datetime.now() + datetime.timedelta(weeks=2)
        )
        Book.objects.filter(
            id=book_id,
            ).update(
                status='unavailable'
            )
        return JsonResponse({'status':'success','message':'Book borrowed successfully'})
    elif already_borrowed:
        return JsonResponse({'status':'error','message':'You have borrowed this book already'})
    else:
        return JsonResponse({'status':'fail','message':'Book is unavalible'})


@login_required
@require_POST
@csrf_exempt
def return_book(request, pk):
    
    updated=BorrowRecord.objects.filter(
        user=request.user,
        book_id = pk,
        status='borrowed'
    ).update(
        status='returned',
    )   
    
    Book.objects.filter(
        id=pk
    ).update(
        status='available',
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
            'authors' : [record.book.authors] if isinstance(record.book.authors,str) else record.book.authors,
            'category' : record.book.category
        })
    
    return JsonResponse({'borrowedBooks':books})

@ensure_csrf_cookie
def borrowed_books_page(request):
    return render(request,'BorrowedBooks.html')