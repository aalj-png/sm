@echo off
REM 🚀 AUTOMATED PUSH TO GITHUB WITH TOKEN
REM This script uses your GitHub token to push code without prompting for password

setlocal enabledelayedexpansion

REM ========================================
REM 🔧 CONFIGURATION
REM ========================================

set GIT_USERNAME=aalj-png
set GIT_EMAIL=a.alj@esisa.ac.ma
set GITHUB_USERNAME=aalj-png
set GITHUB_REPO=sm
set BRANCH=main

REM Build the repository URL WITHOUT token (Git will use credential manager)
set GITHUB_URL=https://github.com/%GITHUB_USERNAME%/%GITHUB_REPO%.git

REM Enable credential caching
git config --global credential.helper wincred

REM ========================================
REM 🎨 DISPLAY HEADER
REM ========================================

cls
color 0A
echo.
echo ===============================================================
echo  ^^ AUTOMATED GITHUB PUSH WITH TOKEN ^^
echo ===============================================================
echo.
echo Repository: https://github.com/%GITHUB_USERNAME%/%GITHUB_REPO%
echo Branch:     %BRANCH%
echo.
echo ===============================================================
echo.

REM ========================================
REM 🔄 STEP 1: NAVIGATE TO PROJECT
REM ========================================

echo [STEP 1] Navigating to project directory...

cd /d c:\Users\HP\Desktop\tp6

if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to navigate to project directory
    pause
    exit /b 1
)

color 0A
echo [SUCCESS] Changed to project directory
echo.

REM ========================================
REM 🔄 STEP 2: INITIALIZE GIT
REM ========================================

echo [STEP 2] Initializing Git...

if not exist ".git" (
    git init
    if errorlevel 1 (
        color 0C
        echo [ERROR] Failed to initialize Git
        pause
        exit /b 1
    )
    color 0A
    echo [SUCCESS] Git initialized
) else (
    color 0A
    echo [SUCCESS] Git already initialized
)

echo.

REM ========================================
REM 🔄 STEP 3: CONFIGURE GIT
REM ========================================

echo [STEP 3] Configuring Git user...

git config user.name "%GIT_USERNAME%"
git config user.email "%GIT_EMAIL%"

color 0A
echo [SUCCESS] Git configured
echo Username: %GIT_USERNAME%
echo Email: %GIT_EMAIL%
echo.

REM ========================================
REM 🔄 STEP 4: STAGE FILES
REM ========================================

echo [STEP 4] Staging all files...

git add .

if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to stage files
    pause
    exit /b 1
)

color 0A
echo [SUCCESS] All files staged
echo.

REM ========================================
REM 🔄 STEP 5: CREATE COMMIT
REM ========================================

echo [STEP 5] Creating commit...

git commit -m "Update: Student Management System - React, Express, MongoDB, JWT"

if errorlevel 1 (
    color 0E
    echo [WARNING] No new changes to commit
) else (
    color 0A
    echo [SUCCESS] Commit created
)

echo.

REM ========================================
REM 🔄 STEP 6: CONFIGURE REMOTE
REM ========================================

echo [STEP 6] Configuring GitHub remote...

git remote get-url origin >nul 2>&1

if errorlevel 1 (
    echo Adding GitHub remote...
    git remote add origin %GITHUB_URL%
    
    if errorlevel 1 (
        color 0C
        echo [ERROR] Failed to add remote
        pause
        exit /b 1
    )
    
    color 0A
    echo [SUCCESS] Remote added
) else (
    echo Updating GitHub remote...
    git remote set-url origin %GITHUB_URL%
    color 0A
    echo [SUCCESS] Remote updated with token
)

echo.

REM ========================================
REM 🔄 STEP 7: SETUP BRANCH
REM ========================================

echo [STEP 7] Setting up branch...

git rev-parse --verify %BRANCH% >nul 2>&1

if errorlevel 1 (
    echo Renaming branch to "%BRANCH%"...
    git branch -M %BRANCH%
)

color 0A
echo [SUCCESS] Branch is "%BRANCH%"
echo.

REM ========================================
REM 🔄 STEP 8: PUSH TO GITHUB
REM ========================================

echo [STEP 8] Pushing to GitHub...
echo.

git push -u origin %BRANCH%

if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to push to GitHub!
    echo.
    echo Troubleshooting:
    echo  - Check internet connection
    echo  - Verify token is valid
    echo  - Check repository permissions
    echo.
    pause
    exit /b 1
)

color 0A
echo.
echo ===============================================================
echo [SUCCESS] CODE PUSHED TO GITHUB!
echo ===============================================================
echo.
echo Repository: https://github.com/%GITHUB_USERNAME%/%GITHUB_REPO%
echo Branch: %BRANCH%
echo.
echo Opening repository in browser...
start https://github.com/%GITHUB_USERNAME%/%GITHUB_REPO%
echo.
pause

REM ========================================
REM 🔄 STEP 9: LAUNCH DEVELOPMENT SERVER
REM ========================================

echo [STEP 9] Launching development server...
echo.

if not exist "frontend" (
    color 0C
    echo [ERROR] Frontend directory not found
    pause
    exit /b 1
)

color 0A
echo [SUCCESS] Changing to frontend directory...

cd frontend

if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to change directory
    pause
    exit /b 1
)

color 0A
echo.
echo ===============================================================
echo [SUCCESS] READY TO START APP!
echo ===============================================================
echo.
echo 🚀 Starting: npm run dev
echo.
echo Your app will open at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
echo ===============================================================
echo.

REM Start dev server
npm run dev

if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to start development server
    echo.
    echo Try manually:
    echo   cd frontend
    echo   npm run dev
    pause
    exit /b 1
)
