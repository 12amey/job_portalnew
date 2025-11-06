# Job Platform - Frontend Setup Guide

This guide will help you set up and run the complete Job Platform application with both backend and frontend.

## Prerequisites

### Backend Requirements
- Java 8 or higher
- Maven
- MySQL Database
- Spring Boot 2.7.15

### Frontend Requirements
- Node.js v14+ (recommended v18+)
- npm or yarn

## Quick Start

### Step 1: Setup Database

1. Create a MySQL database:
```sql
CREATE DATABASE job_platform;
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=mysql://localhost:3306/job_platform
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Step 2: Start Backend

1. Navigate to the project root:
```bash
cd d:/codes/Job_Platfom-main
```

2. Build the backend:
```bash
mvnw clean install
```

3. Run the backend:
```bash
mvnw spring-boot:run
```

The backend will start on `http://localhost:7070`

### Step 3: Setup Frontend

1. Open a new terminal and navigate to the frontend directory:
```bash
cd d:/codes/Job_Platfom-main/frontend
```

2. Install dependencies:
```bash
npm install
```

### Step 4: Start Frontend

Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Accessing the Application

1. Open your browser and go to `http://localhost:3000`
2. You'll see the home page with options to:
   - Browse Jobs
   - Login
   - Register

## Creating Your First Account

### Register as Employee (Job Seeker)
1. Click "Sign Up" or "Get Started"
2. Fill in your details:
   - Full Name
   - Email
   - Password
   - Select "Job Seeker" as role
3. Click "Sign up"
4. You'll be redirected to the Employee Dashboard

### Register as Recruiter
1. Click "Sign Up"
2. Fill in your details:
   - Full Name
   - Email
   - Password
   - Select "Recruiter" as role
3. Click "Sign up"
4. You'll be redirected to the Recruiter Dashboard
5. Complete your company profile
6. Start posting jobs

### Admin Access
Admin accounts need to be created directly in the database or through the registration API with role "ADMIN".

## Application Features

### For Job Seekers (EMPLOYEE)
1. **Browse Jobs**: View all available job postings
2. **Search Jobs**: Filter by title, company, location, or type
3. **Apply for Jobs**: Submit applications with one click
4. **Track Applications**: Monitor application status (Pending, Accepted, Rejected)
5. **Manage Profile**: Update personal information, skills, and experience

### For Recruiters (RECRUITER)
1. **Post Jobs**: Create job postings with details
2. **Manage Postings**: View all your posted jobs
3. **Review Applications**: See all applications for your jobs
4. **Accept/Reject Candidates**: Update application status
5. **Company Profile**: Manage company information

### For Administrators (ADMIN)
1. **User Management**: View and manage all users
2. **System Statistics**: View total users, jobs, and applications
3. **User Control**: Activate or deactivate user accounts
4. **Filter Users**: View users by role (Employee, Recruiter, Admin)

## API Endpoints

The frontend communicates with these backend endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobposts` - Get all jobs
- `POST /api/jobposts` - Create job posting
- `GET /api/jobposts/recruiters/{email}` - Get jobs by recruiter
- `GET /api/jobposts/search/{term}` - Search jobs

### Applications
- `POST /api/ap/applications/apply` - Submit job application
- `GET /api/ap/applications/job/{email}` - Get applications
- `PUT /api/ap/applications/status` - Update application status

### Profiles
- `GET /api/employees/{email}` - Get employee profile
- `POST /api/employees/update` - Update employee profile
- `GET /api/recruiters/{email}` - Get recruiter profile
- `POST /api/recruiters/save` - Update recruiter profile

### Admin
- `GET /api/admins/users` - Get all users
- `GET /api/admins/users/role?role={role}` - Filter users by role
- `PUT /api/admins/users/status` - Update user status
- `GET /api/admins/status` - Get system statistics

## Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Change the port in application.properties
server.port=8080
# Then update API base URL in frontend/src/config/api.js
```

**Database Connection Failed**
- Ensure MySQL is running
- Verify database credentials
- Check if the database exists

### Frontend Issues

**Dependencies Installation Failed**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**CORS Errors**
- Ensure backend has CORS enabled
- Check that backend is running on port 7070
- Verify API URL in `frontend/src/config/api.js`

**Build Errors**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Development Tips

### Backend Development
- Changes are auto-detected with Spring Boot DevTools
- Check logs for any errors: `target/spring-boot-run.log`
- Use H2 console for debugging: Add H2 dependency and enable console

### Frontend Development
- Hot reload is enabled by default
- Check browser console for errors
- Use React DevTools extension for debugging
- API calls are logged in the browser network tab

## Production Build

### Backend
```bash
mvnw clean package
java -jar target/job_platfom-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your web server
```

## Project Structure

```
Job_Platfom-main/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── config/          # API configuration
│   │   ├── context/         # React Context
│   │   ├── pages/           # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── src/                      # Spring Boot backend
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/job_platform/
│   │   │       ├── Controller/
│   │   │       ├── Service/
│   │   │       ├── Repository/
│   │   │       ├── Entity/
│   │   │       └── DTO/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Additional Configuration

### Email Service (Optional)
Update in `application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### File Upload (Optional)
Update Cloudinary credentials:
```properties
cloudinary.cloud_name=YOUR_CLOUD_NAME
cloudinary.api_key=YOUR_API_KEY
cloudinary.api_secret=YOUR_API_SECRET
```

## Support

For issues or questions:
1. Check the logs (backend: console, frontend: browser console)
2. Verify all services are running
3. Ensure database is accessible
4. Check network connectivity between frontend and backend

## Next Steps

1. ✅ Backend is running on port 7070
2. ✅ Frontend is running on port 3000
3. ✅ Database is configured
4. Start using the application!

Happy job hunting! 🎯
