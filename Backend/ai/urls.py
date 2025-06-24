from django.urls import path
from . import views


urlpatterns = [
    path('', views.AI, name="ai"),
    path('signup', views.Signup, name="signup"),
    path('login', views.Login, name="login"),
    path('userdetails', views.UpdateUser, name="userdetails"),
    path('analysis',views.Analysis, name="analysis"),
    # path('checkactivities',views.Checkactivities, name="checkactivities")
]
