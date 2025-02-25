from django.shortcuts import render
from rest_framework import viewsets
from .models import Users
from .serializers import UsersSerializer, ProfileUploadSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views  import TokenViewBase
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404



class RegisterViewSet(viewsets.ViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [AllowAny]

    
    def create(self, req):
        serializer = UsersSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersViewSet(viewsets.ViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        user = get_object_or_404(Users, id=pk)
        return user

    def get_queryset(self):
        users = Users.objects.all()
        param = self.request.query_params.get('param', None)
        if param is not None:
            users = users.filter(username__icontains=param)
        return users

    def list(self, req):
        users = self.get_queryset()
        serializer = UsersSerializer(users , many=True)
        if serializer:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create(self, req):
        serializer = UsersSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, req, pk=None):
        user = self.get_object(pk)
        serializer = UsersSerializer(user)
        if serializer: 
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, req, pk=None):
        user = self.get_object(pk)
        serializer = UsersSerializer(user, data=req.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, req, pk=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class ProfileUploadViewSet(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileUploadSerializer
    parser_classes = [MultiPartParser, FormParser]

    def put(self, req):
        user = req.user
        serializer = ProfileUploadSerializer(user, data=req.data, context={'req': req}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CustomTokenObtainPairView(TokenViewBase):
    serializer_class = CustomTokenObtainPairSerializer



class AuthCheckViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'], url_path='auth-check', permission_classes=[IsAuthenticated])
    def get(self, req):
        if not req.user or not req.user.is_authenticated:
            return Response({"is_authenticated": False}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"is_authenticated": True}, status=status.HTTP_200_OK)


    

