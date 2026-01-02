import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  IoHomeOutline,
  IoPersonOutline,
  IoDocumentTextOutline,
  IoFolderOutline,
  IoSchoolOutline,
  IoMailOutline,
  IoColorPaletteOutline,
  IoGridOutline,
} from 'react-icons/io5'

const AdminSidebar = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: IoHomeOutline },
    {
      name: 'Personal Info',
      path: '/admin/personal-info',
      icon: IoPersonOutline,
    },
    { name: 'About', path: '/admin/about', icon: IoDocumentTextOutline },
    { name: 'Projects', path: '/admin/projects', icon: IoFolderOutline },
    { name: 'Skills', path: '/admin/skills', icon: IoGridOutline },
    { name: 'Education', path: '/admin/education', icon: IoSchoolOutline },
    { name: 'Contact', path: '/admin/contact', icon: IoMailOutline },
    { name: 'Theme', path: '/admin/theme', icon: IoColorPaletteOutline },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="bg-white h-screen border-r border-gray-200 w-full lg:w-[280px] overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Portfolio Admin
        </h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="text-xl mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default AdminSidebar
