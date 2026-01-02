import React, { useState, useEffect } from 'react'
import { usePersonalInfo } from '../../hooks/useSupabase'
import { supabase } from '../../services/supabase'
import { uploadProfileImage } from '../../services/storage'
import ImageUpload from './ImageUpload'
import LoadingSpinner from '../common/LoadingSpinner'

const PersonalInfoEditor = () => {
  const { data, loading, refetch } = usePersonalInfo()
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profile_image_url: '',
  })
  const [newImage, setNewImage] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      let profileImageUrl = formData.profile_image_url

      // Upload new image if selected
      if (newImage) {
        const uploadedUrl = await uploadProfileImage(newImage)
        if (uploadedUrl) {
          profileImageUrl = uploadedUrl
        } else {
          setMessage('Error uploading image')
          setSaving(false)
          return
        }
      }

      const updateData = { ...formData, profile_image_url: profileImageUrl }

      // Check if record exists
      if (data && data.id) {
        // Update existing
        const { error } = await supabase
          .from('personal_info')
          .update(updateData)
          .eq('id', data.id)

        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase.from('personal_info').insert([updateData])

        if (error) throw error
      }

      setMessage('Personal information updated successfully!')
      refetch()
      setNewImage(null)
    } catch (error) {
      console.error('Error updating personal info:', error)
      setMessage('Error updating personal information')
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
        Personal Information
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 max-w-2xl">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Profile Image
          </label>
          <ImageUpload
            onUpload={setNewImage}
            currentImage={formData.profile_image_url}
            bucketType="profile"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData(data || {})
              setNewImage(null)
              setMessage('')
            }}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfoEditor
