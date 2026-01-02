import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { uploadProjectImage } from '../../services/storage'
import ImageUpload from './ImageUpload'
import LoadingSpinner from '../common/LoadingSpinner'

const ProjectForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_url: '',
    live_url: '',
    image_url: '',
  })
  const [newImage, setNewImage] = useState(null)

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setFormData(data)
    } catch (error) {
      console.error('Error fetching project:', error)
      alert('Error loading project')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      let imageUrl = formData.image_url

      // Upload new image if selected
      if (newImage) {
        const uploadedUrl = await uploadProjectImage(newImage, id || 'new')
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          alert('Error uploading image')
          setSaving(false)
          return
        }
      }

      const projectData = { ...formData, image_url: imageUrl }

      if (id) {
        // Update existing
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id)

        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase.from('projects').insert([projectData])

        if (error) throw error
      }

      navigate('/admin/projects')
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {id ? 'Edit Project' : 'Add New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 max-w-3xl">
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={10}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Image {!id && '*'}
          </label>
          <ImageUpload
            onUpload={setNewImage}
            currentImage={formData.image_url}
            bucketType="project"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Live Demo URL
          </label>
          <input
            type="url"
            name="live_url"
            value={formData.live_url || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving || (!newImage && !id && !formData.image_url)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : id ? 'Update Project' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
