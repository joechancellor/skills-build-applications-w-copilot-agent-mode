#!/usr/bin/env python3
import subprocess
import sys

# Create virtual environment
print("Creating virtual environment...")
subprocess.run([sys.executable, "-m", "venv", "/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/venv"], check=True)

# Install requirements
print("Installing requirements...")
venv_python = "/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/venv/bin/python"
subprocess.run([venv_python, "-m", "pip", "install", "-r", "/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/requirements.txt"], check=True)

print("✓ Virtual environment created successfully!")
print("✓ Python requirements installed successfully!")
