'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isSignedIn) {
      alert('Please sign in to create a post')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/supabase/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      })

      if (response.ok) {
        setTitle('')
        setContent('')
        setPublished(false)
        router.refresh()
        alert('Post created successfully!')
      } else {
        const error = await response.json()
        alert(error.error || 'Error creating post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post')
    } finally {
      setLoading(false)
    }
  }

  if (!isSignedIn) {
    return (
      <div className="text-center p-6 bg-[#E8FC6B]/10 text-[#E8FC6B] rounded-2xl">
        Please sign in to create posts
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#F9F9F9] mb-3">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 bg-[#111111] border border-[#F9F9F9]/20 rounded-xl text-[#F9F9F9] placeholder-[#A0A0A0] focus:border-[#E8FC6B] focus:outline-none transition-colors"
          placeholder="Enter post title"
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[#F9F9F9] mb-3">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-[#111111] border border-[#F9F9F9]/20 rounded-xl text-[#F9F9F9] placeholder-[#A0A0A0] focus:border-[#E8FC6B] focus:outline-none transition-colors resize-none"
          placeholder="Share your thoughts..."
        />
      </div>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-12 h-6 rounded-full transition-colors ${
            published ? 'bg-[#E8FC6B]' : 'bg-[#F9F9F9]/20'
          }`}>
            <div className={`w-5 h-5 bg-[#111111] rounded-full transition-transform transform ${
              published ? 'translate-x-6' : 'translate-x-0.5'
            } mt-0.5 ml-0.5`}></div>
          </div>
          <span className="ml-3 text-sm text-[#F9F9F9]">
            Publish immediately
          </span>
        </label>
        
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-[0_0_20px_rgba(232,252,107,0.3)]"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  )
}