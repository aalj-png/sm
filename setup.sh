#!/bin/bash

# Student Management System - Quick Start Guide

echo "📚 Student Management System - Setup Guide"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env files if they don't exist
echo "🔧 Setting up environment files..."

if [ ! -f backend/.env ]; then
    echo "Creating backend/.env..."
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env ]; then
    echo "Creating frontend/.env..."
    cp frontend/.env.example frontend/.env
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI"
echo "2. Update JWT_SECRET in backend/.env"
echo "3. Make sure MongoDB is running"
echo "4. Run: npm run dev"
echo ""
echo "Happy coding! 🎉"
