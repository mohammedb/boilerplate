import { createServerSupabaseClient } from './server'

const AVATARS_BUCKET = 'avatars'
const FILES_BUCKET = 'files'

// Initialize storage buckets (call this once in your app)
export async function initializeStorageBuckets() {
  const supabase = createServerSupabaseClient()
  
  // Create avatars bucket if it doesn't exist
  const { data: avatarsBucket } = await supabase.storage.getBucket(AVATARS_BUCKET)
  if (!avatarsBucket) {
    await supabase.storage.createBucket(AVATARS_BUCKET, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    })
  }
  
  // Create files bucket if it doesn't exist
  const { data: filesBucket } = await supabase.storage.getBucket(FILES_BUCKET)
  if (!filesBucket) {
    await supabase.storage.createBucket(FILES_BUCKET, {
      public: false,
      fileSizeLimit: 52428800, // 50MB
    })
  }
}

// Upload avatar
export async function uploadAvatar(userId: string, file: File) {
  const supabase = createServerSupabaseClient()
  
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

// Delete avatar
export async function deleteAvatar(filePath: string) {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .remove([filePath])
  
  if (error) throw error
}

// Upload file
export async function uploadFile(userId: string, file: File, folder = 'general') {
  const supabase = createServerSupabaseClient()
  
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

// Get file URL (for private files)
export async function getFileUrl(filePath: string) {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase.storage
    .from(FILES_BUCKET)
    .createSignedUrl(filePath, 3600) // 1 hour expiry
  
  if (error) throw error
  return data.signedUrl
}

// List user files
export async function listUserFiles(userId: string, folder = '') {
  const supabase = createServerSupabaseClient()
  
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

// Delete file
export async function deleteFile(filePath: string) {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase.storage
    .from(FILES_BUCKET)
    .remove([filePath])
  
  if (error) throw error
}

// Download file
export async function downloadFile(filePath: string) {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase.storage
    .from(FILES_BUCKET)
    .download(filePath)
  
  if (error) throw error
  return data
}