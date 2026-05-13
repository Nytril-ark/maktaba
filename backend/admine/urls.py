from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.admin_dashboard_view, name='admin_dashboard'),
    path('api/borrow_stats/', views.load_borrow_stats, name='load_borrow_stats'),
    path('api/books_stats/', views.load_book_stats, name='load_book_stats'),
    path('api/add_book/', views.add_book, name='add_book'),
    path('add_book/', views.add_book_page, name='add_book_page'),
    path('book_inventory/', views.book_inventory_page, name='book_inventory'),
    path('api/inventory/', views.load_inventory, name='load_inventory'),
    path('api/delete_book/<str:book_id>/', views.delete_book, name='delete_book'),

    path('edit_book/', views.edit_book_page, name='edit_book_page'),

    path('api/book/<str:book_id>/', views.get_single_book, name='get_single_book'),

    path('api/update_book/<str:book_id>/', views.update_book, name='update_book'),
]
