'use client'

import { useState } from 'react'
import { uploadAvatar } from '@/lib/supabase/storage-client'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'

interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  onUploadComplete?: (url: string) => void
}

export default function AvatarUpload({ currentAvatarUrl, onUploadComplete }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl)
  const { userId } = useAuth()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !userId) return

    setUploading(true)

    try {
      const { publicUrl } = await uploadAvatar(userId, file)
      setAvatarUrl(publicUrl)
      onUploadComplete?.(publicUrl)
      alert('Avatar uploaded successfully!')
    } catch (error: any) {
      console.error('Error uploading avatar:', error)
      let errorMessage = 'Error uploading avatar'
      
      if (error?.message?.includes('row-level security')) {
        errorMessage = 'Storage policies not configured. Please run the SQL in supabase-storage-policies.sql'
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#1a1a1a] border-2 border-[#F9F9F9]/20">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg
              className="w-12 h-12 text-[#A0A0A0]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div>
        <label className="cursor-pointer">
          <span className="px-6 py-2.5 border border-[#F9F9F9]/20 text-[#F9F9F9] rounded-full hover:border-[#E8FC6B] hover:text-[#E8FC6B] inline-block transition-all text-sm font-medium">
            {uploading ? 'Uploading...' : 'Change Photo'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading || !userId}
            className="hidden"
          />
        </label>
        <p className="text-xs text-[#A0A0A0] mt-2">JPG, PNG up to 5MB</p>
      </div>
    </div>
  )
}