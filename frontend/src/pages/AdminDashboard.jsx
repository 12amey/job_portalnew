import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../config/api'
import { Users, Briefcase, TrendingUp, Shield, PlusCircle } from 'lucide-react'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [systemStatus, setSystemStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState('ALL')
  const [showJobForm, setShowJobForm] = useState(false)
  const [jobForm, setJobForm] = useState({
    jobTitle: '',
    companyName: '',
    jobType: 'FULL_TIME',
    jobDescription: '',
    jobLocation: '',
    deadLineDate: '',
    recruiterEmail: user.email
  })

  useEffect(() => {
    fetchData()
  }, [selectedRole])

  const fetchData = async () => {
    try {
      const [usersRes, statusRes] = await Promise.all([
        selectedRole === 'ALL' 
          ? api.get('/admins/users')
          : api.get(`/admins/users/role?role=${selectedRole}`),
        api.get('/admins/status')
      ])
      setUsers(usersRes.data)
      setSystemStatus(statusRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserStatusUpdate = async (email, isActive) => {
    try {
      await api.put('/admins/users/status', {
        email,
        isActive: !isActive
      })
      fetchData()
    } catch (error) {
      console.error('Failed to update user status:', error)
    }
  }

  const handleJobFormChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateJob = async (e) => {
    e.preventDefault()
    try {
      await api.post('/jobposts', {
        ...jobForm,
        postedDate: new Date().toISOString().split('T')[0]
      })
      setShowJobForm(false)
      setJobForm({
        jobTitle: '',
        companyName: '',
        jobType: 'FULL_TIME',
        jobDescription: '',
        jobLocation: '',
        deadLineDate: '',
        recruiterEmail: user.email
      })
      alert('Job posted successfully!')
    } catch (error) {
      console.error('Failed to create job:', error)
      alert('Failed to post job')
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
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System Overview and User Management</p>
      </div>

      {/* System Stats */}
      {systemStatus && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{systemStatus.totalUsers || 0}</p>
              </div>
              <Users className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{systemStatus.totalJobs || 0}</p>
              </div>
              <Briefcase className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{systemStatus.totalApplications || 0}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-green-600">{systemStatus.activeUsers || 0}</p>
              </div>
              <Shield className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>
      )}

      {/* Admin Job Posting */}
      <div className="mb-8">
        <button
          onClick={() => setShowJobForm(!showJobForm)}
          className="btn btn-primary flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Job Creation Form */}
      {showJobForm && (
        <div className="card mb-8 animate-fadeIn">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Job Posting</h2>
          <form onSubmit={handleCreateJob} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  required
                  value={jobForm.jobTitle}
                  onChange={handleJobFormChange}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={jobForm.companyName}
                  onChange={handleJobFormChange}
                  className="input"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={jobForm.jobType}
                  onChange={handleJobFormChange}
                  className="input"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="jobLocation"
                  required
                  value={jobForm.jobLocation}
                  onChange={handleJobFormChange}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadLineDate"
                required
                value={jobForm.deadLineDate}
                onChange={handleJobFormChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                required
                rows="5"
                value={jobForm.jobDescription}
                onChange={handleJobFormChange}
                className="input"
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
              <button
                type="button"
                onClick={() => setShowJobForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* User Management */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Filter by Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="input py-2"
            >
              <option value="ALL">All Roles</option>
              <option value="EMPLOYEE">Employees</option>
              <option value="RECRUITER">Recruiters</option>
              <option value="ADMIN">Admins</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{u.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      u.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {u.email !== user.email && (
                      <button
                        onClick={() => handleUserStatusUpdate(u.email, u.isActive)}
                        className={`${
                          u.isActive 
                            ? 'text-red-600 hover:text-red-800' 
                            : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {u.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
