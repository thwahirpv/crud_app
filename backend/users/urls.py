from django.urls import path
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet, basename='users')

urlpatterns = [
    # path('users/', views.UserViewSet, name='users'),
]

urlpatterns += router.urls