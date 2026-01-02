import { supabase } from './supabase'

// Validate file type
const validateFileType = (file, allowedTypes) => {
  const fileType = file.type
  return allowedTypes.includes(fileType)
}

// Validate file size
const validateFileSize = (file, maxSizeMB) => {
  const fileSizeMB = file.size / (1024 * 1024)
  return fileSizeMB <= maxSizeMB
}

// Upload project image
export const uploadProjectImage = async (file, projectId) => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validateFileType(file, allowedTypes)) {
      console.error('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
      return null
    }

    // Validate file size (max 5MB)
    if (!validateFileSize(file, 5)) {
      console.error('File size exceeds 5MB limit.')
      return null
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${projectId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

    // Upload to 'project-images' bucket
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file)

    if (error) {
      console.error('Error uploading project image:', error)
      // Retry once
      const { data: retryData, error: retryError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file)

      if (retryError) {
        console.error('Retry failed:', retryError)
        return null
      }

      // Get public URL after retry success
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(retryData.path)

      return urlData.publicUrl
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error('Unexpected error uploading project image:', error)
    return null
  }
}

// Upload profile image
export const uploadProfileImage = async (file) => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validateFileType(file, allowedTypes)) {
      console.error('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
      return null
    }

    // Validate file size (max 2MB)
    if (!validateFileSize(file, 2)) {
      console.error('File size exceeds 2MB limit.')
      return null
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `profile/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

    // Upload to 'profile-images' bucket
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file)

    if (error) {
      console.error('Error uploading profile image:', error)
      // Retry once
      const { data: retryData, error: retryError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file)

      if (retryError) {
        console.error('Retry failed:', retryError)
        return null
      }

      // Get public URL after retry success
      const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(retryData.path)

      return urlData.publicUrl
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error('Unexpected error uploading profile image:', error)
    return null
  }
}

// Delete image from storage
export const deleteImage = async (bucketName, filePath) => {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath])

    if (error) {
      console.error('Error deleting image:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Unexpected error deleting image:', error)
    return false
  }
}
