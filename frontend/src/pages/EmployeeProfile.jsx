import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../config/api'
import { User, Mail, Phone, MapPin, FileText } from 'lucide-react'

const EmployeeProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    experience: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/employees/${user.email}`)
      setProfile(response.data)
      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
        skills: response.data.skills || '',
        experience: response.data.experience || ''
      })
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    try {
      await api.post('/employees/update', formData)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setEditing(false)
      fetchProfile()
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      })
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal information</p>
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

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="btn btn-primary"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="h-4 w-4 inline mr-1" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-4 w-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="input bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="h-4 w-4 inline mr-1" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-4 w-4 inline mr-1" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FileText className="h-4 w-4 inline mr-1" />
                Skills
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
                className="input"
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="4"
                className="input"
                placeholder="Describe your work experience"
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-gray-900 font-medium">{profile?.name || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900 font-medium">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-gray-900 font-medium">{profile?.phone || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-gray-900 font-medium">{profile?.address || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Skills</p>
                <p className="text-gray-900 font-medium">{profile?.skills || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="text-gray-900 font-medium whitespace-pre-line">{profile?.experience || 'Not set'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeProfile
