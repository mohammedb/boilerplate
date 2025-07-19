'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import AvatarUpload from './AvatarUpload'

interface Profile {
  id?: string
  user_id: string
  username: string | null
  avatar_url: string | null
  bio: string | null
}

export default function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { userId } = useAuth()

  // Load profile on mount
  useEffect(() => {
    if (userId) {
      loadProfile()
    }
  }, [userId])

  const loadProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!userId) return

    setSaving(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (avatarUrl: string) => {
    await updateProfile({ avatar_url: avatarUrl })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#E8FC6B] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-[#F9F9F9] mb-4">Profile Picture</h3>
        <AvatarUpload 
          currentAvatarUrl={profile?.avatar_url} 
          onUploadComplete={handleAvatarUpload}
        />
        {saving && (
          <p className="mt-3 text-sm text-[#E8FC6B]">Updating avatar...</p>
        )}
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        updateProfile({
          username: formData.get('username') as string,
          bio: formData.get('bio') as string,
        })
      }}>
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#F9F9F9] mb-3">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={profile?.username || ''}
              className="w-full px-4 py-3 bg-[#111111] border border-[#F9F9F9]/20 rounded-xl text-[#F9F9F9] placeholder-[#A0A0A0] focus:border-[#E8FC6B] focus:outline-none transition-colors"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-[#F9F9F9] mb-3">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              defaultValue={profile?.bio || ''}
              className="w-full px-4 py-3 bg-[#111111] border border-[#F9F9F9]/20 rounded-xl text-[#F9F9F9] placeholder-[#A0A0A0] focus:border-[#E8FC6B] focus:outline-none transition-colors resize-none"
              placeholder="Tell us about yourself"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-[0_0_20px_rgba(232,252,107,0.3)]"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}