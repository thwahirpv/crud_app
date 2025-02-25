from .models import Users
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'is_superuser', 'profile']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return Users.objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance

class ProfileUploadSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Users
        fields = ['profile']
    
    def update(self, instace, validated_data):
        req = self.context.get('req')
        profile_picture = validated_data.get('profile', instace.profile)
        if profile_picture:
            instace.profile = profile_picture
        instace.save()
        return instace


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        refresh['username'] = self.user.username
        refresh['is_superuser'] = self.user.is_superuser

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = self.user.username
        data['is_superuser'] = self.user.is_superuser
        data['profile'] = self.user.profile.url if self.user.profile else None
        
        return data
    

    