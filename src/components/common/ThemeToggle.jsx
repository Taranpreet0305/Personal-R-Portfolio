import React from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5'
import useTheme from '../../hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        theme === 'dark' ? 'glass-header' : 'glass-header-light'
      } hover:scale-110 transition-transform duration-200`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <IoSunny className="text-xl text-yellow-400" />
      ) : (
        <IoMoon className="text-xl text-indigo-600" />
      )}
    </button>
  )
}

export default ThemeToggle
