from django.urls import path
from . import views

urlpatterns = [
    path('js/', views.get_books_api, name='get_books_api'),
    path('browse/', views.browse_books_page, name='browse_books_page'),
    path('details/', views.book_details_page, name='book_details_page'),
]
