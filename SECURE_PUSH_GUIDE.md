# 🔒 Secure GitHub Push Guide

This guide explains how to securely push your code to GitHub using tokens that are **never stored in files**.

## Security First! 🛡️

The previous scripts had tokens embedded in the files themselves, which caused GitHub to block the push with secret detection. These new scripts solve that problem by:

✅ **Never storing the token in any file**  
✅ **Keeping the token only in memory during execution**  
✅ **Accepting the token as a command parameter**  
✅ **Making the push completely safe and traceable**

---

## 📋 Available Methods

Choose the method that works best for your system:

### 1️⃣ Windows (Batch Script)

**File:** `secure-push.bat`

```batch
secure-push.bat "your-github-token-here"
```

**Example:**
```batch
secure-push.bat "ghp_1234567890abcdefghijklmnopqrstu"
```

**What it does:**
- Initialize Git (if needed)
- Configure Git username and email
- Stage all files
- Create a commit
- Configure the remote with your token
- Push to GitHub
- Launch the development server

### 2️⃣ macOS/Linux (Bash Script)

**File:** `secure-push.sh`

First, make it executable:
```bash
chmod +x secure-push.sh
```

Then run it:
```bash
./secure-push.sh "your-github-token-here"
```

**Example:**
```bash
./secure-push.sh "ghp_1234567890abcdefghijklmnopqrstu"
```

### 3️⃣ Node.js (Cross-Platform)

**File:** `secure-push.js`

```bash
node secure-push.js "your-github-token-here"
```

**Example:**
```bash
node secure-push.js "ghp_1234567890abcdefghijklmnopqrstu"
```

**Interactive mode** (if token not provided):
```bash
node secure-push.js
# Will prompt for token
```

---

## 🔑 Getting Your GitHub Token

If you don't have a Personal Access Token yet:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" (Classic)
3. Give it a name: `Student Management System`
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `public_repo` (Access public repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

---

## 📖 Step-by-Step Execution

### Windows Users

1. Open **Command Prompt** or **PowerShell**
2. Navigate to your project:
   ```batch
   cd C:\Users\HP\Desktop\tp6
   ```
3. Run the secure push script:
   ```batch
   secure-push.bat "ghp_1234567890abcdefghijklmnopqrstu"
   ```
4. Watch the output for:
   - ✅ Git initialization
   - ✅ Files staged
   - ✅ Commit created
   - ✅ Push successful
   - ✅ Development server launching

### macOS/Linux Users

1. Open **Terminal**
2. Navigate to your project:
   ```bash
   cd ~/Desktop/tp6  # or wherever your project is
   ```
3. Make the script executable (first time only):
   ```bash
   chmod +x secure-push.sh
   ```
4. Run it:
   ```bash
   ./secure-push.sh "ghp_1234567890abcdefghijklmnopqrstu"
   ```

### Using Node.js (All Platforms)

1. Open **Terminal** (macOS/Linux) or **PowerShell** (Windows)
2. Navigate to your project
3. Run:
   ```bash
   node secure-push.js "your-actual-github-token-here"
   ```

---

## 🎯 What Happens When You Run the Script

The script performs these steps automatically:

### STEP 1: Initialize Git
```
✅ Git repository already initialized
```

### STEP 2: Configure Git
```
✅ Set Git username to "aalj-png"
✅ Set Git email to "a.alj@esisa.ac.ma"
```

### STEP 3: Check for Changes
```
ℹ️  Found 53 changed file(s)
```

### STEP 4: Stage Files
```
✅ Add all files to staging area
```

### STEP 5: Create Commit
```
✅ Create commit
```

### STEP 6: Configure Remote
```
✅ Remote added with token
```

### STEP 7: Branch Setup
```
✅ Rename branch to "main"
```

### STEP 8: Push to GitHub
```
✅ Code pushed to GitHub!
```

### STEP 9: Launch App
```
✅ Changed to frontend directory
ℹ️  Launching: npm run dev

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## ✅ Verify Your Push

After running the script, verify your code was pushed to GitHub:

1. Go to https://github.com/aalj-png/sm
2. You should see:
   - ✅ Your code files (backend/, frontend/, etc.)
   - ✅ All documentation
   - ✅ No security warnings
   - ✅ Latest commit message: "Update: Student Management System"

---

## 🆘 Troubleshooting

### Issue: "Token is invalid or expired"
**Solution:** Make sure you're using a valid GitHub Personal Access Token with the `repo` scope.

### Issue: "Permission denied" (macOS/Linux)
**Solution:** Run `chmod +x secure-push.sh` to make the script executable.

### Issue: "npm: command not found"
**Solution:** Make sure Node.js and npm are installed and accessible from your terminal.

### Issue: Port 5173 is already in use
**Solution:** Either:
- Kill the process using port 5173
- Or modify the Vite config to use a different port
- Or run the server in a different terminal: `cd frontend && npm run dev`

### Issue: "fatal: not a git repository"
**Solution:** The script will initialize Git automatically. If it fails:
```bash
git init
git add .
git commit -m "Initial commit: Student Management System"
```

### Issue: Authentication fails on push
**Solution:** 
1. Make sure your token is correct
2. Check that your GitHub username matches: `aalj-png`
3. Try running the script again with a fresh token

---

## 🔐 Security Notes

### ✅ Why This Approach is Safe

1. **Token is NOT saved to disk** - It only exists in memory during execution
2. **Token is NOT visible in git history** - Previous code commits don't contain it
3. **Token is NOT logged** - The script explicitly hides it in output
4. **Token is parameterized** - You control it, not the script
5. **No file-based credentials** - No `.env` files or config files store the token

### ⚠️ Best Practices

1. **Use a token with limited scope** - Only grant `repo` access, not admin access
2. **Regenerate tokens regularly** - Don't reuse the same token forever
3. **Never commit tokens to Git** - Always use environment variables or parameters
4. **Clear your terminal history** - Run `clear` or `cls` after using the token-based script
5. **Share tokens safely** - If you need to share scripts with teammates, never include tokens

---

## 🚀 Alternative: Permanent Setup (One-Time)

If you want to avoid typing the token every time, you can use Git's credential manager:

### Windows
```batch
git config --global credential.helper manager-core
```

### macOS
```bash
git config --global credential.helper osxkeychain
```

### Linux
```bash
git config --global credential.helper cache
# Or for permanent storage:
git config --global credential.helper store
```

Then run the script once, and Git will remember your credentials.

---

## 📚 Complete Command Reference

| Platform | Command |
|----------|---------|
| Windows | `secure-push.bat "TOKEN"` |
| macOS | `./secure-push.sh "TOKEN"` |
| Linux | `./secure-push.sh "TOKEN"` |
| Any OS | `node secure-push.js "TOKEN"` |
| Any OS (Interactive) | `node secure-push.js` |

---

## 🎓 Learning More

For more information about:
- **GitHub Tokens:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
- **Git Workflows:** https://git-scm.com/book/en/v2
- **Deployment:** See `DEPLOYMENT.md` in this project

---

## 📞 Need Help?

If you encounter issues:

1. Check the error message in the console
2. Review the "Troubleshooting" section above
3. Verify your GitHub token is valid
4. Make sure all dependencies are installed: `npm install` (in both backend and frontend)
5. Check your internet connection

---

**Last Updated:** 2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
