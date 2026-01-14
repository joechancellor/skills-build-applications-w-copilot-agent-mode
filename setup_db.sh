#!/bin/bash
# Activate the virtual environment
source octofit-tracker/backend/venv/bin/activate

# Install dependencies just in case
pip install -r octofit-tracker/backend/requirements.txt

# Run migrations
python octofit-tracker/backend/manage.py makemigrations
python octofit-tracker/backend/manage.py migrate

echo "Database setup complete."
