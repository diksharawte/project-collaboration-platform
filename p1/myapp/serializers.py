from rest_framework import serializers
from .models import Project, ContributionRequest, Contributor, Task

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['owner']


class ContributionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContributionRequest
        fields = '__all__'
        read_only_fields = ['user', 'status']


class ContributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contributor
        fields = '__all__'        

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'        
