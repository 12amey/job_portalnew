import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../config/api'
import { Briefcase, FileText, User, CheckCircle, XCircle, Clock } from 'lucide-react'

const EmployeeDashboard = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await api.get(`/applications/employee/${user.email}`)
      setApplications(response.data)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'REJECTED':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'text-green-600 bg-green-50'
      case 'REJECTED':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-yellow-600 bg-yellow-50'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 transition-all duration-500">{applications.length}</p>
            </div>
            <FileText className="h-12 w-12 text-primary-600 transform hover:rotate-12 transition-transform" />
          </div>
        </div>
        
        <div className="stat-card animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 transition-all duration-500">
                {applications.filter(app => app.status === 'PENDING').length}
              </p>
            </div>
            <Clock className="h-12 w-12 text-yellow-600 transform hover:rotate-12 transition-transform animate-pulse" />
          </div>
        </div>
        
        <div className="stat-card animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Accepted</p>
              <p className="text-3xl font-bold text-green-600 transition-all duration-500">
                {applications.filter(app => app.status === 'ACCEPTED').length}
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-600 transform hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link to="/jobs" className="card-3d hover:shadow-2xl transition-all animate-slideInLeft group">
          <div className="flex items-center">
            <Briefcase className="h-10 w-10 text-primary-600 mr-4 transform group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">Browse Jobs</h3>
              <p className="text-gray-600 text-sm">Find your next opportunity</p>
            </div>
          </div>
        </Link>
        
        <Link to="/employee/profile" className="card-3d hover:shadow-2xl transition-all animate-slideInRight group">
          <div className="flex items-center">
            <User className="h-10 w-10 text-primary-600 mr-4 transform group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">Update Profile</h3>
              <p className="text-gray-600 text-sm">Keep your information current</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Applications List */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Applications</h2>
        
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No applications yet</p>
            <Link to="/jobs" className="btn btn-primary mt-4">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{application.jobTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {application.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-2">{application.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeDashboard
