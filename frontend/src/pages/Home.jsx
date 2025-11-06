import { Link } from 'react-router-dom'
import { Search, Briefcase, Users, TrendingUp } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-slideInLeft">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-slideInRight">
              Connect with top employers and discover opportunities that match your skills
            </p>
            <div className="flex justify-center gap-4 animate-scaleIn">
              <Link to="/jobs" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Jobs
              </Link>
              <Link to="/register" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 border-2 border-white transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-3d text-center hover:scale-105 transition-transform duration-300 animate-fadeIn">
            <div className="flex justify-center mb-4">
              <Search className="h-12 w-12 text-primary-600 animate-float" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Job Search</h3>
            <p className="text-gray-600">
              Search and filter jobs by location, company, title, and job type to find the perfect match
            </p>
          </div>

          <div className="card-3d text-center hover:scale-105 transition-transform duration-300 animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="flex justify-center mb-4">
              <Briefcase className="h-12 w-12 text-primary-600 animate-float" style={{animationDelay: '0.5s'}} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Opportunities</h3>
            <p className="text-gray-600">
              Access verified job postings from reputable companies across various industries
            </p>
          </div>

          <div className="card-3d text-center hover:scale-105 transition-transform duration-300 animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-primary-600 animate-float" style={{animationDelay: '1s'}} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect with Recruiters</h3>
            <p className="text-gray-600">
              Direct communication with hiring managers and real-time application tracking
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to take the next step in your career?
              </h2>
              <p className="text-gray-600">
                Join thousands of job seekers and find your perfect role today
              </p>
            </div>
            <Link to="/register" className="btn btn-primary px-8 py-3 text-lg whitespace-nowrap">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-4xl font-bold text-primary-600 mb-2">5,000+</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Briefcase className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-4xl font-bold text-primary-600 mb-2">50,000+</div>
            <div className="text-gray-600">Job Seekers</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
