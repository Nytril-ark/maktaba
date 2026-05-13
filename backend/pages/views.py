from django.shortcuts import render

# Create your views here.
# PLACEHOLDER

from django.http import JsonResponse

def index(request):
    return render(request,'index.html')

def contact(request):
    return render(request,'contact.html')
