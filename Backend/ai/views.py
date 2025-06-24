from django.http import JsonResponse
import logging
from . models import Useform
# import google.generativeai as genai
import requests
import re
import json


WATSONX_API_URL = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
MODEL_ID = "meta-llama/llama-3-3-70b-instruct"
PROJECT_ID = "4152f31e-6a49-40aa-9b62-0ecf629aae42"
API_KEY = "KS5iR_XHOYc4N_xoId6YcXFjZR2ikINRdAyc2w2o18Oo"



def GetAccesstoken():
    auth_url = "https://iam.cloud.ibm.com/identity/token"
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }
    
    data = {
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        "apikey": API_KEY
    }
    response = requests.post(auth_url, headers=headers, data=data)
    
    if response.status_code != 200:
       
        return None
    else:
        token_info = response.json()
        return token_info['access_token']


def generatePrompt(json_datas):
    body = {
        "input": f"""

        you area syberseurity expert
        Answer this question 
        quetion:{json_datas}
         
         """, 
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 8100,
            "min_new_tokens": 0,
            "stop_sequences": [";"],
            "repetition_penalty": 1.05,
            "temperature": 0.5
        },
        "model_id": MODEL_ID,
        "project_id": PROJECT_ID
    }
    
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GetAccesstoken()}"
    }
    
    if not headers["Authorization"]:
        return "Error: No valid access token."
    
    response = requests.post(WATSONX_API_URL, headers=headers, json=body)
    
    if response.status_code != 200:
        
        return "Error generating prompt"
    # st.write(json_datas)
    return response.json()['results'][0]['generated_text'].strip()


# Set up logging
logger = logging.getLogger(__name__)

def AI(request):
    try:
        message = request.GET.get('message', '').strip()
        
        response = generatePrompt(message)
        
       
        return JsonResponse({
            'message': response,
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

# def Checkactivities(request):
#     if request.method == "GET":
#         id = request.GET.get('id', '').strip()
#         messages = request.GET.get('messages', '').strip()
#         genai.configure(api_key="AIzaSyCJQDpGvKX2nurvrkhliM_T4jQb1Vfu4y4")
#         model = genai.GenerativeModel("gemini-1.5-flash")
#         prompt =  f""" Check human factor to analysis for fear, urgency, pressure using this message {messages} and return as json 
#                     i need only json string for json loads no need explanation or code block or any other
#                         {{
#                             "fear":1 - 5,
#                             "urgency":1 - 5,
#                             "pressure":1 - 5
#                         }}
#                     """
#         response = model.generate_content(prompt)

#         raw = response.text.strip()
#         if raw.startswith("```"):
#             raw = re.sub(r"```(?:json)?\s*([\s\S]*?)\s*```", r"\1", raw).strip()

#         try:
#             data = json.loads(raw)
#             user = Useform.objects.get(id=id)
#             user.fear = data['fear']
#             user.urgency = data['urgency']
#             user.pressure = data['pressure']
#             user.save()
#             return JsonResponse({'message': 'User updated successfully', 'id': id})
            
#         except json.JSONDecodeError as e:
#            print(e)
#            return JsonResponse({'error': 'Invalid JSON'})
        

    