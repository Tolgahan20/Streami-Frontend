#!/bin/bash

echo "🔄 Restarting Next.js development server..."

# Kill existing Next.js processes
pkill -f "next dev" 2>/dev/null || true

# Wait a moment for processes to fully terminate
sleep 2

# Start the development server
echo "🚀 Starting development server..."
npm run dev
