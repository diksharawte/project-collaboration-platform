from django.shortcuts import render
from rest_framework import generics
from .models import Project, ContributionRequest, Contributor, Task
from .serializers import ProjectSerializer, ContributionRequestSerializer, ContributorSerializer, TaskSerializer, ContributionRequestUpdateSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
# Create your views here.
# Project
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Contribution
class ContributionRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = ContributionRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ContributionRequest.objects.filter(project__owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 
# MySentRequests
class MySentRequestsView(generics.ListAPIView):
    serializer_class = ContributionRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ContributionRequest.objects.filter(user=self.request.user)
        
# Contribution Request
class ContributionRequestUpdateView(generics.RetrieveUpdateAPIView):
    queryset = ContributionRequest.objects.all()
    serializer_class = ContributionRequestUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.status == 'accepted':
            Contributor.objects.get_or_create(
                project=instance.project,
                user=instance.user,
                defaults={'role': 'Contributor'}
            )

# Contributor
class ContributorListCreateView(generics.ListCreateAPIView):
    queryset = Contributor.objects.all()
    serializer_class = ContributorSerializer  
    permission_classes = [IsAuthenticated]

# Task
class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer   
    permission_classes = [IsAuthenticated] 

# Signup
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error':'Username already taken'}, status=400)
    user = User.objects.create_user(username=username, password=password)
    token = Token.objects.create(user=user)

    return Response({'token': token.key, 'username': user.username})

# Login
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)

    token, created = Token.objects.get_or_create(user=user)

    return Response({'token': token.key, 'username': user.username}) 