#!/bin/bash
cd /workspaces/skills-build-applications-w-copilot-agent-mode
python3 -m venv octofit-tracker/backend/venv
source octofit-tracker/backend/venv/bin/activate
pip install -r octofit-tracker/backend/requirements.txt
echo "Virtual environment created and dependencies installed successfully!"
