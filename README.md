# Student Management System

A modern and professional web application for managing students with authentication, CRUD operations, and advanced features.

## 🛠️ Technologies

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin requests

## ✨ Features

### 🔐 Authentication
- User registration with validation
- User login with JWT tokens
- Protected routes (admin only)
- Session management with localStorage
- Logout functionality

### 👨‍🎓 Student Management
- Add new students
- View all students with pagination
- Update student information
- Delete students with confirmation
- Search students by name, email, or matricule
- Sort by name, level, or other fields
- Pagination (5, 10, 20 per page)

### 📊 Student Information
- Matricule (unique student ID)
- First Name & Last Name
- Email Address
- Date of Birth
- Program (Filière)
- Academic Level (L1, L2, L3, M1, M2)
- Phone Number
- Address

### 🎨 Dashboard
- Total students statistics
- Students breakdown by level
- Students breakdown by program
- Responsive design (mobile + desktop)
- Professional UI with Tailwind CSS

### 🔎 Bonus Features
- Form validation
- Confirmation dialogs for deletion
- Alert messages (success/error/info)
- Admin role-based access control
- Data sorting
- Advanced search functionality
- Responsive sidebar navigation
- Modern navbar with user profile

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/student_management
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

## 🚀 Deployment on Vercel

### Backend Deployment

1. Create a MongoDB Atlas account and get your connection string
2. Deploy backend separately or use Vercel Functions
3. Update environment variables on Vercel dashboard

### Frontend Deployment

```bash
cd frontend
npm run build
```

### Combined Deployment

The `vercel.json` file is configured for deploying both frontend and backend together.

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - Backend: `MONGODB_URI`, `JWT_SECRET`
   - Frontend: `VITE_API_URL` (production URL)

4. Deploy

## 📁 Project Structure

```
tp6/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Student.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentsList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
├── README.md
└── vercel.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)

### Students
- `GET /api/students` - Get all students (with pagination & search)
- `GET /api/students/:id` - Get single student
- `POST /api/students` - Create student (admin only)
- `PUT /api/students/:id` - Update student (admin only)
- `DELETE /api/students/:id` - Delete student (admin only)
- `GET /api/students/statistics` - Get statistics (protected)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Role-based access control (RBAC)
- Protected API endpoints
- Secure token storage in localStorage
- Input validation
- HTTP-only considerations for production

## 🎯 Usage

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Dashboard**: View statistics on the dashboard
4. **View Students**: See all students list
5. **Manage** (Admin only):
   - Add new students
   - Edit existing students
   - Delete students
6. **Search & Filter**: Find students quickly
7. **Pagination**: Navigate through pages

## 📝 Notes

- Make sure MongoDB is running before starting the backend
- Update environment variables for production
- Use strong JWT secrets for production
- Store sensitive data securely in Vercel environment variables
- Test thoroughly before production deployment

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a modern student management system with modern web technologies.

---

**Version**: 1.0.0  
**Last Updated**: March 2026
