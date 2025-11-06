import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../config/api'
import { Search, MapPin, Briefcase, Calendar, Building } from 'lucide-react'

const JobListings = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('title')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobposts')
      setJobs(response.data)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      fetchJobs()
      return
    }

    setLoading(true)
    try {
      let endpoint = `/jobposts/search/${searchTerm}`
      const response = await api.get(endpoint)
      setJobs(response.data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by job title, company, or location..."
                  className="input pl-10"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Search Jobs
            </button>
            <button 
              type="button" 
              onClick={() => {
                setSearchTerm('')
                fetchJobs()
              }}
              className="btn btn-secondary"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="card text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No jobs found</p>
          </div>
        ) : (
          jobs.map((job, index) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="card-3d hover:shadow-2xl transition-all duration-300 block group animate-fadeIn"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {job.jobTitle}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {job.companyName}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.jobLocation}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.jobType}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3 line-clamp-2">
                    {job.jobDescription}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted: {formatDate(job.postedDate)}
                    {job.deadLineDate && (
                      <span className="ml-4">
                        Deadline: {formatDate(job.deadLineDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default JobListings
