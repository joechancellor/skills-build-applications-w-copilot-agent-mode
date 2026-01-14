from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')
        self.user1 = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel)
        self.user2 = User.objects.create(name='Batman', email='batman@dc.com', team=dc)
        self.workout = Workout.objects.create(name='Hero HIIT', description='High intensity', suggested_for='Marvel')
        self.activity = Activity.objects.create(user=self.user1, type='Running', duration=30, calories=300, date='2026-01-01')
        self.leaderboard = Leaderboard.objects.create(team=marvel, points=100)

    def test_user_creation(self):
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(self.user1.team.name, 'Marvel')

    def test_activity_creation(self):
        self.assertEqual(Activity.objects.count(), 1)
        self.assertEqual(self.activity.type, 'Running')

    def test_workout_creation(self):
        self.assertEqual(Workout.objects.count(), 1)
        self.assertEqual(self.workout.suggested_for, 'Marvel')

    def test_leaderboard_creation(self):
        self.assertEqual(Leaderboard.objects.count(), 1)
        self.assertEqual(self.leaderboard.points, 100)
