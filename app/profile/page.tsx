import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/ProfileForm'
import PostsList from '@/components/PostsList'
import { SubscriptionStatus } from '@/components/SubscriptionStatus'
import Link from 'next/link'

export default async function ProfilePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-medium mb-8">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2C3.79 2 2 3.79 2 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
              </svg>
              Dashboard
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#F9F9F9] mb-4">Your Profile</h1>
            <p className="text-xl text-[#A0A0A0]">
              Manage your account settings and view your content
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#1a1a1a] rounded-[32px] p-8 border border-[#F9F9F9]/10">
                <h2 className="text-2xl font-serif text-[#F9F9F9] mb-6">Account Settings</h2>
                <ProfileForm />
              </div>
              
              <div className="bg-[#1a1a1a] rounded-[32px] p-8 border border-[#F9F9F9]/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#F9F9F9]">Your Posts</h2>
                  <Link href="/posts" className="text-[#E8FC6B] text-sm font-medium hover:underline">
                    Create New →
                  </Link>
                </div>
                <PostsList userOnly={true} />
              </div>
            </div>
            
            <div className="space-y-8">
              <SubscriptionStatus />
              
              <div className="bg-[#1a1a1a] rounded-[32px] p-8 border border-[#E8FC6B]/20">
                <h3 className="text-xl font-serif text-[#F9F9F9] mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-[#E8FC6B]">0</div>
                    <div className="text-sm text-[#A0A0A0]">Total Posts</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#E8FC6B]">0</div>
                    <div className="text-sm text-[#A0A0A0]">Files Uploaded</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#E8FC6B]/20 to-[#E8FC6B]/5 rounded-[32px] p-8 border border-[#E8FC6B]/30">
                <h3 className="text-xl font-serif text-[#F9F9F9] mb-4">Storage Info</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                    <span className="text-[#F9F9F9]/80">Avatar images stored in Supabase</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                    <span className="text-[#F9F9F9]/80">Posts saved in PostgreSQL</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                    <span className="text-[#F9F9F9]/80">Secure file upload support</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                    <span className="text-[#F9F9F9]/80">Real-time data sync</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}