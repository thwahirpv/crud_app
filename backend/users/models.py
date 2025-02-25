from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    profile = models.ImageField(upload_to='profile/', null=True, blank=True, default='user.png')

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',  
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions', 
        blank=True
    )
