import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMenuOutline, IoLogOutOutline } from 'react-icons/io5'
import useAuth from '../../hooks/useAuth'

const AdminTopbar = ({ onMenuClick, menuOpen }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-700 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        <IoMenuOutline className="text-2xl" />
      </button>
      <div className="flex-1"></div>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
      >
        <IoLogOutOutline className="text-xl mr-2" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  )
}

export default AdminTopbar
