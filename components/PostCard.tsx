'use client'

import { motion } from 'framer-motion'
import { ShineBorder } from '@/components/magicui/shine-border'

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string | null
    published: boolean
    created_at: string
    user_id: string
  }
  isUserPost: boolean
  index: number
}

export default function PostCard({ post, isUserPost, index }: PostCardProps) {
  return (
    <motion.article 
      className="group relative bg-[#1a1a1a] rounded-[24px] p-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
    >
      <ShineBorder 
        shineColor={isUserPost 
          ? ["#E8FC6B", "#ffaa40", "#E8FC6B"]
          : ["#F9F9F9", "#1a1a1a", "#F9F9F9"]
        }
        borderWidth={1}
        duration={isUserPost ? 12 : 20}
      />
      <div className="relative z-10">
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
          {isUserPost && (
            <motion.span 
              className="px-3 py-1 bg-[#E8FC6B]/20 text-[#E8FC6B] rounded-full text-xs font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              Your post
            </motion.span>
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
      </div>
    </motion.article>
  )
}