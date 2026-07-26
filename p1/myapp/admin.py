from django.contrib import admin
from .models import Project, ContributionRequest, Contributor, Task

admin.site.register(Project)
admin.site.register(ContributionRequest)
admin.site.register(Contributor)
admin.site.register(Task)

# Register your models here.
