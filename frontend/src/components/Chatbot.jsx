import { useState } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 I\'m your Job Platform assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const quickReplies = [
    'How do I apply for a job?',
    'How do I post a job?',
    'Update my profile',
    'Contact support'
  ]

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('apply') || msg.includes('job application')) {
      return 'To apply for a job:\n1. Browse available jobs from the Jobs page\n2. Click on a job you\'re interested in\n3. Click the "Apply for this Job" button\n4. Your application will be submitted instantly!'
    }
    
    if (msg.includes('post') || msg.includes('create job')) {
      return 'To post a job:\n1. Go to your Recruiter Dashboard\n2. Click "Post New Job"\n3. Fill in the job details (title, company, description, etc.)\n4. Click "Post Job" to publish it!'
    }
    
    if (msg.includes('profile') || msg.includes('update')) {
      return 'To update your profile:\n1. Go to your Dashboard\n2. Click on "Update Profile" or "Profile"\n3. Edit your information\n4. Click "Save Changes"'
    }
    
    if (msg.includes('status') || msg.includes('application status')) {
      return 'To check your application status:\n1. Go to Employee Dashboard\n2. View "My Applications" section\n3. You can see status: Pending, Accepted, or Rejected'
    }
    
    if (msg.includes('register') || msg.includes('sign up')) {
      return 'To create an account:\n1. Click "Sign Up" in the navigation\n2. Enter your details (name, email, password)\n3. Select your role (Job Seeker or Recruiter)\n4. Click "Sign up" to create your account!'
    }
    
    if (msg.includes('login') || msg.includes('sign in')) {
      return 'To login:\n1. Click "Login" in the navigation\n2. Enter your email and password\n3. Click "Sign in"\n4. You\'ll be redirected to your dashboard!'
    }
    
    if (msg.includes('help') || msg.includes('support')) {
      return 'I can help you with:\n• Job applications\n• Creating job posts\n• Profile updates\n• Account registration\n• Navigation tips\n\nJust ask me anything!'
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! 😊 How can I assist you with the Job Platform today?'
    }
    
    return 'I\'m here to help! You can ask me about:\n• Applying for jobs\n• Posting job openings\n• Updating your profile\n• Registration and login\n• Or just type "help" for more options'
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newUserMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputMessage),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botResponse])
    }, 500)
  }

  const handleQuickReply = (reply) => {
    setInputMessage(reply)
    handleSendMessage()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-float hover:scale-110"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-scaleIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-8 w-8" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-semibold">Job Assistant</h3>
                <p className="text-xs text-primary-100">Online • Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'bot' 
                      ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white' 
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {message.type === 'bot' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className={`rounded-2xl p-3 ${
                      message.type === 'bot'
                        ? 'bg-white shadow-md'
                        : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
