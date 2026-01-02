import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../components/admin/AdminLayout'
import Dashboard from '../components/admin/Dashboard'
import PersonalInfoEditor from '../components/admin/PersonalInfoEditor'
import AboutEditor from '../components/admin/AboutEditor'
import ProjectsManager from '../components/admin/ProjectsManager'
import ProjectForm from '../components/admin/ProjectForm'
import SkillsManager from '../components/admin/SkillsManager'
import EducationManager from '../components/admin/EducationManager'
import ContactEditor from '../components/admin/ContactEditor'
import ThemeEditor from '../components/admin/ThemeEditor'

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personal-info" element={<PersonalInfoEditor />} />
        <Route path="/about" element={<AboutEditor />} />
        <Route path="/projects" element={<ProjectsManager />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/edit/:id" element={<ProjectForm />} />
        <Route path="/skills" element={<SkillsManager />} />
        <Route path="/education" element={<EducationManager />} />
        <Route path="/contact" element={<ContactEditor />} />
        <Route path="/theme" element={<ThemeEditor />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminRoutes
