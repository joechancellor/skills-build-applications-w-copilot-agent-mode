from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TeamViewSet, ActivityViewSet, WorkoutViewSet, LeaderboardViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
import os

def build_api_url(request, endpoint):
    """Build API URL for Codespace or localhost"""
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        return f'https://{codespace_name}-8000.app.github.dev/api/{endpoint}/'
    else:
        return request.build_absolute_uri(f'/api/{endpoint}/')

@api_view(['GET'])
def api_root(request):
    """API root view that returns all available endpoints"""
    return Response({
        'users': build_api_url(request, 'users'),
        'teams': build_api_url(request, 'teams'),
        'activities': build_api_url(request, 'activities'),
        'workouts': build_api_url(request, 'workouts'),
        'leaderboard': build_api_url(request, 'leaderboard'),
    })

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api_root'),
]
