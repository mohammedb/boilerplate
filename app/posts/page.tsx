import PostsList from '@/components/PostsList'
import CreatePost from '@/components/CreatePost'
import { auth } from '@clerk/nextjs/server'

export default async function PostsPage() {
  const { userId } = await auth()

  return (
    <div className="pb-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-medium mb-8">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6H10M4 2L2 6L4 10M8 2L10 6L8 10" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Blog
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#F9F9F9] mb-4">Resources & Updates</h1>
            <p className="text-xl text-[#A0A0A0]">
              Insights, tutorials, and updates from the Qyspo team
            </p>
          </div>
        
          {userId && (
            <div className="mb-12 p-8 bg-[#1a1a1a] rounded-[32px] border border-[#F9F9F9]/10">
              <h2 className="text-2xl font-serif text-[#F9F9F9] mb-6">Create New Post</h2>
              <CreatePost />
            </div>
          )}
        
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif text-[#F9F9F9]">Latest Posts</h2>
              <div className="flex items-center gap-4">
                <button className="text-[#A0A0A0] hover:text-[#E8FC6B] transition-colors text-sm">
                  All Categories
                </button>
                <button className="text-[#A0A0A0] hover:text-[#E8FC6B] transition-colors text-sm">
                  Tutorials
                </button>
                <button className="text-[#A0A0A0] hover:text-[#E8FC6B] transition-colors text-sm">
                  Updates
                </button>
              </div>
            </div>
            <PostsList />
          </div>
        </div>
      </div>
  )
}