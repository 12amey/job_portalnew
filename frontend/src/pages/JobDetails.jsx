import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../config/api'
import { MapPin, Briefcase, Calendar, Building, ArrowLeft } from 'lucide-react'

const JobDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      const response = await api.get('/jobposts')
      const foundJob = response.data.find(j => j.id === parseInt(id))
      setJob(foundJob)
    } catch (error) {
      console.error('Failed to fetch job details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (user.role !== 'EMPLOYEE') {
      setMessage({ type: 'error', text: 'Only employees can apply for jobs' })
      return
    }

    setApplying(true)
    setMessage({ type: '', text: '' })

    try {
      await api.post('/applications/apply', {
        employeeEmail: user.email,
        jobId: job.id,
        recruiterEmail: job.recruiterEmail
      })
      setMessage({ type: 'success', text: 'Application submitted successfully!' })
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit application' 
      })
    } finally {
      setApplying(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center py-12">
          <p className="text-gray-600 text-lg">Job not found</p>
          <button onClick={() => navigate('/jobs')} className="btn btn-primary mt-4">
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back to Jobs
      </button>

      <div className="card">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.jobTitle}</h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              <span className="font-medium">{job.companyName}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {job.jobLocation}
            </div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              {job.jobType}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar className="h-4 w-4 mr-1" />
            Posted: {formatDate(job.postedDate)}
            {job.deadLineDate && (
              <span className="ml-4 text-red-600 font-medium">
                Deadline: {formatDate(job.deadLineDate)}
              </span>
            )}
          </div>

          {message.text && (
            <div className={`mb-6 px-4 py-3 rounded ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-400 text-green-700' 
                : 'bg-red-50 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.jobDescription}</p>
        </div>

        {user?.role === 'EMPLOYEE' && (
          <button
            onClick={handleApply}
            disabled={applying}
            className="btn btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {applying ? 'Submitting...' : 'Apply for this Job'}
          </button>
        )}

        {!user && (
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary w-full py-3 text-lg"
          >
            Login to Apply
          </button>
        )}
      </div>
    </div>
  )
}

export default JobDetails
