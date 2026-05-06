from django.shortcuts import render

# Create your views here.

import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import User

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")
    user = authenticate(request, username=email, password=password)
    if user is None:
        return JsonResponse({"error": "Invalid credentials"}, status=401)
    login(request, user)
    return JsonResponse({"email": user.email, "role": "admin" if user.is_staff else "student"})

@csrf_exempt
@require_http_methods(["POST"])
def signup_view(request):
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")
    username = data.get("username", email)
    if User.objects.filter(email=email).exists():
        return JsonResponse({"error": "Email already registered"}, status=400)
    user = User.objects.create_user(username=username, email=email, password=password)
    login(request, user)
    return JsonResponse({"email": user.email, "role": "student"}, status=201)

@require_http_methods(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out"})

@require_http_methods(["GET"])
def me_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Not logged in"}, status=401)
    return JsonResponse({"email": request.user.email, "role": "admin" if request.user.is_staff else "student"})
