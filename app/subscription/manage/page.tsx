import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ManageSubscriptionPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <Link href="/profile" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-[#F9F9F9] mb-4">Manage Subscription</h1>
          <p className="text-xl text-[#A0A0A0]">
            Update your billing information and manage your subscription
          </p>
        </div>
        
        <div className="bg-[#1a1a1a] rounded-[32px] p-8 border border-[#F9F9F9]/10">
          <h2 className="text-2xl font-serif text-[#F9F9F9] mb-6">Subscription Management</h2>
          <p className="text-gray-400 mb-8">
            To manage your subscription, billing details, or download invoices, you&apos;ll be redirected to our secure billing portal powered by Stripe.
          </p>
          
          <form action="/api/stripe/portal-session" method="POST">
            <button 
              type="submit"
              className="bg-[#E8FC6B] text-black font-semibold py-3 px-8 rounded-full hover:bg-[#d9eb5c] transition-colors"
            >
              Open Billing Portal
            </button>
          </form>
          
          <div className="mt-8 p-6 bg-[#F9F9F9]/5 rounded-2xl">
            <h3 className="font-semibold mb-3">What you can do in the billing portal:</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                Update payment methods
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                Download invoices and receipts
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                Cancel or pause your subscription
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#E8FC6B] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                Update billing information
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}