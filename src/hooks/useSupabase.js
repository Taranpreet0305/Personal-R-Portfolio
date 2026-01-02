import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

// Hook to fetch personal info
export const usePersonalInfo = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: result, error } = await supabase
        .from('personal_info')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching personal info:', error)
        setData(null)
      } else {
        setData(result)
      }
    } catch (error) {
      console.error('Unexpected error fetching personal info:', error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, refetch: fetchData }
}

// Hook to fetch projects
export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } else {
        setProjects(data || [])
      }
    } catch (error) {
      console.error('Unexpected error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { projects, loading, refetch: fetchData }
}

// Hook to fetch skills
export const useSkills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching skills:', error)
        setSkills([])
      } else {
        setSkills(data || [])
      }
    } catch (error) {
      console.error('Unexpected error fetching skills:', error)
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { skills, loading, refetch: fetchData }
}

// Hook to fetch education
export const useEducation = () => {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching education:', error)
        setEducation([])
      } else {
        setEducation(data || [])
      }
    } catch (error) {
      console.error('Unexpected error fetching education:', error)
      setEducation([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { education, loading, refetch: fetchData }
}

// Hook to fetch social links
export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching social links:', error)
        setSocialLinks([])
      } else {
        setSocialLinks(data || [])
      }
    } catch (error) {
      console.error('Unexpected error fetching social links:', error)
      setSocialLinks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { socialLinks, loading, refetch: fetchData }
}

// Hook to fetch about content
export const useAboutContent = () => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching about content:', error)
        setContent(null)
      } else {
        setContent(data)
      }
    } catch (error) {
      console.error('Unexpected error fetching about content:', error)
      setContent(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { content, loading, refetch: fetchData }
}

// Hook to fetch theme settings
export const useThemeSettings = () => {
  const [themeSettings, setThemeSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching theme settings:', error)
        setThemeSettings(null)
      } else {
        setThemeSettings(data)
      }
    } catch (error) {
      console.error('Unexpected error fetching theme settings:', error)
      setThemeSettings(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { themeSettings, loading, refetch: fetchData }
}
