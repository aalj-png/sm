@echo off
REM Student Management System - Quick Start Guide

echo.
echo 📚 Student Management System - Setup Guide
echo ==========================================
echo.

REM Check if Node.js is installed
where /q node
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org/
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

echo.
echo ✅ Dependencies installed successfully!
echo.

REM Create .env files if they don't exist
echo 🔧 Setting up environment files...

if not exist backend\.env (
    echo Creating backend\.env...
    copy backend\.env.example backend\.env
)

if not exist frontend\.env (
    echo Creating frontend\.env...
    copy frontend\.env.example frontend\.env
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB URI
echo 2. Update JWT_SECRET in backend\.env
echo 3. Make sure MongoDB is running
echo 4. Run: npm run dev
echo.
echo Happy coding! 🎉
