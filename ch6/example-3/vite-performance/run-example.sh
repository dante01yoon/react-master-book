#!/bin/bash

# This script builds and runs the Vite performance example

# Display header
echo "========================="
echo "Vite Performance Examples"
echo "========================="
echo

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo
fi

# Run the development server
echo "Starting Vite development server..."
echo "Open your browser and navigate to the URL shown below"
echo "Make sure to open DevTools (Network tab) to observe dependency pre-bundling and on-demand transpilation"
echo
npm run dev 