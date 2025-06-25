from django.http import JsonResponse
import logging
from . models import Useform
# import google.generativeai as genai
# import requests
import re
import json
from groq import Groq


client = Groq(
    api_key="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",
)

# Set up logging
logger = logging.getLogger(__name__)

def AI(request):
    try:
        message = request.GET.get('message', '').strip()
        
        chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""
                Answer this question in simple words: {message}. Use markdown formatting like **bold**, *italic*,Use line breaks after colons (`:`) and lists if helpful.  
                """,
            }
        ],
        model="llama-3.3-70b-versatile",
        stream=False,
)

        
       
        return JsonResponse({
            'message': chat_completion.choices[0].message.content,
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
        user = Useform(name=username,email=email, password=password, age = 0, qualification="", level="", fear = 0, urgency = 0, pressure = 0)
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


def Analysis(request):
    users = Useform.objects.all().values()  # Get all fields as dictionaries
    return JsonResponse(list(users), safe=False)

def Checkactivities(request):
    try:
        if request.method == "GET":
            id = request.GET.get('id', '').strip()
            messages = request.GET.get('messages', '').strip()
            
            prompt = f"""
                    Analyze the following message for human emotional factors: fear, urgency, and pressure.

                    Respond ONLY with a raw JSON object, no explanation, no markdown formatting, no code blocks.

                    Message:
                    \"\"\"
                    {messages}
                    \"\"\"

                    Return this format exactly:
                    {{
                    "fear": <1 to 5>,
                    "urgency": <1 to 5>,
                    "pressure": <1 to 5>
                    }}
            """

            chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            stream=False,
    )
            print(chat_completion.choices[0].message.content)
            print("user details")
            data = json.loads(chat_completion.choices[0].message.content)
            user = Useform.objects.get(id=id)
            user.fear = data['fear']
            user.urgency = data['urgency']
            user.pressure = data['pressure']
            user.save()
            # print(chat_completion.choices[0].message.content)
        return JsonResponse({'message': 'User updated successfully', 'id': id})
        
    
    except Exception as e:
        
        return JsonResponse({"error": str(e)}, status=404)

        
        

    