from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.logIn, name='login'),
    path('api/signup/', views.signUp, name='signup'),
    path('api/logout/', views.logOut, name='logout'),
    path('api/updateUser/', views.updateUser, name='update'),
    path('api/deleteUser/', views.deleteUser, name='delete'),

    #=====================================================
    path('login/',views.login_Page,name='log_in'),
    path('signup/',views.SignUP_Page,name='sign_up'),
    path('forget_password/', views.ForgetPass, name='forget_password')

]
