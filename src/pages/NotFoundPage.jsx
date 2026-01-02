import React from 'react'
import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'

const NotFoundPage = () => {
  const { isDark } = useTheme()

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? 'bg-gradient-dark' : 'bg-gradient-light'
      }`}
    >
      <div
        className={`${
          isDark ? 'glass-card' : 'glass-card-light'
        } rounded-3xl p-12 max-w-md text-center`}
      >
        <h1
          className={`text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          404
        </h1>
        <p
          className={`text-xl mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Oops! Page not found.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-accent text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
