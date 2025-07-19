import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { auth } from '@clerk/nextjs/server'

const AVATARS_BUCKET = 'avatars'
const FILES_BUCKET = 'files'

export async function POST(req: NextRequest) {
  try {
    // Optional: Add auth check if you want to restrict who can initialize buckets
    const { userId } = await auth()
    
    // Check if service role key is configured
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { 
          error: 'Missing SUPABASE_SERVICE_ROLE_KEY',
          message: 'Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file. You can find this in your Supabase project settings under API.'
        },
        { status: 500 }
      )
    }
    
    const supabase = createAdminClient()
    const results = []
    
    // Create avatars bucket if it doesn't exist
    const { data: avatarsBucket } = await supabase.storage.getBucket(AVATARS_BUCKET)
    if (!avatarsBucket) {
      const { data, error } = await supabase.storage.createBucket(AVATARS_BUCKET, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      })
      
      if (error) {
        results.push({ bucket: AVATARS_BUCKET, status: 'error', error: error.message })
      } else {
        results.push({ bucket: AVATARS_BUCKET, status: 'created' })
      }
    } else {
      results.push({ bucket: AVATARS_BUCKET, status: 'exists' })
    }
    
    // Create files bucket if it doesn't exist
    const { data: filesBucket } = await supabase.storage.getBucket(FILES_BUCKET)
    if (!filesBucket) {
      const { data, error } = await supabase.storage.createBucket(FILES_BUCKET, {
        public: false,
        fileSizeLimit: 52428800, // 50MB
      })
      
      if (error) {
        results.push({ bucket: FILES_BUCKET, status: 'error', error: error.message })
      } else {
        results.push({ bucket: FILES_BUCKET, status: 'created' })
      }
    } else {
      results.push({ bucket: FILES_BUCKET, status: 'exists' })
    }
    
    return NextResponse.json({ 
      message: 'Storage initialization complete',
      results 
    })
  } catch (error: any) {
    console.error('Error initializing storage:', error)
    return NextResponse.json(
      { error: 'Error initializing storage', details: error.message },
      { status: 500 }
    )
  }
}