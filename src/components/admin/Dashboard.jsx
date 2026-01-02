import React from 'react'
import { Link } from 'react-router-dom'
import { useProjects, useSkills, useEducation } from '../../hooks/useSupabase'
import LoadingSpinner from '../common/LoadingSpinner'

const Dashboard = () => {
  const { projects, loading: projectsLoading } = useProjects()
  const { skills, loading: skillsLoading } = useSkills()
  const { education, loading: educationLoading } = useEducation()

  const stats = [
    {
      title: 'Projects',
      count: projects.length,
      color: 'bg-blue-500',
      link: '/admin/projects',
    },
    {
      title: 'Skills',
      count: skills.length,
      color: 'bg-green-500',
      link: '/admin/skills',
    },
    {
      title: 'Education',
      count: education.length,
      color: 'bg-purple-500',
      link: '/admin/education',
    },
    { title: 'Last Updated', count: 'Today', color: 'bg-orange-500' },
  ]

  if (projectsLoading || skillsLoading || educationLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`${stat.color} w-12 h-12 rounded-lg mb-4`}></div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/projects/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add New Project
          </Link>
          <Link
            to="/admin/about"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Edit About
          </Link>
          <Link
            to="/admin/personal-info"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Edit Personal Info
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Projects
        </h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet. Add your first project!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{project.title}</td>
                    <td className="py-3 px-4">
                      {project.description?.substring(0, 50)}...
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
