# Quick Registration Test Guide

## ✅ What Was Fixed

1. **RegisterRequest.java** - Added no-args constructor
2. **LoginRequest.java** - Added no-args constructor  
3. **AuthContext.jsx** - Added better error handling & logging
4. **AuthService.java** - Returns complete user data

---

## 🚀 Quick Test (5 Minutes)

### Step 1: Start Backend (Terminal 1)
```bash
cd d:/codes/Job_Platfom-main
mvnw spring-boot:run
```

Wait for: `Started JobPlatfomApplication in X seconds`

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

Look for: `Local: http://localhost:3000/`

### Step 3: Test Registration
1. Open: `http://localhost:3000/register`
2. **Open Browser Console** (F12)
3. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
   - Role: `Job Seeker`
4. Click **"Sign up"**

### Step 4: Check Results

#### ✅ Success Looks Like:
**Browser Console:**
```
Registering user: {name: "Test User", email: "test@example.com", role: "EMPLOYEE"}
Registration response: {token: "ey...", email: "test@example.com", ...}
```

**URL Changes To:**
```
http://localhost:3000/employee/dashboard
```

**Navbar Shows:**
```
[User Icon] Test User (EMPLOYEE) | Logout
```

#### ❌ Failure Looks Like:
**Browser Console:**
```
Registration error: {status: 400, ...}
```

**Red Error Message:**
```
Registration failed. Please try again.
```

---

## 🔍 Troubleshooting

### Error: "Failed to fetch"
- ❌ Backend not running
- ✅ Start backend on port 7070

### Error: "Network Error"
- ❌ CORS issue
- ✅ Backend should log: `Mapped [/api/auth/register]`

### Error: "Email already exists"
- ❌ User already registered
- ✅ Use different email: `test2@example.com`

### Error: "Bad Request"
- ❌ Missing required fields
- ✅ Check all fields are filled

---

## 📋 Test Different Roles

### Test 1: Employee
```
Email: employee@test.com
Role: Job Seeker
Expected: Redirects to /employee/dashboard
```

### Test 2: Recruiter
```
Email: recruiter@test.com
Role: Recruiter
Expected: Redirects to /recruiter/dashboard
```

### Test 3: Login After Registration
1. Logout (top right)
2. Go to Login
3. Enter same credentials
4. Should login successfully

---

## 🎯 Success Criteria

✅ No errors in browser console  
✅ No errors in backend terminal  
✅ Redirects to correct dashboard  
✅ User name shows in navbar  
✅ Can logout and login again  
✅ Chatbot appears (floating button)

---

## 📱 Full User Flow Test

### 1. Register
- Go to `/register`
- Create account
- Auto-redirect to dashboard

### 2. Update Profile
- Click "Update Profile"
- Add details
- Save changes

### 3. Browse Jobs
- Click "Browse Jobs" or "Jobs" in navbar
- See job listings
- Click on a job

### 4. Use Chatbot
- Click floating chat button (bottom right)
- Ask: "How do I apply for a job?"
- See helpful response

### 5. Logout & Login
- Click "Logout"
- Go to "Login"
- Enter credentials
- Login successfully

---

## 💾 Verify Database

Check if user was created:

```sql
USE job_platform;
SELECT * FROM users;
```

Should show:
```
| id | name      | email            | password    | role     |
|----|-----------|------------------|-------------|----------|
| 1  | Test User | test@example.com | $2a$10$...  | EMPLOYEE |
```

---

## ✨ What to Expect

### After Registration:
1. Token saved in localStorage
2. User object saved in localStorage
3. Redirect to dashboard
4. Navbar shows user name
5. Can access all features

### After Login:
1. Same as registration
2. But using existing account
3. Data loaded from database

---

## 🔄 Reset & Retry

If you need to start fresh:

### Delete Test User from Database:
```sql
DELETE FROM users WHERE email = 'test@example.com';
```

### Clear Browser Data:
```javascript
// In browser console
localStorage.clear()
location.reload()
```

### Or:
- Clear cookies & cache
- Use incognito window

---

## 📊 Expected Log Output

### Backend Terminal:
```
Hibernate: insert into users (email, name, password, role) values (?, ?, ?, ?)
Hibernate: select user0_.id as id1_5_, user0_.email as email2_5_ ...
```

### Browser Console:
```
Registering user: {name: "Test User", email: "test@example.com", role: "EMPLOYEE"}
POST http://localhost:7070/api/auth/register 200
Registration response: {token: "eyJ...", email: "test@example.com", name: "Test User", role: "EMPLOYEE"}
```

---

## 🎉 You're Done!

If all steps pass, your registration is working perfectly! 🚀

Now you can:
- ✅ Create unlimited users
- ✅ Test all user roles
- ✅ Use all platform features
- ✅ Get help from AI chatbot

Enjoy your fully functional Job Platform!
