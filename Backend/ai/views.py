from django.http import JsonResponse
import logging
from . import chat
from . import phishing_datasets
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from urllib.parse import urlparse
import re
from . models import Useform
import google.generativeai as genai



# Set up logging
logger = logging.getLogger(__name__)

def AI(request):
    try:
        message = request.GET.get('message', '').strip()
        genai.configure(api_key="AIzaSyCJQDpGvKX2nurvrkhliM_T4jQb1Vfu4y4")
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f" Answer this question {message}"
        response = model.generate_content(prompt)
        
       
        return JsonResponse({
            'message': response.text,
            'status': 'success'
        })
        
    except Exception as e:
        logger.error(f'Error in AI view: {str(e)}')
        return JsonResponse({
            'message': 'Sorry, I encountered an error processing your request. Please try again.',
            'status': 'error',
            'error': str(e)
        }, status=500)


def Login(request):
    if request.method == "GET":
        email = request.GET.get('email', '').strip()
        password = request.GET.get('password', '').strip()

        if not email or not password:
            return JsonResponse({'error': 'Missing email or password'}, status=400)

        try:
            user = Useform.objects.get(email=email, password=password)
        except Useform.DoesNotExist:
            return JsonResponse({'error': 'Invalid email or password'}, status=401)

        return JsonResponse({'id': user.id, 'username':user.name, 'email':user.email, 'level':user.level, 'age':user.age})

    return JsonResponse({'error': 'Only GET method allowed'}, status=405)

def Signup(request):
    if request.method == "GET":
        username = request.GET.get('username', '').strip()
        email = request.GET.get('email', '').strip()
        password = request.GET.get('password', '').strip()

        if not username or not email or not password:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        # Optional: check if user already exists
        if Useform.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already registered'}, status=400)

        # Create user
        user = Useform(name=username,email=email, password=password, age = 0, qualification="", level="")
        user.save()

        return JsonResponse({'message': 'User registered successfully','id': user.id})

    return JsonResponse({'error': 'Only GET method allowed'}, status=405)

def UpdateUser(request):
    if request.method == "GET":
        id = request.GET.get('id', '').strip()
        age = request.GET.get('age', '').strip()
        level = request.GET.get('level', '').strip()
        qualification = request.GET.get('qualification', '').strip()

        if not id or not age or not level or not qualification:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:
            user = Useform.objects.get(id=id)
        except Useform.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Update fields
        user.age = age
        user.level = level
        user.qualification = qualification
        user.save()

        return JsonResponse({'message': 'User updated successfully', 'id': user.id})

    return JsonResponse({'error': 'Only GET method allowed'}, status=405)

    