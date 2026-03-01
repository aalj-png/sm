# Deployment Instructions for Vercel

## Prerequisites
1. GitHub account
2. Vercel account (connected to GitHub)
3. MongoDB Atlas account (for database)

## Step 1: Prepare MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Get your connection string
5. Save it for later

## Step 2: Push to GitHub

### Initialize Git
```bash
cd path/to/tp6
git init
git add .
git commit -m "Initial commit: Student Management System"
```

### Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it: `student-management-system`
4. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/student-management-system.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy on Vercel

### Option 1: Using Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your `student-management-system` repository
5. Click "Import"

### Configure Build Settings

**Project Settings:**
- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `frontend/dist`
- Install Command: `npm run install-all`

### Environment Variables

Add these in Vercel Dashboard > Settings > Environment Variables:

**Production:**
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key_here
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**Development:**
```
MONGODB_URI=mongodb://localhost:27017/student_management
JWT_SECRET=dev_secret_key
FRONTEND_URL=http://localhost:5173
```

### Deploy

1. Click "Deploy"
2. Wait for the deployment to complete
3. Your app will be live at `https://your-app.vercel.app`

## Step 4: Verify Deployment

1. Open your Vercel URL
2. Test registration and login
3. Test adding, editing, and deleting students
4. Check backend API responses

## Troubleshooting

### Build Fails
- Check that all dependencies are installed
- Verify environment variables are set
- Check logs in Vercel Dashboard

### API Errors
- Verify MongoDB connection string
- Check JWT_SECRET is set
- Ensure CORS is configured correctly

### Frontend Routing Issues
- Check that `vercel.json` is correctly configured
- Verify build output directory

## GitHub Configuration

### Add .gitignore
Already configured in the project root.

### Branch Protection
1. Go to repository Settings
2. Click "Branches"
3. Add protection to `main` branch
4. Require pull request reviews (optional)

### Automatic Deployments
Vercel automatically deploys on:
- Push to `main` branch
- Pull request creation
- Configure webhooks in Settings

## Tips for Production

1. **Use strong passwords and secrets**
   - Generate random JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. **Enable HTTPS** (automatic on Vercel)

3. **Set up monitoring** via Vercel dashboard

4. **Use MongoDB Atlas backups**

5. **Set up error tracking** (Sentry, etc.)

## Redeploying

To redeploy:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically redeploy!

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Express.js Docs: https://expressjs.com
- React Docs: https://react.dev

---

**Happy deploying! 🚀**
