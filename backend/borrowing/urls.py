from django.urls import path
from . import views

urlpatterns = [
    path('borrow/', views.borrow_book, name='borrow_book'),
    path('return/<int:pk>/', views.return_book, name='return_book'),
    path('my/', views.my_borrowed_books, name='my_borrowed_books'),
]
