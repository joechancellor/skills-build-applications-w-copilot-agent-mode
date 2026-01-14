#!/bin/bash
set -e

echo "🔄 Restarting OctoFit Tracker servers..."

# Kill existing processes
pkill -f "react-scripts" 2>/dev/null || true
pkill -f "manage.py" 2>/dev/null || true

# Wait for processes to stop
sleep 3

# Navigate to backend directory and start Django
cd "/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend"

echo "🚀 Starting Django server..."
source venv/bin/activate
export CODESPACE_NAME="${CODESPACE_NAME}"
nohup python manage.py runserver 0.0.0.0:8000 > django.log 2>&1 &
DJANGO_PID=$!
echo "Django started with PID: $DJANGO_PID"

# Wait for Django to start
sleep 5

# Navigate to frontend directory and start React
cd "/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/frontend"

echo "🚀 Starting React server..."
export PORT=3000
export REACT_APP_CODESPACE_NAME="${CODESPACE_NAME}"
echo "React will proxy /api/* requests to http://localhost:8000"
nohup npm start > react.log 2>&1 &
REACT_PID=$!
echo "React started with PID: $REACT_PID"

# Wait a moment and check status
sleep 5

echo "🌐 URLs:"
echo "Django API: https://${CODESPACE_NAME}-8000.app.github.dev/api/"
echo "React App: https://${CODESPACE_NAME}-3000.app.github.dev"

echo "✅ Both servers should now be running!"

# Show processes
echo "Running processes:"
ps aux | grep -E "(manage.py|react-scripts)" | grep -v grep || true

echo "Setup complete!"