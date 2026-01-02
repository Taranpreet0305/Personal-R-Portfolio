import React, { useState } from 'react'
import { useSkills } from '../../hooks/useSupabase'
import { supabase } from '../../services/supabase'
import LoadingSpinner from '../common/LoadingSpinner'
import { IoTrashOutline } from 'react-icons/io5'

const SkillsManager = () => {
  const { skills, loading, refetch } = useSkills()
  const [newSkill, setNewSkill] = useState('')
  const [adding, setAdding] = useState(false)

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newSkill.trim()) return

    // Check for duplicates
    if (skills.some((s) => s.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      alert('This skill already exists')
      return
    }

    setAdding(true)
    try {
      const { error } = await supabase
        .from('skills')
        .insert([{ name: newSkill.trim(), order_index: skills.length }])

      if (error) throw error

      setNewSkill('')
      refetch()
    } catch (error) {
      console.error('Error adding skill:', error)
      alert('Error adding skill')
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('skills').delete().eq('id', id)

      if (error) throw error

      refetch()
    } catch (error) {
      console.error('Error deleting skill:', error)
      alert('Error deleting skill')
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Skills</h1>

      <div className="bg-white rounded-xl p-8 max-w-4xl">
        <form onSubmit={handleAdd} className="mb-8">
          <label className="block font-semibold text-gray-700 mb-2">
            Add New Skill
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter skill name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={adding || !newSkill.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>

        {skills.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No skills added yet. Add your first skill!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200"
              >
                <span className="font-medium text-gray-900">{skill.name}</span>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  aria-label="Delete skill"
                >
                  <IoTrashOutline className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsManager
