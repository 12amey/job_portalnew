# Job Platform Frontend

A modern, responsive frontend application for the Job Platform built with React, Vite, and TailwindCSS.

## Features

- **User Authentication**: Login and Registration with JWT
- **Role-Based Access**: Different dashboards for Employees, Recruiters, and Admins
- **Job Listings**: Browse and search jobs by title, company, location, and type
- **Application Management**: Apply for jobs and track application status
- **Recruiter Dashboard**: Post jobs and manage applications
- **Admin Dashboard**: User management and system statistics
- **Profile Management**: Update user profiles

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:7070`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── config/          # Configuration files
│   │   └── api.js       # Axios configuration
│   ├── context/         # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── JobListings.jsx
│   │   ├── JobDetails.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── EmployeeProfile.jsx
│   │   ├── RecruiterDashboard.jsx
│   │   ├── RecruiterProfile.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Integration

The frontend connects to the backend API at `http://localhost:7070/api`. The API base URL is configured in `src/config/api.js`.

### API Endpoints Used

- **Authentication**
  - POST `/api/auth/register` - User registration
  - POST `/api/auth/login` - User login

- **Jobs**
  - GET `/api/jobposts` - Get all jobs
  - POST `/api/jobposts` - Create job (Recruiter)
  - GET `/api/jobposts/recruiters/:email` - Get jobs by recruiter
  - GET `/api/jobposts/search/:term` - Search jobs

- **Applications**
  - POST `/api/ap/applications/apply` - Apply for job
  - GET `/api/ap/applications/job/:email` - Get applications
  - PUT `/api/ap/applications/status` - Update application status

- **Employees**
  - GET `/api/employees/:email` - Get employee profile
  - POST `/api/employees/update` - Update employee profile

- **Recruiters**
  - GET `/api/recruiters/:email` - Get recruiter profile
  - POST `/api/recruiters/save` - Update recruiter profile

- **Admin**
  - GET `/api/admins/users` - Get all users
  - GET `/api/admins/users/role?role=:role` - Get users by role
  - PUT `/api/admins/users/status` - Update user status
  - GET `/api/admins/status` - Get system statistics

## User Roles

The application supports three user roles:

1. **EMPLOYEE**
   - Browse and search jobs
   - Apply for jobs
   - Track application status
   - Manage profile

2. **RECRUITER**
   - Post job openings
   - Manage job postings
   - Review applications
   - Accept/reject candidates
   - Manage profile

3. **ADMIN**
   - View system statistics
   - Manage all users
   - Activate/deactivate users
   - Filter users by role

## Features by Role

### Employee Features
- Job search and filtering
- Job application submission
- Application status tracking
- Profile management

### Recruiter Features
- Job posting creation
- Application management
- Candidate review
- Company profile management

### Admin Features
- User management
- System statistics
- User activation/deactivation
- Role-based user filtering

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in `localStorage`
- Automatically attached to API requests via Axios interceptors
- Auto-logout on token expiration (401 responses)

## Styling

TailwindCSS is used for styling with custom utility classes defined in `src/index.css`:
- `.btn` - Base button styles
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-danger` - Danger/delete button
- `.input` - Form input styles
- `.card` - Card container styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Backend Connection Issues
- Ensure the backend is running on `http://localhost:7070`
- Check CORS settings in the backend

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Styling Issues
- Ensure TailwindCSS is properly configured
- Check that PostCSS is processing the styles

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the Job Platform application.
