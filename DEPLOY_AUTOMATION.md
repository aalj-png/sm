# 🚀 Automated Git Push & App Launch Guide

## Overview

This guide provides **three automated scripts** that handle the entire deployment workflow:

1. **Git initialization and configuration**
2. **Adding all changes to staging**
3. **Creating and pushing commits to GitHub**
4. **Automatically launching the development server**

All in **one simple command!**

---

## ✨ Features

✅ **Automated Git Workflow** - Initialize, commit, and push automatically
✅ **One-Command Deployment** - Single command handles everything
✅ **Custom Commit Messages** - Pass custom message as argument
✅ **GitHub Integration** - Pushes directly to your repository
✅ **Auto-Launch App** - Starts dev server after successful push
✅ **Clear Feedback** - Color-coded output showing each step
✅ **Error Handling** - Stops on errors with helpful messages
✅ **Platform Support** - Works on Windows, macOS, and Linux

---

## 🛠️ Configuration

Before using any script, **edit the configuration section** to match your setup:

### Windows (deploy.bat)

```batch
set GIT_USERNAME=aalj-png
set GIT_EMAIL=a.alj@esisa.ac.ma
set GITHUB_URL=https://github.com/aalj-png/sm.git
set BRANCH=main
set FRONTEND_DIR=frontend
```

### macOS/Linux (deploy.sh)

```bash
GIT_USERNAME="aalj-png"
GIT_EMAIL="a.alj@esisa.ac.ma"
GITHUB_URL="https://github.com/aalj-png/sm.git"
BRANCH="main"
FRONTEND_DIR="frontend"
```

### Node.js (deploy.js)

```javascript
const CONFIG = {
  gitUsername: 'aalj-png',
  gitEmail: 'a.alj@esisa.ac.ma',
  githubUrl: 'https://github.com/aalj-png/sm.git',
  branch: 'main',
  commitMessage: 'Update: Student Management System',
  frontendDir: './frontend',
};
```

**Replace with YOUR values:**
- `gitUsername` → Your GitHub username
- `gitEmail` → Your email address
- `githubUrl` → Your repository URL
- `frontendDir` → Path to your frontend (usually `frontend` or `./frontend`)

---

## 📋 Prerequisites

Before running any script:

1. **Git installed**
   - Windows: Download from https://git-scm.com/download/win
   - macOS: `brew install git`
   - Linux: `apt-get install git`

2. **GitHub account created** with a repository

3. **GitHub credentials configured**
   - Use Personal Access Token instead of password
   - Get one: https://github.com/settings/tokens

4. **Node.js and npm installed**
   - Download from https://nodejs.org

5. **npm dependencies installed**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

---

## 🚀 Usage

### Option 1: Windows Batch Script (Recommended for Windows)

**Make it executable:**
```bash
# Just double-click deploy.bat
# Or run in terminal:
deploy.bat
```

**With custom commit message:**
```bash
deploy.bat "My custom commit message"
```

**What it does:**
```
✅ Checks if Git is installed
✅ Initializes Git (if needed)
✅ Configures Git user
✅ Stages all files
✅ Creates commit
✅ Configures GitHub remote
✅ Pushes to GitHub
✅ Launches dev server
```

---

### Option 2: Bash Script (Recommended for macOS/Linux)

**Make it executable:**
```bash
chmod +x deploy.sh
```

**Run the script:**
```bash
./deploy.sh
```

**Or without making executable:**
```bash
bash deploy.sh
```

**With custom commit message:**
```bash
./deploy.sh "My custom commit message"
```

---

### Option 3: Node.js Script (Cross-platform)

**Install globally (optional):**
```bash
npm install -g node
```

**Run the script:**
```bash
node deploy.js
```

**With custom commit message:**
```bash
node deploy.js "My custom commit message"
```

---

## 📊 Detailed Workflow

### Step-by-Step Process

```
1. GIT INITIALIZATION
   └─ Checks if Git is installed
   └─ Initializes repository (if needed)

2. GIT CONFIGURATION  
   └─ Sets GitHub username
   └─ Sets GitHub email

3. CHECKING FOR CHANGES
   └─ Scans for modified files
   └─ Displays list of changes

4. STAGING FILES
   └─ Adds all files to Git staging area
   └─ (git add .)

5. CREATING COMMIT
   └─ Creates commit with message
   └─ (git commit -m "message")

6. CONFIGURING REMOTE
   └─ Sets GitHub repository URL
   └─ (git remote add origin URL)

7. BRANCH SETUP
   └─ Renames branch to main
   └─ (git branch -M main)

8. PUSHING TO GITHUB
   └─ Uploads code to GitHub
   └─ (git push -u origin main)
   └─ May prompt for credentials

9. VERIFYING DEPLOYMENT
   └─ Shows GitHub repository URL
   └─ Opens GitHub in browser (if available)

10. LAUNCHING APP
    └─ Changes to frontend directory
    └─ Runs: npm run dev
    └─ App opens at http://localhost:5173
```

---

## 🔐 GitHub Credentials

### Using Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (full control of private repositories)
   - `workflow` (update GitHub Actions)
4. Generate and copy the token
5. When prompted for password during `git push`, paste the token

### One-Time Setup (macOS/Linux)

```bash
# Store credentials for 1 hour (3600 seconds)
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=3600'

# Or permanently (more secure with token)
git config --global credential.helper store
```

### Troubleshooting Credentials

If you get "Authentication failed":

```bash
# Clear cached credentials
git credential reject

# Or on Windows
git credential-manager uninstall

# Restart the script - it will prompt you again
```

---

## 📝 Example Workflows

### Scenario 1: Push Code with Default Message

**Windows:**
```bash
deploy.bat
```

**macOS/Linux:**
```bash
./deploy.sh
```

---

### Scenario 2: Push with Custom Commit Message

**Windows:**
```bash
deploy.bat "Add student search feature"
```

**macOS/Linux:**
```bash
./deploy.sh "Add student search feature"
```

---

### Scenario 3: Manual Step-by-Step (if scripts fail)

```bash
# Initialize
git init
git config user.name "aalj-png"
git config user.email "a.alj@esisa.ac.ma"

# Stage and commit
git add .
git commit -m "Update: Student Management System"

# Configure and push
git remote add origin https://github.com/aalj-png/sm.git
git branch -M main
git push -u origin main

# Launch
cd frontend
npm run dev
```

---

## 🆘 Troubleshooting

### "Git is not installed"
- **Windows:** Download from https://git-scm.com/download/win
- **macOS:** `brew install git`
- **Linux:** `sudo apt-get install git`

### "fatal: not a git repository"
- Your folder is already a Git repo (good!)
- The script will use it

### "Authentication failed"
- Check you're using Personal Access Token, not password
- Generate token: https://github.com/settings/tokens
- Clear cached credentials and try again

### "Repository not found / Access denied"
- Verify GitHub URL is correct
- Check repository exists on GitHub
- Ensure you have push permissions
- Check token permissions include `repo`

### "Port 5173 already in use"
```bash
# Kill the process using the port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5173
kill -9 <PID>
```

### "npm run dev fails"
- Make sure you're in the frontend directory
- Check `package.json` has `"dev"` script
- Try: `npm install` in the frontend directory

---

## 📚 Adapting for Different Projects

### Change Project Name
Edit the configuration:

**Windows (deploy.bat):**
```batch
set GITHUB_URL=https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

**macOS/Linux (deploy.sh):**
```bash
GITHUB_URL="https://github.com/YOUR_USERNAME/YOUR_REPO.git"
```

**Node.js (deploy.js):**
```javascript
githubUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git',
```

### Change Frontend Directory
If your frontend is in a different folder:

**Windows:**
```batch
set FRONTEND_DIR=my-frontend-app
```

**macOS/Linux:**
```bash
FRONTEND_DIR="my-frontend-app"
```

**Node.js:**
```javascript
frontendDir: './my-frontend-app',
```

### Change Startup Command
If your project uses `npm start` instead:

**Windows:**
```batch
REM Change: npm run dev
REM To:
start cmd /k npm start
```

**macOS/Linux:**
```bash
# Change: npm run dev
# To:
npm start
```

---

## ✅ Verification Checklist

After running the script:

- [ ] Terminal shows "✅ Code pushed to GitHub"
- [ ] No error messages in terminal
- [ ] GitHub repository page shows your files
- [ ] Frontend development server is running
- [ ] Browser opens to http://localhost:5173
- [ ] App is accessible and responds

---

## 🎯 Best Practices

1. **Commit often** with meaningful messages
2. **Test locally before pushing** (`npm run dev`)
3. **Never commit sensitive data** (.env files)
4. **Use meaningful commit messages**
   - ✅ "Add student search feature"
   - ❌ "fix stuff"
   - ❌ "Update code"

5. **Keep git history clean**
   - Small, focused commits
   - Descriptive messages
   - One feature per commit

6. **Pull before pushing**
   ```bash
   git pull origin main
   ```

7. **For team collaboration:**
   - Create feature branches
   - Use pull requests
   - Code reviews before merge

---

## 📖 Advanced Usage

### Running Multiple Deployments

```bash
# Deploy multiple times without closing terminal
for i in {1..3}; do
  ./deploy.sh "Update #$i"
  sleep 2
done
```

### Scheduling Deployments (advanced)

**Windows Task Scheduler:**
```
C:\path\to\deploy.bat
Run at: Daily 9:00 AM
```

**macOS/Linux Cron:**
```bash
# Run daily at 9:00 AM
0 9 * * * /path/to/deploy.sh
```

---

## 🚀 Quick Reference

| Task | Command |
|------|---------|
| Deploy (Windows) | `deploy.bat` |
| Deploy (macOS/Linux) | `./deploy.sh` |
| Deploy (Node.js) | `node deploy.js` |
| Custom message | `deploy.bat "message"` |
| Manual Git commands | See "Scenario 3" above |

---

## 📞 Support

If you encounter issues:

1. **Check Prerequisites** section
2. **Read Troubleshooting** section
3. **Verify configuration** matches your setup
4. **Check GitHub credentials** are correct
5. **Run in verbose mode** to see error details

---

## 📝 Notes

- Scripts are designed for **development and learning**
- For production, consider:
  - GitHub Actions CI/CD
  - Vercel auto-deployment
  - Branch protection rules
  - Required code reviews

- Scripts can be **modified and shared**
- Encourage students to adapt for their own projects
- Great for understanding Git workflows

---

## 🎉 Success!

Once your code is on GitHub and npm run dev is running:

1. **GitHub:** https://github.com/aalj-png/sm
2. **Local:** http://localhost:5173
3. **Ready for Vercel deployment!**

---

**Version:** 1.0.0
**Updated:** March 2026
**Platforms:** Windows, macOS, Linux
**Prerequisites:** Git, Node.js, npm
