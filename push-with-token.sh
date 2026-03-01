#!/bin/bash

#################################################################################
# 🚀 AUTOMATED PUSH TO GITHUB WITH TOKEN
# This script uses your GitHub token to push code without prompting for password
#################################################################################

set -e

# ========================================
# 🔧 CONFIGURATION
# ========================================

GIT_USERNAME="aalj-png"
GIT_EMAIL="a.alj@esisa.ac.ma"
GITHUB_USERNAME="aalj-png"
GITHUB_REPO="sm"
BRANCH="main"

# Build the repository URL WITHOUT token (Git will use credential manager)
GITHUB_URL="https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}.git"

# Enable credential caching
git config --global credential.helper cache

# ========================================
# 🎨 Colors for output
# ========================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

# ========================================
# 📋 Functions
# ========================================

log_section() {
    echo ""
    echo "================================================================"
    echo -e "${BOLD}${BLUE}$1${NC}"
    echo "================================================================"
    echo ""
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ========================================
# 🎬 MAIN SCRIPT
# ========================================

clear

log_section "🚀 AUTOMATED GITHUB PUSH WITH TOKEN"

echo "Repository: https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}"
echo "Branch:     ${BRANCH}"
echo ""

# ========================================
# STEP 1: Navigate to project
# ========================================

log_section "STEP 1️⃣ - NAVIGATING TO PROJECT"

cd "$(dirname "$0")" || exit 1

log_success "Changed to project directory"

# ========================================
# STEP 2: Initialize Git
# ========================================

log_section "STEP 2️⃣ - GIT INITIALIZATION"

if [ ! -d ".git" ]; then
    log_info "Initializing Git repository..."
    git init
    log_success "Git initialized"
else
    log_success "Git already initialized"
fi

# ========================================
# STEP 3: Configure Git
# ========================================

log_section "STEP 3️⃣ - CONFIGURING GIT USER"

git config user.name "$GIT_USERNAME"
git config user.email "$GIT_EMAIL"

log_success "Git user configured"
log_info "Username: $GIT_USERNAME"
log_info "Email: $GIT_EMAIL"

# ========================================
# STEP 4: Stage files
# ========================================

log_section "STEP 4️⃣ - STAGING FILES"

git add .
log_success "All files staged"

# ========================================
# STEP 5: Create commit
# ========================================

log_section "STEP 5️⃣ - CREATING COMMIT"

if git commit -m "Update: Student Management System - React, Express, MongoDB, JWT" 2>/dev/null; then
    log_success "Commit created"
else
    log_warning "No new changes to commit"
fi

# ========================================
# STEP 6: Configure remote
# ========================================

log_section "STEP 6️⃣ - CONFIGURING REMOTE"

if git remote get-url origin &> /dev/null; then
    log_info "Updating GitHub remote with token..."
    git remote set-url origin "$GITHUB_URL"
    log_success "Remote updated"
else
    log_info "Adding GitHub remote..."
    git remote add origin "$GITHUB_URL"
    log_success "Remote added"
fi

# ========================================
# STEP 7: Setup branch
# ========================================

log_section "STEP 7️⃣ - SETTING UP BRANCH"

if git rev-parse --verify "$BRANCH" &> /dev/null; then
    log_success "Branch \"$BRANCH\" already exists"
else
    log_info "Renaming branch to \"$BRANCH\"..."
    git branch -M "$BRANCH"
fi

log_success "Using branch: $BRANCH"

# ========================================
# STEP 8: Push to GitHub
# ========================================

log_section "STEP 8️⃣ - PUSHING TO GITHUB"

if git push -u origin "$BRANCH"; then
    log_success "Code pushed to GitHub!"
    log_info "Repository: https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}"
    echo ""
    log_info "Opening GitHub in browser..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}"
        fi
    fi
else
    log_error "Failed to push to GitHub!"
    exit 1
fi

# ========================================
# STEP 9: Launch development server
# ========================================

log_section "STEP 9️⃣ - LAUNCHING DEVELOPMENT SERVER"

if [ ! -d "frontend" ]; then
    log_error "Frontend directory not found"
    exit 1
fi

log_success "Changing to frontend directory..."
cd frontend

echo ""
log_section "🚀 DEPLOYMENT COMPLETE!"

echo "Starting: npm run dev"
echo ""
log_info "Your app will open at: http://localhost:5173"
log_info "Press Ctrl+C to stop the server"
echo ""

npm run dev

if [ $? -ne 0 ]; then
    log_error "Failed to start development server"
    exit 1
fi
