@echo off
REM 🚀 STUDENT MANAGEMENT SYSTEM - AUTO DEPLOY & LAUNCH SCRIPT
REM
REM This script automates:
REM 1. Git initialization and configuration
REM 2. Adding and committing changes to GitHub
REM 3. Pushing code to GitHub
REM 4. Launching the frontend development server
REM
REM Usage:
REM   deploy.bat
REM   deploy.bat "Custom commit message"
REM
REM ===============================================

setlocal enabledelayedexpansion

REM ========================================
REM 🔧 CONFIGURATION - MODIFY THESE VALUES
REM ========================================

set GIT_USERNAME=aalj-png
set GIT_EMAIL=a.alj@esisa.ac.ma
set GITHUB_URL=https://github.com/aalj-png/sm.git
set BRANCH=main

REM Default commit message (can be overridden by command argument)
if "%~1"=="" (
    set COMMIT_MSG=Update: Student Management System
) else (
    set COMMIT_MSG=%~1
)

set FRONTEND_DIR=frontend

REM ========================================
REM 🎨 DISPLAY HEADER
REM ========================================

cls
color 0A
echo.
echo ===============================================================
echo  ^^ STUDENT MANAGEMENT SYSTEM - AUTO DEPLOY ^^ 
echo ===============================================================
echo.
echo Git User:    %GIT_USERNAME% ^(%GIT_EMAIL%^)
echo Repository:  %GITHUB_URL%
echo Branch:      %BRANCH%
echo Commit Msg:  %COMMIT_MSG%
echo.
echo ===============================================================
echo.

REM ========================================
REM 🔄 STEP 1: CHECK GIT INSTALLED
REM ========================================

echo [STEP 1] Checking if Git is installed...
git --version >nul 2>&1

if errorlevel 1 (
    color 0C
    echo ^[ERROR^] Git is not installed!
    echo Please download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

color 0A
echo [SUCCESS] Git is installed
echo.

REM ========================================
REM 🔄 STEP 2: INITIALIZE GIT
REM ========================================

echo [STEP 2] Checking if Git is initialized...

if not exist ".git" (
    echo Initializing Git repository...
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
REM 🔄 STEP 3: CONFIGURE GIT USER
REM ========================================

echo [STEP 3] Configuring Git user...

git config user.name "%GIT_USERNAME%"
git config user.email "%GIT_EMAIL%"

color 0A
echo [SUCCESS] Git user configured
echo Username: %GIT_USERNAME%
echo Email: %GIT_EMAIL%
echo.

REM ========================================
REM 🔄 STEP 4: CHECK FOR CHANGES
REM ========================================

echo [STEP 4] Checking for changes...

git status --porcelain | find /c /v "" >nul
set CHANGE_COUNT=0

for /f %%A in ('git status --porcelain ^| find /c /v ""') do set CHANGE_COUNT=%%A

if %CHANGE_COUNT% equ 0 (
    color 0E
    echo [WARNING] No changes detected
) else (
    color 0A
    echo [SUCCESS] Found %CHANGE_COUNT% changed file(s)
    echo.
    echo Changed files:
    for /f "tokens=*" %%F in ('git status --porcelain') do echo   %%F
)

echo.

REM ========================================
REM 🔄 STEP 5: STAGING FILES
REM ========================================

echo [STEP 5] Staging all files...

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
REM 🔄 STEP 6: CREATE COMMIT
REM ========================================

echo [STEP 6] Creating commit...

git commit -m "%COMMIT_MSG%"

if errorlevel 1 (
    color 0E
    echo [WARNING] No new changes to commit (or commit failed)
) else (
    color 0A
    echo [SUCCESS] Commit created: "%COMMIT_MSG%"
)

echo.

REM ========================================
REM 🔄 STEP 7: CONFIGURE REMOTE
REM ========================================

echo [STEP 7] Configuring GitHub remote...

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
    color 0A
    echo [SUCCESS] Remote already configured
)

echo.

REM ========================================
REM 🔄 STEP 8: RENAME BRANCH
REM ========================================

echo [STEP 8] Setting up branch...

git rev-parse --verify %BRANCH% >nul 2>&1

if errorlevel 1 (
    echo Renaming branch to "%BRANCH%"...
    git branch -M %BRANCH%
)

color 0A
echo [SUCCESS] Branch is "%BRANCH%"
echo.

REM ========================================
REM 🔄 STEP 9: PUSH TO GITHUB
REM ========================================

echo [STEP 9] Pushing to GitHub...
echo.
echo [INFO] If prompted, use your GitHub personal access token
echo [INFO] (not your password)
echo [INFO] See: https://github.com/settings/tokens
echo.

git push -u origin %BRANCH%

if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to push to GitHub!
    echo.
    echo Troubleshooting:
    echo  - Check internet connection
    echo  - Verify GitHub credentials
    echo  - Check repository permissions
    echo  - Ensure remote URL is correct
    echo.
    pause
    exit /b 1
)

color 0A
echo [SUCCESS] Code pushed to GitHub!
echo Repository: %GITHUB_URL%
echo.
echo Open this URL to verify your code:
echo %GITHUB_URL%
echo.
pause

REM ========================================
REM 🔄 STEP 10: LAUNCH DEVELOPMENT SERVER
REM ========================================

echo [STEP 10] Launching development server...
echo.

if not exist "%FRONTEND_DIR%" (
    color 0C
    echo [ERROR] Frontend directory not found: %FRONTEND_DIR%
    pause
    exit /b 1
)

color 0A
echo [SUCCESS] Changing to frontend directory...

cd %FRONTEND_DIR%

if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to change directory
    pause
    exit /b 1
)

color 0A
echo.
echo ===============================================================
echo [SUCCESS] DEPLOYMENT COMPLETE!
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
    echo   cd %FRONTEND_DIR%
    echo   npm run dev
    pause
    exit /b 1
)

REM ========================================
REM 🎉 SUCCESS
REM ========================================

color 0A
echo.
echo ===============================================================
echo [SUCCESS] All done!
echo ===============================================================
echo.
pause
