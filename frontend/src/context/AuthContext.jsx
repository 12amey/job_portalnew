import { createContext, useState, useContext, useEffect } from 'react'
import api from '../config/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      console.log('Logging in user:', email)
      const response = await api.post('/auth/login', { email, password })
      console.log('Login response:', response.data)
      const { token, ...userData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      return { success: true, user: userData }
    } catch (error) {
      console.error('Login error:', error.response || error)
      const errorMessage = error.response?.data?.message 
        || error.response?.data 
        || error.message 
        || 'Login failed. Please check your credentials.'
      return { 
        success: false, 
        error: errorMessage
      }
    }
  }

  const register = async (name, email, password, role) => {
    try {
      console.log('Registering user:', { name, email, role })
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password, 
        role 
      })
      console.log('Registration response:', response.data)
      const { token, ...userData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      return { success: true, user: userData }
    } catch (error) {
      console.error('Registration error:', error.response || error)
      const errorMessage = error.response?.data?.message 
        || error.response?.data 
        || error.message 
        || 'Registration failed. Please try again.'
      return { 
        success: false, 
        error: errorMessage
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
