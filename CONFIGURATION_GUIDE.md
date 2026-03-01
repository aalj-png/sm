# 🎓 Configuration Guide for Students

## Overview

This guide shows you how to **configure the deployment scripts for your own projects**.

You can use these scripts for ANY project:
- Web applications
- Student projects
- Learning exercises
- Team collaborations
- Open source contributions

---

## 🔧 Step 1: Find Your Configuration Section

### Windows (deploy.bat)

Look for this section near the top:

```batch
REM ========================================
REM 🔧 CONFIGURATION - MODIFY THESE VALUES
REM ========================================

set GIT_USERNAME=aalj-png
set GIT_EMAIL=a.alj@esisa.ac.ma
set GITHUB_URL=https://github.com/aalj-png/sm.git
set BRANCH=main
```

### macOS/Linux (deploy.sh)

Look for this section near the top:

```bash
# ========================================
# 🔧 CONFIGURATION - MODIFY THESE VALUES
# ========================================

GIT_USERNAME="aalj-png"
GIT_EMAIL="a.alj@esisa.ac.ma"
GITHUB_URL="https://github.com/aalj-png/sm.git"
BRANCH="main"
```

### Node.js (deploy.js)

Look for this section:

```javascript
const CONFIG = {
  // Your GitHub username and email
  gitUsername: 'aalj-png',
  gitEmail: 'a.alj@esisa.ac.ma',
  
  // Your GitHub repository URL
  githubUrl: 'https://github.com/aalj-png/sm.git',
  
  // Branch name (usually 'main' or 'master')
  branch: 'main',
};
```

---

## 🛠️ Step 2: Get Your Information

### Find Your GitHub Username

1. Go to https://github.com
2. Sign in
3. Click your profile picture (top right)
4. Click "Your profile"
5. Your username appears at the top of the page
   - Example: `aalj-png`

### Find Your Email

Use the email associated with your GitHub account:
```
a.alj@esisa.ac.ma
```

### Find Your Repository URL

1. Go to your GitHub repository
2. Click the green **"Code"** button
3. Copy the HTTPS URL
   - Example: `https://github.com/aalj-png/sm.git`

### Find Your Branch Name

Usually one of:
- `main` (newer default)
- `master` (older default)

Check with:
```bash
git branch -a
```

---

## 📝 Step 3: Edit the Configuration

### Windows Users: Using Notepad

```
1. Right-click deploy.bat
2. Select "Edit"
3. Find the CONFIGURATION section
4. Update the values
5. Save (Ctrl+S)
6. Close notepad
```

**Example changes:**

```batch
set GIT_USERNAME=john_doe
set GIT_EMAIL=john@example.com
set GITHUB_URL=https://github.com/john_doe/my-awesome-app.git
set BRANCH=main
```

### macOS/Linux Users: Using Terminal

```bash
# Edit with nano
nano deploy.sh

# Or with vim
vim deploy.sh

# Or with your preferred editor
code deploy.sh  # VS Code
```

**Find and replace these lines:**

```bash
GIT_USERNAME="john_doe"
GIT_EMAIL="john@example.com"
GITHUB_URL="https://github.com/john_doe/my-awesome-app.git"
BRANCH="main"
```

### All Users: Using VS Code

1. Open VS Code
2. Open the project folder
3. Right-click on `deploy.bat` (or `deploy.sh`)
4. Select "Open with Code"
5. Edit the configuration section
6. Save (Ctrl+S)

---

## 🎯 Common Scenarios

### Scenario 1: You're Student A

**My information:**
```
Username: student_a
Email: student.a@school.ac.ma
Repository: https://github.com/student_a/fashion-ecommerce.git
```

**Configure as:**

**Windows (deploy.bat):**
```batch
set GIT_USERNAME=student_a
set GIT_EMAIL=student.a@school.ac.ma
set GITHUB_URL=https://github.com/student_a/fashion-ecommerce.git
set BRANCH=main
```

**macOS/Linux (deploy.sh):**
```bash
GIT_USERNAME="student_a"
GIT_EMAIL="student.a@school.ac.ma"
GITHUB_URL="https://github.com/student_a/fashion-ecommerce.git"
BRANCH="main"
```

---

### Scenario 2: You Have Multiple Projects

**Option A: Create separate scripts**

```bash
# Copy the script for each project
cp deploy.bat project1-deploy.bat
cp deploy.bat project2-deploy.bat

# Edit each one with different configuration
```

**Option B: Use command argument**

```bash
# Windows - pass custom message
deploy.bat "First deployment of project 1"

# macOS/Linux
./deploy.sh "First deployment of project 1"
```

---

### Scenario 3: Team Project

**All team members need same configuration:**

```batch
set GIT_USERNAME=team_member_name
set GIT_EMAIL=team_member@school.ac.ma
set GITHUB_URL=https://github.com/team-account/project.git
set BRANCH=main
```

---

## 🔄 Essential Configuration Variables

| Variable | What It Is | Example |
|----------|-----------|---------|
| `GIT_USERNAME` | Your GitHub username | `aalj-png` |
| `GIT_EMAIL` | Your GitHub email | `a.alj@esisa.ac.ma` |
| `GITHUB_URL` | Your repository HTTPS URL | `https://github.com/aalj-png/sm.git` |
| `BRANCH` | Git branch (usually main) | `main` |
| `FRONTEND_DIR` | Where your app is (if web) | `frontend` or `.` |
| `COMMIT_MSG` | Default commit message | `Update: My Project` |

---

## ✅ Verification Checklist

Before running the script, verify:

- [ ] GIT_USERNAME matches your GitHub profile
- [ ] GIT_EMAIL is your GitHub email
- [ ] GITHUB_URL is correct format: `https://github.com/USERNAME/REPO.git`
- [ ] Repository exists on GitHub
- [ ] You have push permission on the repository
- [ ] Git credentials are configured
- [ ] npm dependencies are installed

---

## 🚨 Common Configuration Mistakes

### ❌ Wrong Format for Repository URL

**Bad:**
```bash
https://github.com/user/repo          # Missing .git
git@github.com:user/repo.git          # SSH format (need HTTPS)
```

**Good:**
```bash
https://github.com/user/repo.git      # ✅ Correct format
```

---

### ❌ Typos in GitHub Username

**Bad:**
```bash
GIT_USERNAME=student_a_           # Extra underscore
GIT_USERNAME=StudentA              # Capital letters (case-sensitive)
```

**Good:**
```bash
GIT_USERNAME=student_a             # Matches GitHub exactly
```

---

### ❌ Wrong Email

**Bad:**
```bash
GIT_EMAIL=john@gmail.com           # Different from GitHub email
```

**Good:**
```bash
GIT_EMAIL=john@school.ac.ma        # Same as GitHub account
```

---

### ❌ Repository Doesn't Exist Yet

**Solution:** Create it first on GitHub

1. Go to https://github.com/new
2. Create new repository with same name
3. Then use the script

---

## 🎓 Educational Scenarios

### For Classroom Assignments

**Teacher creates template:**
```batch
@REM Configuration for Classroom - Students fill these in
set GIT_USERNAME=YOUR_USERNAME_HERE
set GIT_EMAIL=YOUR_EMAIL_HERE
set GITHUB_URL=YOUR_REPO_URL_HERE
```

**Students fill in their information:**
```batch
set GIT_USERNAME=john_student
set GIT_EMAIL=john.student@school.ac.ma
set GITHUB_URL=https://github.com/john_student/assignment1.git
```

---

### For Project-Based Learning

**Project Structure:**
```
class-projects/
├── student1/
│   ├── deploy.bat
│   └── project files...
├── student2/
│   ├── deploy.bat
│   └── project files...
```

Each student has their own configured script in their folder.

---

## 🔐 Security Tips

1. **Never share scripts with passwords included**
   - ✅ Only include username/email
   - ❌ Never include tokens or passwords

2. **Use GitHub Personal Access Tokens**
   - Get one: https://github.com/settings/tokens
   - More secure than passwords

3. **Keep .env files secret**
   - Add to .gitignore
   - Never push sensitive data

4. **Be careful with repository visibility**
   - Public: Everyone can see
   - Private: Only you and collaborators

---

## 📊 Before & After Examples

### Example 1: Simple Website Project

**Before configuration:**
```batch
set GIT_USERNAME=aalj-png
set GIT_EMAIL=a.alj@esisa.ac.ma
set GITHUB_URL=https://github.com/aalj-png/sm.git
set FRONTEND_DIR=frontend
```

**After configuration (for your project):**
```batch
set GIT_USERNAME=sarah_tech
set GIT_EMAIL=sarah.tech@university.ac.ma
set GITHUB_URL=https://github.com/sarah_tech/portfolio-website.git
set FRONTEND_DIR=.
```

---

### Example 2: React Project with Backend

**Before configuration:**
```batch
set FRONTEND_DIR=frontend
```

**After configuration (for your monorepo):**
```batch
set FRONTEND_DIR=frontend
REM And after push, might also need to run backend
```

---

## 🆘 Testing Your Configuration

### Quick Test

Run this to verify Git is configured correctly:

```bash
# Windows
git config user.name
git config user.email
git remote -v

# macOS/Linux
git config user.name
git config user.email
git remote -v
```

Should show your configured values.

---

## 📋 Quick Reference Card

Print this and fill in your details:

```
╔════════════════════════════════════════╗
║   MY DEPLOYMENT CONFIGURATION          ║
╠════════════════════════════════════════╣
║ GitHub Username: ___________________  ║
║ GitHub Email:    ___________________  ║
║ Repo URL:        ___________________  ║
║ Branch Name:     ___________________  ║
║ Frontend Dir:    ___________________  ║
╚════════════════════════════════════════╝
```

---

## 🚀 You're Ready!

After configuring:

```bash
# Windows
deploy.bat

# macOS/Linux
./deploy.sh
```

Your code will be pushed and your app will launch! 🎉

---

## 📞 Troubleshooting Configuration

**Q: How do I find my GitHub username?**
A: Go to github.com, sign in, click profile pic, your username is shown.

**Q: Where's my repository URL?**
A: Go to repo on GitHub, click green Code button, copy HTTPS URL.

**Q: What if I use a different email for GitHub?**
A: Check your email in GitHub settings, use that exact email.

**Q: Can I have multiple configured scripts?**
A: Yes! Copy script, rename it, change configuration in each copy.

**Q: What if branch is not "main"?**
A: Run `git branch` to see current branch, update config to match.

---

## 📚 Related Documentation

- **DEPLOY_AUTOMATION.md** - Full deployment guide
- **QUICKSTART.md** - Quick start in 5 minutes
- **GITHUB_SETUP.md** - GitHub setup steps
- **README.md** - Complete project documentation

---

**This guide helps you adapt the scripts for ANY project!**

Happy deploying! 🚀
