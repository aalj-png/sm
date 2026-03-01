# 🚀 One-Command Deploy Scripts

Automate your **Git push** and **app launch** with a single command!

## Quick Start (Pick Your OS)

### 🪟 Windows Users
```bash
double-click deploy.bat
```

### 🍎 macOS Users
```bash
chmod +x deploy.sh
./deploy.sh
```

### 🐧 Linux Users
```bash
chmod +x deploy.sh
./deploy.sh
```

### 🔧 Node.js (All Platforms)
```bash
node deploy.js
```

---

## What These Scripts Do

```
┌─────────────────────────────────────────┐
│ 🚀 AUTOMATED DEPLOYMENT WORKFLOW        │
├─────────────────────────────────────────┤
│ 1. Initialize Git (if needed)          │
│ 2. Configure git user                  │
│ 3. Stage all files                     │
│ 4. Create commit                       │
│ 5. Add GitHub remote                   │
│ 6. Rename branch to main               │
│ 7. Push to GitHub                      │
│ 8. Verify on GitHub                    │
│ 9. Launch npm run dev                  │
│ 10. Open app in browser                │
└─────────────────────────────────────────┘

⚡ All in one command!
✅ Automated validation at each step
🎨 Color-coded output for clarity
```

---

## 📁 Which Script to Use?

| Platform | Script | How to Run |
|----------|--------|-----------|
| **Windows** | `deploy.bat` | Double-click or `deploy.bat` |
| **macOS** | `deploy.sh` | `chmod +x deploy.sh && ./deploy.sh` |
| **Linux** | `deploy.sh` | `chmod +x deploy.sh && ./deploy.sh` |
| **Any** | `deploy.js` | `node deploy.js` |

---

## 🔧 Before First Use

Edit the configuration in your chosen script:

**Look for this section:**

```batch
REM ========================================
REM 🔧 CONFIGURATION - MODIFY THESE VALUES
REM ========================================

set GIT_USERNAME=aalj-png
set GIT_EMAIL=a.alj@esisa.ac.ma
set GITHUB_URL=https://github.com/aalj-png/sm.git
```

**Replace with:**
- `GIT_USERNAME` → Your GitHub username
- `GIT_EMAIL` → Your GitHub email
- `GITHUB_URL` → Your repository HTTPS URL

**See [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md) for help!**

---

## 📖 Complete Documentation

| Document | Purpose |
|----------|---------|
| **[DEPLOY_AUTOMATION.md](./DEPLOY_AUTOMATION.md)** | Full guide with examples |
| **[CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)** | How to configure scripts |
| **[QUICKSTART.md](./QUICKSTART.md)** | Get running in 5 minutes |
| **[README.md](./README.md)** | Project documentation |
| **[GITHUB_SETUP.md](./GITHUB_SETUP.md)** | GitHub & Vercel guide |

---

## 🎯 Usage Examples

### Example 1: Simple Deploy

```bash
# Windows
deploy.bat

# macOS/Linux
./deploy.sh
```

**Output:**
```
==============================================================
✅ Checking if Git is installed...
✅ Git is installed

✅ Initializing Git repository...
✅ Git initialized

✅ Configuring Git user...
✅ Git user configured
  Username: aalj-png
  Email: a.alj@esisa.ac.ma

✅ Staging all files...
✅ All files staged

✅ Creating commit...
✅ Commit created: "Update: Student Management System"

✅ Pushing to GitHub...
✅ Code pushed to GitHub!
  Repository: https://github.com/aalj-png/sm.git

✅ Starting development server...
```

---

### Example 2: Custom Commit Message

```bash
# Windows
deploy.bat "Add student search feature"

# macOS/Linux
./deploy.sh "Add student search feature"
```

**Output includes:**
```
Commit message: "Add student search feature"
✅ Commit created

✅ Code pushed to GitHub!
```

---

### Example 3: Node.js Script

```bash
# Basic
node deploy.js

# With custom message
node deploy.js "Update dashboard"
```

---

## 🔐 GitHub Credentials

**First time only:**

```
⚠️ You may be prompted for GitHub credentials

If asked:
  Username: Use your GitHub username
  Password: Use your Personal Access Token
           (not your regular password)
```

**Get a Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Select `repo` scope
4. Copy and save the token
5. Use as "password" when prompted

---

## ✅ Success Indicators

After running the script:

✅ Terminal shows "Code pushed to GitHub"
✅ No error messages
✅ GitHub repository shows your files
✅ Development server starts
✅ Browser opens to http://localhost:5173
✅ App is responsive

---

## 🆘 Common Issues

### "Git not found"
```bash
# Install Git:
# Windows: https://git-scm.com/download/win
# macOS: brew install git
# Linux: sudo apt-get install git
```

### "Authentication failed"
```bash
# Use Personal Access Token instead of password
# Get one: https://github.com/settings/tokens
# Then run script again
```

### "Repository not found"
```bash
# Verify:
# 1. Repository exists on GitHub
# 2. URL is correct format: https://github.com/user/repo.git
# 3. You have push permissions
```

### "npm command not found"
```bash
# Install Node.js from: https://nodejs.org
# Then install frontend dependencies:
# cd frontend && npm install
```

See [DEPLOY_AUTOMATION.md](./DEPLOY_AUTOMATION.md#troubleshooting) for more help.

---

## 🎓 For Students & Teachers

### Teachers: Share the Script

```bash
# Provide students with template:
1. Give them deploy.bat (or deploy.sh)
2. Tell them to change configuration
3. They run it to deploy their work
```

### Students: Understand the Workflow

These scripts teach you:
- ✅ How Git works
- ✅ GitHub integration
- ✅ Commit best practices
- ✅ Automation benefits

**Adapt it for your projects!**

---

## 🚀 Reproducibility

**One command, every time:**

```bash
# Initial setup
configure scripts

# Then whenever you want to push:
deploy.bat              # Windows
./deploy.sh             # macOS/Linux
node deploy.js          # Any OS

# Your code goes to GitHub
# Your app launches locally
# Everything happens automatically
```

---

## 🎨 Visual Workflow

```
┌────────────────┐
│ Run Script     │
│ deploy.bat     │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Configure Git  │ (if needed)
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Check Changes  │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Stage Files    │
│ Create Commit  │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Push to GitHub │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Launch App     │
│ npm run dev    │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ ✅ SUCCESS!    │
│ Code on GitHub │
│ App Running    │
└────────────────┘
```

---

## 📊 Script Comparison

| Feature | Windows Batch | macOS/Linux Bash | Node.js |
|---------|---------------|------------------|---------|
| No setup needed | ✅ | ❌ (chmod needed) | ✅ |
| Works on all OS | ❌ | ✅ | ✅ |
| Easy to read | ✅ | ✅ | ✅ |
| Portable | ❌ | ✅ | ✅ |
| Pretty output | ✅ | ✅ | ✅ |

**Recommendation:**
- Windows → `deploy.bat`
- macOS/Linux → `deploy.sh`
- Cross-platform → `deploy.js`

---

## 🔄 Full Workflow Example

```
1. Make changes to your code
   ↓
2. Run: deploy.bat (or deploy.sh)
   ↓
   ├─ Git initialization ✓
   ├─ Configuration ✓
   ├─ Stage files ✓
   ├─ Create commit ✓
   ├─ Push to GitHub ✓
   └─ Launch dev server ✓
   ↓
3. Browser opens: http://localhost:5173
   ↓
4. GitHub shows your updated code
   ↓
5. ✅ Done!
```

---

## 🎁 Bonus Features

### Custom Commit Messages
```bash
deploy.bat "Add responsive design"
./deploy.sh "Fix login bug"
node deploy.js "Update documentation"
```

### Browser Auto-Open
Scripts automatically open your GitHub repository in the browser (if available).

### Error Handling
Scripts stop on errors and show helpful messages.

---

## 📚 Learning Path

1. **Start here:** Run `deploy.bat` (Windows) or `./deploy.sh` (macOS/Linux)
2. **Read:** [DEPLOY_AUTOMATION.md](./DEPLOY_AUTOMATION.md)
3. **Configure:** [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)
4. **Troubleshoot:** [DEPLOY_AUTOMATION.md#troubleshooting](./DEPLOY_AUTOMATION.md#troubleshooting)
5. **Deploy:** [GITHUB_SETUP.md](./GITHUB_SETUP.md) (take to Vercel)

---

## 💡 Tips & Tricks

```bash
# Tip 1: Create meaningful commits
deploy.bat "Feature: Add student search"  # Good!
deploy.bat "update"                        # Bad!

# Tip 2: Commit frequently
# Small, focused changes are easier to review

# Tip 3: Check GitHub before deploying
# Make sure your repo exists and is accessible

# Tip 4: Keep your configuration updated
# If you change repository, update the script
```

---

## 🎉 You're Ready!

```
✅ Scripts are configured
✅ GitHub account is ready
✅ One command to deploy
✅ Automated verification

Now just run:

💻 Windows:  deploy.bat
🍎 macOS:   ./deploy.sh
🐧 Linux:   ./deploy.sh
🔧 Node:    node deploy.js

Your code goes to GitHub.
Your app launches locally.
Everything is automated.

Happy coding! 🚀
```

---

**Quick Links:**
- [Full Deployment Guide](./DEPLOY_AUTOMATION.md)
- [Configuration Help](./CONFIGURATION_GUIDE.md)
- [GitHub Setup](./GITHUB_SETUP.md)
- [Project README](./README.md)

---

**Version**: 1.0.0  
**Updated**: March 2026  
**Platforms**: Windows, macOS, Linux  
**Reproducible**: ✅ One command to deploy and launch
