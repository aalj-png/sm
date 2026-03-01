@echo off
REM 🔧 Clean Git History - Remove all commits with exposed secrets
REM This completely resets git and creates a fresh commit history

setlocal enabledelayedexpansion

cls
color 0A
echo.
echo ============================================================
echo 🔧 CLEANING GIT HISTORY
echo ============================================================
echo.
echo This will:
echo   1. Delete all existing git commits (removes exposed secrets)
echo   2. Re-initialize git with a clean history
echo   3. Stage all current files
echo   4. Create a single clean commit
echo.
echo WARNING: This CANNOT be undone. Press Ctrl+C to cancel.
echo.
pause

REM Step 1: Remove existing .git folder
echo.
echo [1/5] Removing old git history...
if exist .git (
    rmdir /s /q .git
    echo ✅ Old git history removed
) else (
    echo ℹ️  No existing git history found
)

REM Step 2: Initialize fresh git
echo.
echo [2/5] Initializing fresh git repository...
git init
git config user.name "aalj-png"
git config user.email "a.alj@esisa.ac.ma"
echo ✅ Git initialized

REM Step 3: Stage all files
echo.
echo [3/5] Staging all files...
git add .
echo ✅ Files staged

REM Step 4: Create commit
echo.
echo [4/5] Creating clean commit...
git commit -m "Initial commit: Student Management System - React, Express, MongoDB, JWT"
echo ✅ Commit created

REM Step 5: Add remote
echo.
echo [5/5] Adding GitHub remote...
git remote add origin https://github.com/aalj-png/sm.git
git branch -M main
echo ✅ Remote configured

echo.
echo ============================================================
echo ✅ CLEAN HISTORY COMPLETE!
echo ============================================================
echo.
echo Next step: Run your chosen secure push script
echo.
echo Options:
echo   Option 1 (Windows): secure-push.bat "your-token"
echo   Option 2 (Node.js): node secure-push.js "your-token"
echo.
echo Example:
echo   secure-push.bat "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo.
pause
