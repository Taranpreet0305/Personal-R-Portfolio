import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check localStorage for authentication status
    try {
      const authStatus = localStorage.getItem('adminAuthenticated')
      if (authStatus === 'true') {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Failed to check authentication status:', error)
    }
  }, [])

  const login = (password) => {
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD

    if (password === adminPassword) {
      setIsAuthenticated(true)
      try {
        localStorage.setItem('adminAuthenticated', 'true')
      } catch (error) {
        console.error('Failed to save authentication status:', error)
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    try {
      localStorage.removeItem('adminAuthenticated')
    } catch (error) {
      console.error('Failed to remove authentication status:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
