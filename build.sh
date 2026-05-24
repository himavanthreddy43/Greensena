#!/usr/bin/env bash

# 1. Build the React Frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# 2. Copy build to Flask static folder
echo "Copying React build to Flask static folder..."
rm -rf backend/static/*
mkdir -p backend/static
cp -r frontend/dist/* backend/static/

# 3. Install Backend Dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

echo "Build complete!"
