from django.urls import path
from . import views

urlpatterns = [
    path('borrow/', views.borrow_book, name='borrow_book'),
    path('return/<int:pk>/', views.return_book, name='return_book'),
    path('my/', views.borrowed_books, name='borrowed_books'),

    path('borrowedbooks/',views.borrowed_books_page,name='borrowed_books_page')
]
