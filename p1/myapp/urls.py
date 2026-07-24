from django.urls import path
from .views import ProjectListCreateView, ContributionRequestListCreateView, ContributorListCreateView, TaskListCreateView, signup, login

urlpatterns = [
path('signup/', signup, name='signup'),
path('login/', login, name= 'login'),
path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
path('request/', ContributionRequestListCreateView.as_view(), name='request-list-create'),
path('contributors/', ContributorListCreateView.as_view(), name='contributor-list-create'),
path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),


]