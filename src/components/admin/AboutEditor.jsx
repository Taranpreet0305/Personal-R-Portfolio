import React, { useState, useEffect } from 'react'
import { useAboutContent } from '../../hooks/useSupabase'
import { supabase } from '../../services/supabase'
import LoadingSpinner from '../common/LoadingSpinner'

const AboutEditor = () => {
  const { content, loading, refetch } = useAboutContent()
  const [aboutText, setAboutText] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (content) {
      setAboutText(content.content || '')
    }
  }, [content])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      if (content && content.id) {
        // Update existing
        const { error } = await supabase
          .from('about_content')
          .update({ content: aboutText })
          .eq('id', content.id)

        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase
          .from('about_content')
          .insert([{ content: aboutText }])

        if (error) throw error
      }

      setMessage('About content updated successfully!')
      refetch()
    } catch (error) {
      console.error('Error updating about content:', error)
      setMessage('Error updating about content')
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Section</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 max-w-4xl">
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
          <div className="flex justify-between items-center mb-2">
            <label className="block font-semibold text-gray-700">Content</label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
          {showPreview ? (
            <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] border border-gray-300">
              <p className="whitespace-pre-wrap">{aboutText}</p>
            </div>
          ) : (
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              rows="12"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write about yourself..."
            />
          )}
          <p className="text-sm text-gray-500 mt-2">
            {aboutText.length} characters
          </p>
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
              setAboutText(content?.content || '')
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

export default AboutEditor
