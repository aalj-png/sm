# Testing Guide

## Local Testing

### 1. Start MongoDB
Make sure MongoDB is running on your machine:
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
# or
mongod
```

### 2. Start Backend Server
```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Start Frontend Development Server
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Testing Features

### 1. Authentication Tests

#### Register
1. Go to `http://localhost:5173/register`
2. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click Register
4. Should redirect to dashboard

#### Login
1. Go to `http://localhost:5173/login`
2. Fill in:
   - Email: `test@example.com`
   - Password: `password123`
3. Click Login
4. Should redirect to dashboard

#### Logout
1. Click Logout button in navbar
2. Should redirect to login page

### 2. Student Management Tests

#### Add Student (Admin Only)
1. Make sure logged in user is admin
   - Create an admin account by modifying the database or backend
   - Or use a test admin account
2. Click "Add Student" in sidebar
3. Fill in all required fields:
   - Matricule: `MAT001`
   - Prénom: `Ahmed`
   - Nom: `Djaoui`
   - Email: `ahmed@example.com`
   - Date of Birth: `2000-01-15`
   - Filière: `Informatique`
   - Niveau: `L3`
   - Téléphone: `+212612345678`
   - Adresse: `123 Rue Example`
4. Click "Add Student"
5. Should appear in students list

#### View Students
1. Click "View Students" or "Students List"
2. Should see table with all students
3. Should show pagination info

#### Search Students
1. In students list, enter search term in search box
2. Try searching by:
   - Name: `Ahmed`
   - Email: `ahmed@example.com`
   - Matricule: `MAT001`
3. Results should filter in real-time

#### Sort Students
1. Click column headers (Matricule, Name, Level)
2. Should sort ascending/descending
3. Arrow indicator should show sort direction

#### Edit Student
1. Click "Edit" button on student row
2. Modify any fields
3. Click "Update Student"
4. Changes should be reflected in list

#### Delete Student
1. Click "Delete" button on student row
2. Confirm deletion in dialog
3. Student should be removed from list

### 3. Dashboard Tests

1. Go to Dashboard
2. Should see:
   - Total Students count
   - Breakdown by Level
   - Breakdown by Program
3. Numbers should update when students are added/deleted

### 4. Pagination Tests

1. In Students list, select different page sizes
2. Navigate between pages
3. "Previous"/"Next" buttons should be enabled/disabled correctly
4. Page info should update

### 5. Validation Tests

#### Empty Fields
1. Try to add student without filling required fields
2. Should show error message

#### Duplicate Matricule
1. Try to add student with existing matricule
2. Should show error message

#### Invalid Email
1. Try to register/add with invalid email
2. Should show validation error

### 6. UI/UX Tests

#### Responsive Design
1. Resize browser window
2. Check mobile view (DevTools)
3. Sidebar should collapse on mobile
4. Tables should be scrollable on small screens

#### Alert Messages
1. Test error alerts - intentionally trigger errors
2. Test success alerts - complete successful operations
3. Alerts should auto-dismiss after 5 seconds

#### Navigation
1. Test all navigation links in sidebar
2. Test back/forward browser buttons
3. Routes should be protected (can't access without login)

## API Testing with cURL or Postman

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Students (with token)
```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Add Student (Admin only)
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "matricule": "MAT001",
    "prenom": "Ahmed",
    "nom": "Djaoui",
    "email": "ahmed@example.com",
    "dateNaissance": "2000-01-15",
    "filiere": "Informatique",
    "niveau": "L3"
  }'
```

### Get Statistics
```bash
curl -X GET http://localhost:5000/api/students/statistics \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Checklist

- [ ] Register works
- [ ] Login works
- [ ] Logout works
- [ ] Dashboard loads with stats
- [ ] Can view students list
- [ ] Can search students
- [ ] Can sort students
- [ ] Can add student (admin)
- [ ] Can edit student (admin)
- [ ] Can delete student (admin)
- [ ] Pagination works
- [ ] Form validation works
- [ ] Error messages display
- [ ] Success messages display
- [ ] Protected routes work
- [ ] Admin access control works
- [ ] Responsive design works
- [ ] Database persists data

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check connection string in .env
- Check firewall settings

### CORS Error
- Make sure backend is running
- Check FRONTEND_URL in backend .env
- Check proxy in vite.config.js

### Token Expired
- Clear localStorage and login again
- Adjust token expiry in authController.js

### API 404 Errors
- Check URL in browser DevTools Network tab
- Verify routes are correctly defined
- Check API base URL configuration

---

For more help, refer to README.md and DEPLOYMENT.md
