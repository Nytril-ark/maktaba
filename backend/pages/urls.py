from django.urls import path
from . import views

urlpatterns = [
    path('api/top_rated',views.top_rated_books,name='top_rated'),
    path('api/top_categories',views.top_categories,name='top_categories'),

    path('', views.index, name='index'),
    path('contact/',views.contact,name='contact'),
    path('Error/',views.Error,name='Error')
]
