from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.admin_dashboard_view, name='admin_dashboard'),
    path('api/borrow_stats/', views.load_borrow_stats, name='load_borrow_stats'),
    path('api/books_stats/', views.load_book_stats, name='load_book_stats'),
    path('api/add_book/', views.add_book, name='add_book'),
]
