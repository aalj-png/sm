# 🚀 QUICK START GUIDE

## What You've Got

A complete, production-ready **Student Management System** with:
- ✅ React + Vite frontend
- ✅ Express.js + MongoDB backend
- ✅ JWT authentication
- ✅ Admin/User roles
- ✅ Full CRUD operations
- ✅ Responsive design with Tailwind CSS
- ✅ Ready for Vercel deployment

---

## 🎯 Start Locally (5 minutes)

### Prerequisites
- Node.js installed ([download](https://nodejs.org))
- MongoDB running (local or [MongoDB Atlas](https://mongodb.com/cloud/atlas))

### Option 1: Windows (Recommended)
```bash
# Double-click setup.bat file
# Or run in terminal:
setup.bat
```

### Option 2: macOS/Linux
```bash
bash setup.sh
```

### Option 3: Manual Setup
```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### Open in Browser
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api/health

---

## 🧪 Test the App

### Create Test Account
1. Click **Register**
2. Create account (any username/email)
3. Login with your credentials

### Add Student (Admin Only)
**To enable admin mode:**

For testing, create a regular user first, then:
1. In backend, edit `controllers/authController.js`
2. Register as admin: after login, manually add admin user to MongoDB:
```javascript
// In MongoDB
db.users.updateOne(
  { email: "your-email@test.com" },
  { $set: { role: "admin" } }
)
```

Or use this simpler approach for testing:
1. Register normally
2. Go to Dashboard (available to all authenticated users)
3. View Students list (available to all authenticated users)

---

## 📂 Project Structure

```
tp6/
├── backend/          → Express server (port 5000)
├── frontend/         → React app (port 5173)
├── README.md         → Full documentation
├── DEPLOYMENT.md     → Vercel deployment steps
├── GITHUB_SETUP.md   → GitHub & deployment guide
├── TESTING.md        → Testing instructions
└── QUICKSTART.md     → This file
```

---

## 📋 Key Files to Know

### Backend
- `backend/server.js` - Main entry point
- `backend/models/*` - Database schemas
- `backend/routes/*` - API endpoints
- `backend/.env` - Configuration (MongoDB URI, JWT secret)

### Frontend
- `frontend/src/App.jsx` - Main component
- `frontend/src/pages/*` - Page components
- `frontend/src/context/AuthContext.jsx` - Authentication state
- `frontend/src/services/api.js` - API calls

---

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
```

### Students
```
GET    /api/students           (list all, with pagination)
GET    /api/students/:id       (single student)
POST   /api/students           (admin only)
PUT    /api/students/:id       (admin only)
DELETE /api/students/:id       (admin only)
GET    /api/students/statistics
```

---

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/student-management-system.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   ```
   MONGODB_URI = your-mongodb-atlas-string
   JWT_SECRET = your-secret-key
   ```
5. Click "Deploy"

### Step 3: Done! 🎉
Your app will be live at `https://your-app-name.vercel.app`

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed steps.

---

## 🛠️ Available Commands

### Root Directory
```bash
npm run install-all      # Install all dependencies
npm run dev              # Run both frontend and backend
npm run start-backend    # Just backend
npm run start-frontend   # Just frontend
```

### Backend
```bash
cd backend
npm run dev              # Development with hot reload
npm start                # Production
```

### Frontend
```bash
cd frontend
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview production build
```

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use MongoDB Atlas (not local)
- [ ] Set strong passwords
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Don't commit .env files
- [ ] Use environment variables for secrets

---

## ⚠️ Troubleshooting

### Port 5000 already in use
```bash
# Find process on port 5000
lsof -i :5000          # macOS/Linux
netstat -ano | find... # Windows
# Kill process or use different port
```

### MongoDB connection failed
- Check connection string in `.env`
- Ensure MongoDB is running
- Verify username/password if using Atlas

### Token errors after restart
- Clear browser localStorage
- Delete cookies
- Login again

### API 404 errors
- Check backend is running on port 5000
- Verify API URL in frontend `.env`

See [TESTING.md](./TESTING.md) for more.

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full project documentation |
| DEPLOYMENT.md | Vercel deployment guide |
| GITHUB_SETUP.md | GitHub integration steps |
| TESTING.md | Testing & verification guide |
| QUICKSTART.md | This file - quick reference |

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Docs](https://vercel.com/docs)
- [JWT.io](https://jwt.io)

---

## 📞 Next Steps

### Immediate (Day 1)
- [ ] Run locally with `setup.bat` or `setup.sh`
- [ ] Test register/login
- [ ] Explore the UI

### Short Term (Day 2-3)
- [ ] Understand the code structure
- [ ] Customize as needed
- [ ] Push to GitHub
- [ ] Deploy to Vercel

### Long Term (Week 1+)
- [ ] Add more features
- [ ] Improve UI/UX
- [ ] Add email notifications
- [ ] Implement student grades
- [ ] Add attendance tracking

---

## 💡 Features Summary

### Already Implemented ✅
- User registration & login
- JWT authentication
- Password hashing with bcrypt
- Admin/user roles
- Student CRUD operations
- Search & filter
- Pagination
- Sorting
- Form validation
- Error handling
- Responsive design
- Dashboard with statistics
- Protected routes
- Sidebar navigation
- Alert notifications

### Ideas for Enhancement 🚀
- [ ] Forgot password feature
- [ ] Email confirmations
- [ ] Student groups/classes
- [ ] Grades & transcripts
- [ ] Attendance tracking
- [ ] Export to PDF
- [ ] Bulk import (CSV)
- [ ] Dark mode
- [ ] Real-time notifications
- [ ] File uploads (profile pics)

---

## 🎨 Customization Tips

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color'
    }
  }
},
```

### Change Logo
Edit `frontend/src/components/Navbar.jsx`:
```jsx
<Link to="/" className="text-2xl font-bold">
  YOUR LOGO HERE
</Link>
```

### Add New Fields
1. Update `backend/models/Student.js`
2. Update form in `frontend/src/pages/StudentForm.jsx`
3. Update table in `frontend/src/pages/StudentsList.jsx`

---

## 📊 Performance Tips

- Use MongoDB indexes for faster queries ✓ (already done)
- Implement caching
- Optimize bundle size
- Use CDN for static files
- Add service workers for offline mode

---

## 🤝 Contributing

Feel free to:
- Add new features
- Fix bugs
- Improve documentation
- Suggest improvements
- Share with others

---

## ✨ You're All Set!

Your Student Management System is ready to:
- 📝 Manage students
- 👤 Authenticate users
- 📊 Track statistics
- 🌍 Deploy globally

**Happy coding! 🚀**

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Stack**: React + Express + MongoDB + Tailwind CSS  
**Deployment**: Vercel + GitHub

For detailed information, see:
- Full docs: [README.md](./README.md)
- Deployment: [GITHUB_SETUP.md](./GITHUB_SETUP.md)
- Testing: [TESTING.md](./TESTING.md)
