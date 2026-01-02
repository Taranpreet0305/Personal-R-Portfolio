import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AdminLoginPage = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const success = login(password)
    if (success) {
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-12 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              className="glass-card rounded-xl px-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-accent text-white rounded-xl px-8 py-3 font-semibold hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
