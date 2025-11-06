import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../config/api'
import { Briefcase, FileText, PlusCircle, Users } from 'lucide-react'

const RecruiterDashboard = () => {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showJobForm, setShowJobForm] = useState(false)
  const [jobForm, setJobForm] = useState({
    jobTitle: '',
    companyName: '',
    jobType: 'FULL_TIME',
    jobDescription: '',
    jobLocation: '',
    deadLineDate: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        api.get(`/jobposts/recruiters/${user.email}`),
        api.get(`/applications/recruiter/${user.email}`)
      ])
      setJobs(jobsRes.data || [])
      setApplications(appsRes.data || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setJobs([])
      setApplications([])
    } finally {
      setLoading(false)
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
        recruiterEmail: user.email,
        postedDate: new Date().toISOString().split('T')[0]
      })
      setShowJobForm(false)
      setJobForm({
        jobTitle: '',
        companyName: '',
        jobType: 'FULL_TIME',
        jobDescription: '',
        jobLocation: '',
        deadLineDate: ''
      })
      fetchData()
    } catch (error) {
      console.error('Failed to create job:', error)
    }
  }

  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      await api.put('/applications/status', {
        applicationId,
        status
      })
      fetchData()
    } catch (error) {
      console.error('Failed to update application status:', error)
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
        <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
            </div>
            <Briefcase className="h-12 w-12 text-primary-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
            </div>
            <FileText className="h-12 w-12 text-primary-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">
                {applications.filter(app => app.status === 'PENDING').length}
              </p>
            </div>
            <Users className="h-12 w-12 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
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
        <div className="card mb-8">
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

      {/* Posted Jobs */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No jobs posted yet</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.companyName} • {job.jobLocation}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted: {new Date(job.postedDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Applications */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications Received</h2>
        {applications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No applications yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Applied Date
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
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.employeeName}</div>
                      <div className="text-sm text-gray-500">{app.employeeEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium">{app.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateApplicationStatus(app.id, 'ACCEPTED')}
                            className="text-green-600 hover:text-green-800"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleUpdateApplicationStatus(app.id, 'REJECTED')}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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

export default RecruiterDashboard
