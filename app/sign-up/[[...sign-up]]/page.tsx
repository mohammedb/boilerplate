import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#111111] relative">
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-[#F9F9F9] text-2xl font-medium flex items-center hover:text-[#E8FC6B] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="inline-block">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
          <span className="ml-2">Qyspo</span>
        </Link>
      </div>
      
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif text-[#F9F9F9] mb-2">Create Your Account</h1>
            <p className="text-[#A0A0A0]">Start building your SaaS in minutes</p>
          </div>
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none",
              }
            }}
          />
          <div className="mt-6 text-center">
            <p className="text-[#A0A0A0] text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-[#E8FC6B] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}