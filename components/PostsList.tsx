'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  created_at: string
  user_id: string
}

export default function PostsList({ userOnly = false }: { userOnly?: boolean }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [userOnly])

  const fetchPosts = async () => {
    try {
      const url = userOnly ? '/api/supabase/posts?user=true' : '/api/supabase/posts'
      const response = await fetch(url)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#E8FC6B] border-t-transparent"></div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#A0A0A0]">No posts found yet. Be the first to share!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post.id} className="group bg-[#1a1a1a] rounded-[24px] p-8 border border-[#F9F9F9]/10 hover:border-[#E8FC6B]/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#E8FC6B] text-xs font-medium uppercase tracking-wider">
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-[#A0A0A0] text-xs">
                  {new Date(post.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <h3 className="text-2xl font-serif text-[#F9F9F9] mb-3 group-hover:text-[#E8FC6B] transition-colors">
                {post.title}
              </h3>
              {post.content && (
                <p className="text-[#A0A0A0] line-clamp-2">
                  {post.content}
                </p>
              )}
            </div>
            {post.user_id === userId && (
              <span className="px-3 py-1 bg-[#E8FC6B]/20 text-[#E8FC6B] rounded-full text-xs font-medium">
                Your post
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-6">
            <button className="text-[#E8FC6B] text-sm font-medium hover:underline">
              Read more →
            </button>
            <div className="flex items-center gap-4 text-[#A0A0A0] text-sm">
              <button className="hover:text-[#E8FC6B] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2C4 2 1 8 1 8s3 6 7 6 7-6 7-6-3-6-7-6z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
              <button className="hover:text-[#E8FC6B] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12m-6-6v12" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}