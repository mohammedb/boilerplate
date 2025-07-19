'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

export default function SetupPage() {
  const [initStatus, setInitStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { isSignedIn, userId } = useAuth()

  const initializeStorage = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/supabase/init-storage', {
        method: 'POST',
      })
      const data = await response.json()
      setInitStatus(data)
    } catch (error) {
      console.error('Error initializing storage:', error)
      setInitStatus({ error: 'Failed to initialize storage' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-medium mb-8">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 2L2 10M2 2L10 10" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Documentation
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#F9F9F9] mb-4">Setup Guide</h1>
            <p className="text-xl text-[#A0A0A0]">
              Configure your Supabase integration in minutes
            </p>
          </div>
        
          <div className="bg-[#1a1a1a] rounded-[32px] p-8 border border-[#F9F9F9]/10 mb-8">
            <h2 className="text-2xl font-serif text-[#F9F9F9] mb-4">Initialize Storage</h2>
            <p className="text-[#A0A0A0] mb-6">
              Create the required storage buckets in Supabase for file uploads and avatars.
            </p>
            
            {!isSignedIn && (
              <div className="bg-[#E8FC6B]/10 border border-[#E8FC6B]/30 rounded-2xl p-4 mb-6">
                <p className="text-[#E8FC6B] text-sm">
                  Sign in required to initialize storage buckets
                </p>
              </div>
            )}
            
            <button
              onClick={initializeStorage}
              disabled={loading}
              className="px-8 py-3 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-[0_0_20px_rgba(232,252,107,0.3)]"
            >
              {loading ? 'Initializing...' : 'Initialize Storage'}
            </button>
            
            {initStatus && (
              <div className="mt-6 p-6 bg-[#111111] border border-[#F9F9F9]/10 rounded-xl">
                <h3 className="font-medium text-[#F9F9F9] mb-3">Results:</h3>
                <pre className="text-sm text-[#A0A0A0] overflow-auto font-mono">
                  {JSON.stringify(initStatus, null, 2)}
                </pre>
              </div>
            )}
          </div>
        
          <div className="space-y-8">
            <div className="bg-[#1a1a1a] rounded-[32px] p-8 border border-[#F9F9F9]/10">
              <h2 className="text-2xl font-serif text-[#F9F9F9] mb-6">Quick Start</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#E8FC6B] text-[#111111] rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#F9F9F9] mb-2">Create Supabase Project</h3>
                    <p className="text-[#A0A0A0] text-sm">Visit supabase.com and create a new project for your application</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#E8FC6B] text-[#111111] rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#F9F9F9] mb-2">Get API Keys</h3>
                    <p className="text-[#A0A0A0] text-sm mb-3">Find your credentials in project settings</p>
                    <div className="bg-[#111111] p-4 rounded-xl border border-[#F9F9F9]/10">
                      <code className="text-[#E8FC6B] text-xs font-mono block mb-2">NEXT_PUBLIC_SUPABASE_URL</code>
                      <code className="text-[#E8FC6B] text-xs font-mono block mb-2">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                      <code className="text-[#E8FC6B] text-xs font-mono block">SUPABASE_SERVICE_ROLE_KEY</code>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#E8FC6B] text-[#111111] rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#F9F9F9] mb-2">Run Migrations</h3>
                    <p className="text-[#A0A0A0] text-sm">Execute <code className="text-[#E8FC6B]">supabase-schema.sql</code> in your SQL editor</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#E8FC6B] text-[#111111] rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#F9F9F9] mb-2">Apply Policies</h3>
                    <p className="text-[#A0A0A0] text-sm">Run <code className="text-[#E8FC6B]">supabase-storage-policies.sql</code> for file uploads</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#E8FC6B] text-[#111111] rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#F9F9F9] mb-2">Initialize Storage</h3>
                    <p className="text-[#A0A0A0] text-sm">Click the button above to create storage buckets</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#F008E1]/10 to-[#00C2FF]/10 rounded-[32px] p-8 border border-[#F9F9F9]/10">
              <h3 className="text-xl font-serif text-[#F9F9F9] mb-4">Troubleshooting</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg width="16" height="16" className="text-[#E8FC6B] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                    <path d="M8 1v7m0 4v3m0-7.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="text-[#F9F9F9] font-medium text-sm">Invalid API key</p>
                    <p className="text-[#A0A0A0] text-xs mt-1">Verify your Supabase URL and anon key are correct</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg width="16" height="16" className="text-[#E8FC6B] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                    <path d="M8 1v7m0 4v3m0-7.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="text-[#F9F9F9] font-medium text-sm">Bucket already exists</p>
                    <p className="text-[#A0A0A0] text-xs mt-1">This is expected if you've initialized before</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg width="16" height="16" className="text-[#E8FC6B] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                    <path d="M8 1v7m0 4v3m0-7.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="text-[#F9F9F9] font-medium text-sm">Permission denied</p>
                    <p className="text-[#A0A0A0] text-xs mt-1">Ensure RLS policies are applied correctly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}