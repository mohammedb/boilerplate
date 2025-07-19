import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUserProfile, createUserProfile, updateUserProfile } from '@/lib/supabase/database'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const profile = await getUserProfile(userId, true)
    
    if (!profile) {
      // Create a default profile if none exists
      const newProfile = await createUserProfile({
        user_id: userId,
        username: null,
        avatar_url: null,
        bio: null,
      }, true)
      return NextResponse.json(newProfile)
    }
    
    return NextResponse.json(profile)
  } catch (error: any) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Error fetching profile', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await req.json()
    const { username, avatar_url, bio } = body
    
    // Check if profile exists
    const existingProfile = await getUserProfile(userId, true)
    
    if (!existingProfile) {
      // Create new profile
      const newProfile = await createUserProfile({
        user_id: userId,
        username,
        avatar_url,
        bio,
      }, true)
      return NextResponse.json(newProfile)
    }
    
    // Update existing profile
    const updates: any = {}
    if (username !== undefined) updates.username = username
    if (avatar_url !== undefined) updates.avatar_url = avatar_url
    if (bio !== undefined) updates.bio = bio
    
    const updatedProfile = await updateUserProfile(userId, updates, true)
    return NextResponse.json(updatedProfile)
  } catch (error: any) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Error updating profile', details: error.message },
      { status: 500 }
    )
  }
}