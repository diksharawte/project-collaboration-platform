from django.urls import path
from .views import ProjectListCreateView, ContributionRequestListCreateView, ContributorListCreateView, TaskListCreateView, signup, login,ContributionRequestUpdateView

urlpatterns = [
path('signup/', signup, name='signup'),
path('login/', login, name= 'login'),
path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
path('requests/', ContributionRequestListCreateView.as_view(), name='request-list-create'),
 path('requests/<int:pk>/', ContributionRequestUpdateView.as_view(), name='request-update'),
path('contributors/', ContributorListCreateView.as_view(), name='contributor-list-create'),
path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),


]