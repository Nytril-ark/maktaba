from django.shortcuts import render
from books.models import Book
from borrowing.models import BorrowRecord
from django.http import JsonResponse
from django.db.models import Count
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta

# Create your views here.
def calculate_trend(curr,prev):
    if (prev == 0):
        if (curr > 0):
           return 100.0
        else:
            return 0.0
    else:
        diff = curr - prev
        return round(((diff / prev) * 100),1)
    
def admin_dashboard_view(request):
    return render(request,'admin_dashboard.html')

def load_book_stats(request):
    books = Book.objects.count()
   
    data = {'books' : books}

    return JsonResponse(data)



def load_borrow_stats(request):
    today = timezone.now().date()
    yesterday = today - timedelta(days=1)
    passed_months = today - timedelta(days=180)

    category_data = (BorrowRecord.objects
                     .values('book__category')
                     .annotate(count = Count('id'))
                     .order_by('-count')[:5]
    )
    borrowers = BorrowRecord.objects.filter(status='borrowed').values('user').distinct().count()
    overdue = BorrowRecord.objects.filter(status='borrowed', returnDate__lt = today).count()
    borrow_today = BorrowRecord.objects.filter(borrowDate = today).count()
    monthly_data = (BorrowRecord.objects.filter(borrowDate__gte = passed_months)
        .annotate(month=TruncMonth('borrowDate'))
        .values('month')
        .annotate(total=Count('id'))
        .order_by('month')
    )


    first_of_curr_month = today.replace(day = 1)
    last_of_prev_month = first_of_curr_month - timedelta(days = 1)
    first_of_prev_month = last_of_prev_month.replace(day = 1)

    curr_borrowers = BorrowRecord.objects.filter(status='borrowed', borrowDate__gte 
                                                = first_of_curr_month).values('user').distinct().count()
    prev_borrowers = BorrowRecord.objects.filter(status='borrowed', borrowDate__gte = first_of_prev_month,
                                                borrowDate__lte = last_of_prev_month).values('user').distinct().count()
    
    curr_overdue = BorrowRecord.objects.filter(status='borrowed', returnDate__lt = today).count()
    prev_overdue = BorrowRecord.objects.filter(status='borrowed', returnDate__lt 
                                                = last_of_prev_month).count()



    today_count = BorrowRecord.objects.filter(borrowDate = today).count()
    yesterday_count = BorrowRecord.objects.filter(borrowDate = yesterday).count()

    recent_borrows = BorrowRecord.objects.select_related("user","book").order_by("-borrowDate")[:5]
    recent_borrowers = []
    for item in recent_borrows:
        if (item.user.first_name and item.user.last_name):
            username = f"{item.user.first_name}{item.user.last_name}"
        else:
            username = item.user.email
        recent_borrowers.append({
           
            "name" : username,
            "book" : item.book.title,
            "borrowdate" : item.borrowDate.isoformat()
        })

    data = {
        "borrowers" :borrowers,
        "borrower_trend" :calculate_trend(curr_borrowers,prev_borrowers),

        "overdue" :overdue,
        "overdue_trend" :calculate_trend(curr_overdue,prev_overdue),

        "borrow_today" :borrow_today,
        "borrow_today_trend" :calculate_trend(today_count,yesterday_count),

        "pie_label" : [item['book__category'] for item in category_data],
        "pie_count" : [item['count'] for item in category_data],

        "line_label" :[item['month'].strftime("%b") for item in monthly_data],
        "line_count" :[item['total'] for item in monthly_data],

        "recent_borrowers" : recent_borrowers
    }

    return JsonResponse(data)












######################################################################
######################################################################

from books.models import Book
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

@csrf_exempt
@require_http_methods(["POST"])
def add_book(request):
    if not request.user.is_authenticated or (not request.user.is_staff and not request.user.is_superuser):
        return JsonResponse({"error": "Forbidden"}, status=403)
    data = json.loads(request.body)
    book = Book.objects.create(
        title=data.get("title"),
        authors=data.get("authors"),
        category=data.get("category"),
        image_url=data.get("image_url", ""),
        pages=data.get("pages", 0),
        language=data.get("language", "English"),
        description=data.get("description", ""),
        status=data.get("status", "available"),
        rating=data.get("rating", 0),
    )
    return JsonResponse({"id": book.id, "title": book.title}, status=201)

def add_book_page(request):
    return render(request, 'add_book.html')

def book_inventory_page(request):
    return render(request, 'book_inventory.html')
