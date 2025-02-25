from django.urls import path
from . import views
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r'register', views.RegisterViewSet, basename='register')
router.register(r'auth', views.AuthCheckViewSet, basename='auth')
router.register(r'users', views.UsersViewSet, basename='users')
# router.register(r'profile-upload', views.ProfileUploadViewSet, basename='profile-upload')

urlpatterns = [
    path('profile-upload/', views.ProfileUploadViewSet.as_view(), name='profile-upload'),
] 

urlpatterns += router.urls