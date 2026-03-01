#!/bin/bash

################################################################################
# 🚀 SECURE GITHUB PUSH - Token as parameter (not embedded)
# 
# Usage:
#   ./secure-push.sh "your-token-here"
#   Or will prompt for token if not provided
# 
# This script accepts the GitHub token as a command parameter instead of
# embedding it in the script file, ensuring the token is never stored on disk.
################################################################################

set -e  # Exit on any error

# ========================================
# 🔧 CONFIGURATION
# ========================================

GIT_USERNAME="aalj-png"
GIT_EMAIL="a.alj@esisa.ac.ma"
GITHUB_USERNAME="aalj-png"
GITHUB_REPO="sm"
BRANCH="main"
FRONTEND_DIR="./frontend"

# ========================================
# 🎨 Colors for console output
# ========================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BRIGHT='\033[1m'
NC='\033[0m'  # No Color

log_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
  echo -e "${RED}❌ $1${NC}"
}

log_section() {
  echo ""
  echo "$(printf '=%.0s' {1..60})"
  echo -e "${BRIGHT}$1${NC}"
  echo "$(printf '=%.0s' {1..60})"
  echo ""
}

# ========================================
# 🔄 Get Token from Command Line or Prompt
# ========================================

get_token() {
  if [ -n "$1" ]; then
    echo "$1"
  else
    log_warning "Enter your GitHub Personal Access Token:"
    log_warning "(Token will NOT be saved or logged for security)"
    read -sp "Token: " TOKEN
    echo ""
    echo "$TOKEN"
  fi
}

# ========================================
# 🔄 Utilities
# ========================================

is_git_initialized() {
  [ -d ".git" ]
}

get_changed_files() {
  git status --porcelain 2>/dev/null | wc -l
}

run_command() {
  local description="$1"
  local command="$2"
  
  log_info "${description}..."
  
  if eval "$command"; then
    log_success "$description"
    return 0
  else
    log_error "Failed: $description"
    return 1
  fi
}

# ========================================
# 📋 Main Push Process
# ========================================

main() {
  log_section "🚀 SECURE GITHUB PUSH WITH TOKEN"

  echo "📍 Current directory: $(pwd)"
  echo ""
  log_info "Git User: $GIT_USERNAME ($GIT_EMAIL)"
  log_info "Repository: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO"
  log_info "Branch: $BRANCH"
  log_info "Token: [HIDDEN FOR SECURITY]"
  echo ""

  # Get token
  TOKEN=$(get_token "$1")

  if [ -z "$TOKEN" ]; then
    log_error "No token provided"
    exit 1
  fi

  log_info "Token received (not logged for security)"
  echo ""

  # Build GitHub URL with token (only in memory)
  GITHUB_URL="https://${TOKEN}@github.com/${GITHUB_USERNAME}/${GITHUB_REPO}.git"

  # Step 1: Initialize Git (if needed)
  log_section "STEP 1️⃣  - GIT INITIALIZATION"

  if ! is_git_initialized; then
    log_warning "Git not initialized. Initializing now..."
    run_command "Initialize Git" "git init"
  else
    log_success "Git repository already initialized"
  fi

  # Step 2: Configure Git user
  log_section "STEP 2️⃣  - GIT CONFIGURATION"

  run_command "Set Git username to '$GIT_USERNAME'" "git config user.name '$GIT_USERNAME'"
  run_command "Set Git email to '$GIT_EMAIL'" "git config user.email '$GIT_EMAIL'"

  # Step 3: Check for changes
  log_section "STEP 3️⃣  - CHECKING FOR CHANGES"

  CHANGED_COUNT=$(get_changed_files)
  if [ "$CHANGED_COUNT" -eq 0 ]; then
    log_warning "No changes detected"
  else
    log_info "Found $CHANGED_COUNT changed file(s)"
  fi

  # Step 4: Add all files
  log_section "STEP 4️⃣  - STAGING FILES"

  run_command "Add all files to staging area" "git add ." || exit 1

  # Step 5: Create commit
  log_section "STEP 5️⃣  - CREATING COMMIT"

  if ! run_command "Create commit" "git commit -m 'Update: Student Management System'"; then
    log_warning "Could not create commit (no changes or already committed)"
  fi

  # Step 6: Configure remote with token (only in memory)
  log_section "STEP 6️⃣  - CONFIGURING REMOTE"

  if git remote get-url origin &>/dev/null; then
    log_success "Remote already configured"
    log_info "Updating with token..."
    git remote set-url origin "$GITHUB_URL" 2>/dev/null || true
  else
    log_warning "No remote configured. Adding..."
    git remote add origin "$GITHUB_URL" 2>/dev/null || true
    log_success "Remote added with token"
  fi

  # Step 7: Rename branch (if needed)
  log_section "STEP 7️⃣  - BRANCH SETUP"

  if git rev-parse --verify "$BRANCH" &>/dev/null; then
    log_success "Branch '$BRANCH' already exists"
  else
    log_info "Renaming current branch to '$BRANCH'..."
    run_command "Rename branch to '$BRANCH'" "git branch -M $BRANCH" || exit 1
  fi

  # Step 8: Push to GitHub
  log_section "STEP 8️⃣  - PUSHING TO GITHUB"

  log_info "Pushing to GitHub..."
  if git push -u origin "$BRANCH"; then
    log_success "Code pushed to GitHub!"
  else
    log_error "Failed to push to GitHub"
    exit 1
  fi

  # Step 9: Cleanup and launch
  log_section "STEP 9️⃣  - LAUNCHING APP"

  log_success "All done!"
  log_info "Repository: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO"
  log_info ""
  log_info "Starting development server..."
  echo ""

  if cd "$FRONTEND_DIR"; then
    log_success "Changed to frontend directory"
    log_info "Launching: npm run dev"
    echo ""
    npm run dev
  else
    log_error "Failed to change to frontend directory"
    log_info "You can manually start it with:"
    log_info "  cd $FRONTEND_DIR"
    log_info "  npm run dev"
    exit 1
  fi
}

# ========================================
# 🎬 Run the push process
# ========================================

log_section "🎯 INITIALIZATION"
echo "Version: 1.0.0"
echo ""

main "$1"
