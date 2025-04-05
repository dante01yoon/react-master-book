#!/bin/bash

# RSBuild Demo Setup Script
# This script helps you set up and run the RSBuild demo with Tailwind CSS

echo "=== RSBuild Demo Setup ==="
echo "This script will help you set up and run the RSBuild demo with Tailwind CSS"
echo ""

# Create directory for logs
mkdir -p logs

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

echo "1️⃣ Installing dependencies..."
echo "This will install React, RSBuild, Tailwind CSS, and other dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed. Trying with specific versions..."
    npm install @rsbuild/core@0.5.1 @rsbuild/plugin-react@0.5.1 @rsbuild/plugin-postcss@0.5.1 @types/react@18.2.28 @types/react-dom@18.2.13 react@18.2.0 react-dom@18.2.0 typescript@5.2.2 tailwindcss@3.3.2 postcss@8.4.24 autoprefixer@10.4.14
fi

echo "2️⃣ Creating RSBuild configuration with Tailwind CSS support..."
cat > rsbuild.config.js << EOL
const { defineConfig } = require('@rsbuild/core');
const { pluginReact } = require('@rsbuild/plugin-react');

module.exports = defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss: {
      // PostCSS is now built into RSBuild
      postcssOptions: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    }
  },
  source: {
    entry: {
      index: './src/index.tsx'
    }
  }
});
EOL

echo "3️⃣ Creating Tailwind CSS configuration..."
cat > tailwind.config.js << EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1',
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        secondary: {
          light: '#10b981',
          DEFAULT: '#059669',
          dark: '#047857',
        },
        accent: {
          light: '#f43f5e',
          DEFAULT: '#e11d48',
          dark: '#be123c',
        },
      },
    },
  },
  plugins: [],
}
EOL

echo "4️⃣ Creating PostCSS configuration..."
cat > postcss.config.js << EOL
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOL

echo "5️⃣ Building the project..."
npm run build > logs/build.log 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check logs/build.log for details."
    echo "This example may require specific versions of RSBuild that match the configuration."
    echo "Try updating the rsbuild.config.js file based on the error messages."
else
    echo "✅ Build successful!"
    
    echo "6️⃣ Starting preview server..."
    echo "Preview server will start in background. Press Ctrl+C to stop it when done."
    npm run preview > logs/preview.log 2>&1 &
    preview_pid=$!
    
    # Wait a moment for the server to start
    sleep 3
    
    # Open the browser
    if command -v open &> /dev/null; then
        open http://localhost:3000
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
    elif command -v start &> /dev/null; then
        start http://localhost:3000
    else
        echo "Please open http://localhost:3000 in your browser"
    fi
    
    echo ""
    echo "📊 Build Performance Comparison:"
    echo "-----------------------------"
    echo "Tool      | Build Time"
    echo "-----------------------------"
    echo "RSBuild   | <1 second"
    echo "CRA       | ~10-15 seconds"
    echo "webpack   | ~20-30 seconds"
    echo "-----------------------------"
    
    echo ""
    echo "📘 Documentation is available in the docs/ directory"
    echo ""
    echo "To stop the preview server, press Ctrl+C"
    
    # Wait for user to press Ctrl+C
    trap "kill $preview_pid 2>/dev/null" INT
    wait $preview_pid
fi

echo ""
echo "Thank you for trying the RSBuild demo with Tailwind CSS!" 