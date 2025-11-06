import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import JobListings from './pages/JobListings'
import JobDetails from './pages/JobDetails'
import EmployeeDashboard from './pages/EmployeeDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeProfile from './pages/EmployeeProfile'
import RecruiterProfile from './pages/RecruiterProfile'

// Components
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Chatbot from './components/Chatbot'

function App() {
  const { user } = useAuth()

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Chatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/jobs" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/jobs" /> : <Register />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          
          {/* Employee Routes */}
          <Route 
            path="/employee/dashboard" 
            element={
              <ProtectedRoute role="EMPLOYEE">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/profile" 
            element={
              <ProtectedRoute role="EMPLOYEE">
                <EmployeeProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Recruiter Routes */}
          <Route 
            path="/recruiter/dashboard" 
            element={
              <ProtectedRoute role="RECRUITER">
                <RecruiterDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recruiter/profile" 
            element={
              <ProtectedRoute role="RECRUITER">
                <RecruiterProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
