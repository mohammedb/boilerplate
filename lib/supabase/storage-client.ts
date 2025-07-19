import { createClient } from './client'

const AVATARS_BUCKET = 'avatars'
const FILES_BUCKET = 'files'

// Upload avatar (client-side only)
export async function uploadAvatar(userId: string, file: File) {
  const supabase = createClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `${userId}/${fileName}`
  
  const { data, error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .upload(filePath, file, {
      upsert: true,
      cacheControl: '3600'
    })
  
  if (error) throw error
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(AVATARS_BUCKET)
    .getPublicUrl(filePath)
  
  return { path: data.path, publicUrl }
}

// Delete avatar (client-side only)
export async function deleteAvatar(filePath: string) {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .remove([filePath])
  
  if (error) throw error
}

// Upload file (client-side only)
export async function uploadFile(userId: string, file: File, folder = 'general') {
  const supabase = createClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${file.name}`
  const filePath = `${userId}/${folder}/${fileName}`
  
  const { data, error } = await supabase.storage
    .from(FILES_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600'
    })
  
  if (error) throw error
  
  return { path: data.path, fileName: file.name, size: file.size }
}

// Get file URL (for private files) (client-side only)
export async function getFileUrl(filePath: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(FILES_BUCKET)
    .createSignedUrl(filePath, 3600) // 1 hour expiry
  
  if (error) throw error
  return data.signedUrl
}

// List user files (client-side only)
export async function listUserFiles(userId: string, folder = '') {
  const supabase = createClient()
  
  const path = folder ? `${userId}/${folder}` : userId
  
  const { data, error } = await supabase.storage
    .from(FILES_BUCKET)
    .list(path, {
      limit: 100,
      offset: 0,
    })
  
  if (error) throw error
  return data
}

// Delete file (client-side only)
export async function deleteFile(filePath: string) {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(FILES_BUCKET)
    .remove([filePath])
  
  if (error) throw error
}

// Download file (client-side only)
export async function downloadFile(filePath: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(FILES_BUCKET)
    .download(filePath)
  
  if (error) throw error
  return data
}