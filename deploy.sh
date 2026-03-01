#!/bin/bash

#################################################################################
# 🚀 STUDENT MANAGEMENT SYSTEM - AUTO DEPLOY & LAUNCH SCRIPT
#
# This script automates:
# 1. Git initialization and configuration
# 2. Adding and committing changes to GitHub
# 3. Pushing code to GitHub
# 4. Launching the frontend development server
#
# Usage:
#   bash deploy.sh
#   bash deploy.sh "Custom commit message"
#   chmod +x deploy.sh && ./deploy.sh
#
#################################################################################

set -e

# ========================================
# 🔧 CONFIGURATION - MODIFY THESE VALUES
# ========================================

GIT_USERNAME="aalj-png"
GIT_EMAIL="a.alj@esisa.ac.ma"
GITHUB_URL="https://github.com/aalj-png/sm.git"
BRANCH="main"

# Default commit message (can be overridden by command argument)
COMMIT_MSG="${1:-Update: Student Management System}"

FRONTEND_DIR="frontend"

# ========================================
# 🎨 Colors for output
# ========================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

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

log_section "🚀 STUDENT MANAGEMENT SYSTEM - AUTO DEPLOY"

echo "Git User:    $GIT_USERNAME ($GIT_EMAIL)"
echo "Repository:  $GITHUB_URL"
echo "Branch:      $BRANCH"
echo "Commit Msg:  $COMMIT_MSG"
echo ""

# ========================================
# STEP 1: Check Git installed
# ========================================

log_section "STEP 1️⃣ - CHECKING GIT INSTALLATION"

if ! command -v git &> /dev/null; then
    log_error "Git is not installed!"
    log_info "Install from: https://git-scm.com/download/mac"
    exit 1
fi

log_success "Git is installed"
git --version

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
# STEP 3: Configure Git user
# ========================================

log_section "STEP 3️⃣ - CONFIGURING GIT USER"

git config user.name "$GIT_USERNAME"
git config user.email "$GIT_EMAIL"

log_success "Git user configured"
log_info "Username: $GIT_USERNAME"
log_info "Email: $GIT_EMAIL"

# ========================================
# STEP 4: Check for changes
# ========================================

log_section "STEP 4️⃣ - CHECKING FOR CHANGES"

CHANGE_COUNT=$(git status --porcelain | wc -l)

if [ "$CHANGE_COUNT" -eq 0 ]; then
    log_warning "No changes detected"
else
    log_success "Found $CHANGE_COUNT changed file(s)"
    echo ""
    log_info "Changed files:"
    git status --porcelain | head -20
    if [ "$CHANGE_COUNT" -gt 20 ]; then
        echo "... and $((CHANGE_COUNT - 20)) more files"
    fi
fi

# ========================================
# STEP 5: Stage files
# ========================================

log_section "STEP 5️⃣ - STAGING FILES"

git add .
log_success "All files staged"

# ========================================
# STEP 6: Create commit
# ========================================

log_section "STEP 6️⃣ - CREATING COMMIT"

log_info "Commit message: \"$COMMIT_MSG\""

if git commit -m "$COMMIT_MSG" 2>/dev/null; then
    log_success "Commit created"
else
    log_warning "No new changes to commit (or commit failed)"
fi

# ========================================
# STEP 7: Configure remote
# ========================================

log_section "STEP 7️⃣ - CONFIGURING REMOTE"

if git remote get-url origin &> /dev/null; then
    log_success "Remote already configured"
    git remote get-url origin
else
    log_info "Adding GitHub remote..."
    git remote add origin "$GITHUB_URL"
    log_success "Remote added: $GITHUB_URL"
fi

# ========================================
# STEP 8: Setup branch
# ========================================

log_section "STEP 8️⃣ - SETTING UP BRANCH"

if git rev-parse --verify "$BRANCH" &> /dev/null; then
    log_success "Branch \"$BRANCH\" already exists"
else
    log_info "Renaming branch to \"$BRANCH\"..."
    git branch -M "$BRANCH"
fi

log_success "Using branch: $BRANCH"

# ========================================
# STEP 9: Push to GitHub
# ========================================

log_section "STEP 9️⃣ - PUSHING TO GITHUB"

log_warning "⚠️  IMPORTANT:"
log_info "If prompted for credentials, use your GitHub personal access token"
log_info "Get one at: https://github.com/settings/tokens"
echo ""

if git push -u origin "$BRANCH"; then
    log_success "Code pushed to GitHub!"
    log_info "Repository: $GITHUB_URL"
    echo ""
    log_info "Opening GitHub in browser..."
    
    # Open in browser (macOS/Linux)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "$GITHUB_URL"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "$GITHUB_URL"
        fi
    fi
else
    log_error "Failed to push to GitHub!"
    echo ""
    log_info "Troubleshooting:"
    echo "  - Check internet connection"
    echo "  - Verify GitHub credentials"
    echo "  - Check repository permissions"
    echo "  - Ensure remote URL is correct"
    exit 1
fi

# ========================================
# STEP 10: Launch development server
# ========================================

log_section "STEP 🔟 - LAUNCHING DEVELOPMENT SERVER"

if [ ! -d "$FRONTEND_DIR" ]; then
    log_error "Frontend directory not found: $FRONTEND_DIR"
    exit 1
fi

log_success "Changing to frontend directory..."
cd "$FRONTEND_DIR"

echo ""
log_section "🚀 DEPLOYMENT COMPLETE!"

echo "Starting: npm run dev"
echo ""
log_info "Your app will open at: http://localhost:5173"
log_info "Press Ctrl+C to stop the server"
echo ""

# Start dev server
npm run dev

if [ $? -ne 0 ]; then
    log_error "Failed to start development server"
    echo ""
    log_info "Try manually:"
    echo "  cd $FRONTEND_DIR"
    echo "  npm run dev"
    exit 1
fi
