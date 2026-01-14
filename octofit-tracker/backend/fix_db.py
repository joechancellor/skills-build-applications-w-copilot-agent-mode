import os
import sys
from django.core.management import execute_from_command_line

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')

if __name__ == '__main__':
    print("Running makemigrations...")
    execute_from_command_line(['manage.py', 'makemigrations'])
    print("Running migrate...")
    execute_from_command_line(['manage.py', 'migrate'])
    print("Done.")
