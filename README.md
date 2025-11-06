# Job Platform - Complete Full-Stack Application

A comprehensive job portal application built with Spring Boot backend and React frontend, featuring role-based access control for Employees, Recruiters, and Admins.

## 🚀 Features

### For Job Seekers (Employees)
- ✅ Browse and search job listings
- ✅ Apply for jobs with one click
- ✅ Track application status in real-time
- ✅ Manage personal profile and skills
- ✅ View application history

### For Recruiters
- ✅ Post job openings
- ✅ Manage job postings
- ✅ Review applications
- ✅ Accept/reject candidates
- ✅ Company profile management
- ✅ Dashboard with statistics

### For Administrators
- ✅ User management (activate/deactivate)
- ✅ System statistics and analytics
- ✅ Role-based user filtering
- ✅ Complete system oversight

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 2.7.15
- **Language**: Java 8
- **Database**: MySQL
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **Additional**: Spring Data JPA, Hibernate

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## 📋 Prerequisites

Before running the application, ensure you have:

- **Java**: JDK 8 or higher
- **Maven**: 3.6 or higher
- **MySQL**: 5.7 or higher
- **Node.js**: v14 or higher (v18+ recommended)
- **npm**: 6 or higher

## 🚀 Quick Start

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE job_platform;
```

Update credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=mysql://localhost:3306/job_platform
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Backend Setup

```bash
# Navigate to project root
cd d:/codes/Job_Platfom-main

# Build the project
mvnw clean install

# Run the backend
mvnw spring-boot:run
```

Backend will start on **http://localhost:7070**

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on **http://localhost:3000**

### 4. Access the Application

Open your browser and navigate to **http://localhost:3000**

## 🎯 Quick Start Script (Windows)

For easier startup, use the provided batch script:

```bash
# From project root
start-app.bat
```

This will automatically start both backend and frontend servers.

## 📁 Project Structure

```
Job_Platfom-main/
├── src/                          # Backend source
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/job_platform/
│   │   │       ├── Controller/   # REST Controllers
│   │   │       ├── Service/      # Business Logic
│   │   │       ├── Repository/   # Data Access
│   │   │       ├── Entity/       # JPA Entities
│   │   │       ├── DTO/          # Data Transfer Objects
│   │   │       ├── Enum/         # Enumerations
│   │   │       └── Security/     # Security Config
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── config/              # Configuration files
│   │   ├── context/             # React Context (Auth)
│   │   ├── pages/               # Page components
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── pom.xml                      # Maven configuration
├── start-app.bat                # Quick start script
├── FRONTEND_SETUP.md            # Detailed setup guide
└── README.md                    # This file
```

## 🔐 User Roles & Permissions

### EMPLOYEE
- Register and login
- Browse all job postings
- Search and filter jobs
- Apply for jobs
- View application status
- Update personal profile

### RECRUITER
- Register and login
- Post job openings
- View all posted jobs
- Manage applications
- Accept/reject candidates
- Update company profile

### ADMIN
- Manage all users
- View system statistics
- Activate/deactivate users
- Filter users by role
- System oversight

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Job Management
- `GET /api/jobposts` - Get all jobs
- `POST /api/jobposts` - Create job (Recruiter)
- `GET /api/jobposts/recruiters/{email}` - Get recruiter's jobs
- `GET /api/jobposts/search/{term}` - Search jobs

### Application Management
- `POST /ap/applications/apply` - Submit application
- `GET /ap/applications/job/{email}` - Get applications
- `PUT /ap/applications/status` - Update application status

### Profile Management
- `GET /api/employees/{email}` - Get employee profile
- `POST /api/employees/update` - Update employee profile
- `GET /api/recruiters/{email}` - Get recruiter profile
- `POST /api/recruiters/save` - Update recruiter profile

### Admin
- `GET /api/admins/users` - Get all users
- `GET /api/admins/users/role?role={role}` - Filter by role
- `PUT /api/admins/users/status` - Update user status
- `GET /api/admins/status` - System statistics

## 🎨 Features Breakdown

### Authentication System
- JWT-based authentication
- Secure password encryption (BCrypt)
- Role-based access control
- Session management

### Job Posting System
- Create detailed job postings
- Multiple job types (Full-time, Part-time, Contract, Internship)
- Deadline management
- Company information

### Application System
- One-click job application
- Application status tracking
- Recruiter review interface
- Application history

### Search & Filter
- Search by job title
- Filter by company name
- Filter by location
- Filter by job type

### Dashboard Analytics
- Employee: Application statistics
- Recruiter: Job and application metrics
- Admin: System-wide statistics

## 🔧 Configuration

### Backend Configuration

**Database** (`application.properties`):
```properties
spring.datasource.url=mysql://localhost:3306/job_platform
spring.datasource.username=root
spring.datasource.password=your_password
```

**Server Port**:
```properties
server.port=7070
```

**JWT Configuration**:
```properties
jwt.secret=zidioSecretKey
jwt.expiration=86400000
```

### Frontend Configuration

**API URL** (`src/config/api.js`):
```javascript
baseURL: 'http://localhost:7070/api'
```

**Development Server** (`vite.config.js`):
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:7070',
      changeOrigin: true,
    }
  }
}
```

## 🐛 Troubleshooting

### Backend Issues

**Port 7070 already in use**:
```bash
# Find and kill the process
netstat -ano | findstr :7070
taskkill /PID <process_id> /F
```

**Database connection failed**:
- Ensure MySQL is running
- Verify credentials in application.properties
- Check if database exists

### Frontend Issues

**Dependencies installation failed**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**CORS errors**:
- Backend CORS is configured for `http://localhost:3000`
- Ensure backend is running
- Check browser console for specific errors

**Build errors**:
```bash
rm -rf node_modules/.vite
npm run dev
```

## 📦 Production Deployment

### Backend
```bash
# Build JAR file
mvnw clean package -DskipTests

# Run JAR
java -jar target/job_platfom-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build

# Deploy 'dist' folder to web server
# Update API URL in production build
```

## 🧪 Testing

### Backend
```bash
mvnw test
```

### Frontend
```bash
cd frontend
npm run lint
```

## 📝 Environment Variables

Create `.env` file in frontend directory (optional):
```env
VITE_API_URL=http://localhost:7070/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of a job platform demonstration.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review application logs
3. Verify all services are running
4. Check database connectivity

## 🎯 Getting Started

1. **First Time Setup**:
   - Install all prerequisites
   - Setup database
   - Configure application.properties
   - Install frontend dependencies

2. **Daily Development**:
   - Start MySQL service
   - Run backend: `mvnw spring-boot:run`
   - Run frontend: `cd frontend && npm run dev`
   - Access: http://localhost:3000

3. **Create First User**:
   - Navigate to http://localhost:3000
   - Click "Sign Up"
   - Choose your role (Employee/Recruiter)
   - Complete registration
   - Start using the platform!

## ✨ Key Highlights

- 🔐 Secure authentication with JWT
- 🎨 Modern, responsive UI with TailwindCSS
- 📱 Mobile-friendly design
- ⚡ Fast performance with Vite
- 🔄 Real-time application tracking
- 📊 Comprehensive dashboards
- 🛡️ Role-based access control
- 🔍 Advanced search and filtering

## 📞 Contact

For more information about this project, please refer to the documentation files:
- `FRONTEND_SETUP.md` - Detailed frontend setup guide
- `frontend/README.md` - Frontend-specific documentation

---

**Happy Coding!** 🚀
