# GitHub Setup & Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - Create one at [github.com](https://github.com)
2. **Git Installed** - Download from [git-scm.com](https://git-scm.com)
3. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
4. **MongoDB Atlas Account** - Create at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## 🚀 Step 1: Initialize Git Repository

Open terminal/command prompt in your project root (`c:\Users\HP\Desktop\tp6`):

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Student Management System with React, Express, MongoDB, and JWT"

# Check status
git status
```

## 📝 Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Fill in the details:
   - **Repository name**: `student-management-system`
   - **Description**: `A modern student management system with authentication and CRUD operations`
   - **Visibility**: Public (or Private if you prefer)
   - **Initialize with**: Leave unchecked (we'll push existing repo)
5. Click **Create repository**

## 🔗 Step 3: Connect Local Repository to GitHub

In your terminal, run these commands:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/student-management-system.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## ✅ Step 4: Verify on GitHub

1. Go to your repository on GitHub
2. You should see all your files
3. Click on specific files to verify content

## 🌐 Step 5: Deploy on Vercel

### Option A: Direct Vercel Import (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Create a new project"** or **"Import Project"**
3. Select **"Import Git Repository"**
4. Paste your repository URL: `https://github.com/YOUR_USERNAME/student-management-system`
5. Click **Continue**
6. Click **Connect**
7. Authorize Vercel to access your GitHub account

### Option B: Manual Configuration

If importing doesn't work, configure manually:

1. In Vercel, select your repository
2. Set the following:

**Build & Development Settings:**
- Framework Preset: **Other**
- Build Command: `npm run build`
- Output Directory: `frontend/dist`
- Install Command: `npm run install-all`

### Step 6: Set Environment Variables in Vercel

1. In Vercel project settings, go to **Settings** → **Environment Variables**
2. Add the following variables:

**For Production:**
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/student_management?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-key-here-change-this
FRONTEND_URL = https://your-app-name.vercel.app
NODE_ENV = production
```

3. Click **Add**
4. Repeat for each variable

### Step 7: Deploy

1. Go back to the main Vercel project page
2. Click the **Deploy** button
3. Wait for deployment to complete
4. You'll see a live URL like: `https://student-management-system.vercel.app`

## 🧪 Step 8: Set Up MongoDB Atlas

If you haven't already:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Create a database user with credentials
5. Go to **Connect** → **Copy connection string**
6. It should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/student_management?retryWrites=true&w=majority
```

7. Use this as your `MONGODB_URI` in Vercel

## 📊 Step 9: Test Your Deployment

1. Open your Vercel URL in browser
2. Test the following:
   - [ ] Register new account
   - [ ] Login
   - [ ] View dashboard
   - [ ] Add student (if admin)
   - [ ] Search students
   - [ ] Logout

## 🔄 Continuous Deployment

After setup, every time you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will **automatically redeploy** your application!

## 📝 Updating Your Project

### To add new features:

```bash
# Create a new branch (optional)
git checkout -b feature/my-feature

# Make changes and test locally
# npm run dev

# Commit changes
git add .
git commit -m "Add new feature"
git push origin main
```

### To fix bugs:

```bash
git add .
git commit -m "Fix: description of bug"
git push origin main
```

## 🔐 Security Tips

1. **Never commit .env files**
   - Always use `.env.example` with sample values
   - Add sensitive data only in Vercel environment variables

2. **Use strong secrets**
   ```bash
   # Generate a strong JWT secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Rotate secrets regularly**

4. **Use private repositories** for sensitive projects

5. **Add collaborators** if needed (Settings → Collaborators)

## 🐛 Troubleshooting

### Deployment Fails
- Check Vercel logs: Click **Deployments** → Failed build
- Look for error messages
- Verify all environment variables are set

### API Not Working
- Check MongoDB connection string
- Verify JWT_SECRET is set
- Check CORS settings in backend

### Frontend Shows Errors
- Check API URL in frontend `.env`
- Verify backend is running
- Check browser console for errors

### Blank Page
- Check browser console for JavaScript errors
- Verify Build output directory is correct
- Ensure `npm run build` works locally

## 📚 Useful Commands

```bash
# View git history
git log --oneline

# Check remote
git remote -v

# Switch branches
git checkout branch-name

# Create new branch
git checkout -b new-branch-name

# Merge branches
git merge branch-name

# Reset changes
git reset --hard HEAD
```

## 🎯 Next Steps

1. **Add more features**:
   - Bulk student import (CSV)
   - Student grades/marks
   - Attendance tracking
   - Email notifications

2. **Improve security**:
   - Add rate limiting
   - Implement refresh tokens
   - Add password reset functionality

3. **Enhance UI**:
   - Add dark mode
   - Improve mobile experience
   - Add data visualization charts

4. **Optimize performance**:
   - Add caching
   - Optimize database queries
   - Compress assets

## 📞 Support Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)

## 📄 Repository Structure on GitHub

```
student-management-system/
├── backend/          # Node.js + Express server
├── frontend/         # React + Vite app
├── .gitignore        # Git ignore rules
├── README.md         # Project documentation
├── DEPLOYMENT.md     # Deployment guide
├── TESTING.md        # Testing guide
├── GITHUB_SETUP.md   # This file
├── package.json      # Root package.json
├── vercel.json       # Vercel configuration
├── setup.sh          # Linux/Mac setup script
└── setup.bat         # Windows setup script
```

## ✨ Congratulations!

Your project is now:
- ✅ On GitHub
- ✅ Deployed on Vercel
- ✅ Connected to MongoDB
- ✅ Ready for continuous deployment

**Your live app is at**: `https://student-management-system-xxx.vercel.app`

Happy coding! 🚀
