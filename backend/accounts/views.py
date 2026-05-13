from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login,logout
from .models import User
def signUp(request):
        if request.method=='POST':
            data=json.loads(request.body)
            email=data.get('email')
            password=data.get('password')
            username=data.get('username')
            firstName=data.get('first_name')
            lastName=data.get('last_name')
            birthDate=data.get('birth_date')
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error':'This email is already exists'})
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error':'This username is already Taken'})
            user=User.objects.create_user(
                email=email, username=username,password=password,
                first_name=firstName,last_name=lastName,birth_date=birthDate
            )
            return JsonResponse({'message':'Account has been created successfully! '})
        return JsonResponse({'error':'Invaild request '})
def logIn(request):
     if request.method=='POST':
        data=json.loads(request.body)
        email=data.get('email')
        password=data.get('password')
        user=authenticate(email=email,password=password)
        if user is None:
              return JsonResponse({'error':'Invaild Email or Password'})
        else:
             login(request,user)
             if user.is_superuser:
                  role="Admin"
             else:
                  role="Student"
             return JsonResponse({'message':'Login successful!','role':role,'password':password})
     else:
           return JsonResponse({'error':'Invaild request '})
    
def logOut(request):
     if request.method=='POST':
          logout(request)
          return JsonResponse({'message':'LogOut successfully! '})
     return JsonResponse({'error':'Invaild request'})
#==================================Pages==================================================
def login_Page(request):
     return render(request,'login.html')        

def SignUP_Page(request):
    return render(request,'signup.html')

def ForgetPass(request):
     return render(request,'forget_password.html')
 #=============================CRUD operations that not used=============================
def updateUser(request):
     if request.method=='POST' and request.user.is_authenticated:
          data=json.loads(request.body)
          request.user.first_name=data.get('first_name')
          request.user.last_name=data.get('last_name')
          request.user.save()
          return JsonResponse({'message':'Profile Updated successfully! '})
     return JsonResponse({'error':'Invaild request'})

def deleteUser(request):
     if request.method=='POST' and request.user.is_authenticated:
          request.user.delete()
          return JsonResponse({'message':'Profile deleted successfully! '})
     return JsonResponse({'error':'Invaild request'})
     


        
     
             
             

         



