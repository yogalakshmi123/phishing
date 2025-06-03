from django.http import JsonResponse
import logging
from . import chat
from . import phishing_datasets
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from urllib.parse import urlparse
import re
from . models import Useform

SUSPICIOUS_CHARS = {'@', '%', '<', '>', '\\', '|', '`', '"', "'", ' '}


urllen = []
urlsubdomains = []
urlhashttp = []
urlsus = []
urllabel = []
urlreason = []

def extract_url_features(url):
    parsed = urlparse(url)

    # Feature 1: URL length
    url_length = len(url)

    # Feature 2: Number of subdomains
    hostname = parsed.hostname or ""
    subdomain_parts = hostname.split('.')[:-2]  # remove domain and TLD
    num_subdomains = len(subdomain_parts)

    # Feature 3: HTTPS
    has_https = 1 if parsed.scheme == 'https' else 0

    # Feature 4: Suspicious characters
    has_suspicious_char = 1 if any(char in url for char in SUSPICIOUS_CHARS) else 0

    # Return all features in a dictionary
    return {
        "url": url,
        "url_length": url_length,
        "num_subdomains": num_subdomains,
        "has_https": has_https,
        "has_suspicious_char": has_suspicious_char
    }

# Example usage
example_urls = [
    "https://www.geeksforgeeks.org/how-to-store-a-tfidfvectorizer-for-future-use-in-scikit-learn/",
    "http://secure-login.paypal.com.account-update.id1234.com",
    "http://login.microsoft.com@maliciousdomain.com",
    "https://www.amazon.com"
]

for u in example_urls:
    print(extract_url_features(u))

# Set up logging
logger = logging.getLogger(__name__)

def AI(request):
    try:
        message = request.GET.get('message', '').strip()
        
        if not message:
            return JsonResponse({
                'message': 'Please provide a valid message',
                'status': 'error'
            }, status=400)
        if message.startswith("https") or  message.startswith("http"):
            
            for i in phishing_datasets.phishing_dataset:
                urllen.append(i['url_length'])
                urlsubdomains.append(i['num_subdomains'])
                urlhashttp.append(i['has_https'])
                urlsus.append(i['has_suspicious_char'])
                urllabel.append(i['label'])
                urlreason.append(i['reason'])
            
            features = list(zip(urllen, urlsubdomains, urlhashttp, urlsus))

            dtree=DecisionTreeClassifier()
            dtree.fit(features,urllabel)

            reason =DecisionTreeClassifier()
            reason.fit(features,urlreason)

            datas = extract_url_features(message)

            input_data = [[
    datas['url_length'],
    datas['num_subdomains'],
    datas['has_https'],
    datas['has_suspicious_char']
]]

# Predict
            result1 = dtree.predict(input_data)
            result2 = reason.predict(input_data)
            print(result2)

            # Return prediction as JSON
            if int(result1[0]) == 0:
                return JsonResponse({
                    'message': "This url is safe", # 0 = safe, 1 = phishing
                    'status': 'success',
                    'reason':result2[0]
                })
            else:
                return JsonResponse({
                    'message': "This url is not safe",  # 0 = safe, 1 = phishing
                    'status': 'success',
                    'reason':result2[0]
                })

        else:
        
            q = []
            a = []
            for i in chat.chats['normal']:
                q.append(i["question"])
            for i in chat.chats['normal']:
                a.append(i["answer"])

            vectorizer = TfidfVectorizer()
            X = vectorizer.fit_transform(q)

            dtree= DecisionTreeClassifier()
            dtree.fit(X,a)

            input_vector = vectorizer.transform([message])
            output = dtree.predict(input_vector)
            
            return JsonResponse({
                'message': output[0] ,
                'status': 'success'
            })
        
    except Exception as e:
        logger.error(f'Error in AI view: {str(e)}')
        return JsonResponse({
            'message': 'Sorry, I encountered an error processing your request. Please try again.',
            'status': 'error',
            'error': str(e)
        }, status=500)
    

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
        user = Useform(email=email, password=password)
        user.save()

        return JsonResponse({'message': 'User registered successfully'})

    return JsonResponse({'error': 'Only GET method allowed'}, status=405)


    