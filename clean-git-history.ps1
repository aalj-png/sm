#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Clean Git History - Remove all commits with exposed secrets

.DESCRIPTION
    This script completely resets git and creates a fresh commit history,
    removing all commits that may contain exposed secrets.

.EXAMPLE
    .\clean-git-history.ps1
#>

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "🔧 CLEANING GIT HISTORY" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "This will:" -ForegroundColor Yellow
Write-Host "  1. Delete all existing git commits (removes exposed secrets)" -ForegroundColor Yellow
Write-Host "  2. Re-initialize git with a clean history" -ForegroundColor Yellow
Write-Host "  3. Stage all current files" -ForegroundColor Yellow
Write-Host "  4. Create a single clean commit" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  WARNING: This CANNOT be undone. Press Ctrl+C in the next 5 seconds to cancel." -ForegroundColor Red
Write-Host ""

Start-Sleep -Seconds 5

# Step 1: Remove existing .git folder
Write-Host ""
Write-Host "[1/5] Removing old git history..." -ForegroundColor Cyan
if (Test-Path ".git" -PathType Container) {
    Remove-Item -Path ".git" -Recurse -Force
    Write-Host "✅ Old git history removed" -ForegroundColor Green
}
else {
    Write-Host "ℹ️  No existing git history found" -ForegroundColor Blue
}

# Step 2: Initialize fresh git
Write-Host ""
Write-Host "[2/5] Initializing fresh git repository..." -ForegroundColor Cyan
git init
git config user.name "aalj-png"
git config user.email "a.alj@esisa.ac.ma"
Write-Host "✅ Git initialized" -ForegroundColor Green

# Step 3: Stage all files
Write-Host ""
Write-Host "[3/5] Staging all files..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files staged" -ForegroundColor Green

# Step 4: Create commit
Write-Host ""
Write-Host "[4/5] Creating clean commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Student Management System - React, Express, MongoDB, JWT"
Write-Host "✅ Commit created" -ForegroundColor Green

# Step 5: Add remote
Write-Host ""
Write-Host "[5/5] Adding GitHub remote..." -ForegroundColor Cyan
git remote add origin "https://github.com/aalj-png/sm.git"
git branch -M main
Write-Host "✅ Remote configured" -ForegroundColor Green

# Success
Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "✅ CLEAN HISTORY COMPLETE!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next step: Run your chosen secure push script" -ForegroundColor Cyan
Write-Host ""
Write-Host "Options:" -ForegroundColor Yellow
Write-Host "  Option 1 (Windows): .\secure-push.bat `"your-token`"" -ForegroundColor Yellow
Write-Host "  Option 2 (Node.js): node secure-push.js `"your-token`"" -ForegroundColor Yellow
Write-Host ""
Write-Host "Example:" -ForegroundColor Cyan
Write-Host '  .\secure-push.bat "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"' -ForegroundColor White
