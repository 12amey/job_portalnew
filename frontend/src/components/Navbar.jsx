import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Briefcase, LogOut, User, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getDashboardLink = () => {
    if (!user) return null
    
    switch (user.role) {
      case 'EMPLOYEE':
        return '/employee/dashboard'
      case 'RECRUITER':
        return '/recruiter/dashboard'
      case 'ADMIN':
        return '/admin/dashboard'
      default:
        return null
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">JobPlatform</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-4">
              <Link to="/jobs" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Jobs
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {getDashboardLink() && (
                  <Link 
                    to={getDashboardLink()} 
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user.name}</span>
                  <span className="text-xs text-gray-500 hidden md:inline">({user.role})</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
