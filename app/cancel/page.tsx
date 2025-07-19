import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <Link href="/" className="inline-flex items-center text-[#F9F9F9] hover:text-[#E8FC6B] transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
            <path d="M8 1L1 8L8 15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Back to Home
        </Link>
        
        <div className="bg-[#1a1a1a] rounded-[32px] p-12 text-center border border-[#F9F9F9]/10">
          <div className="mb-6">
            <div className="w-20 h-20 bg-[#F9F9F9]/10 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-[#F9F9F9]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-serif text-[#F9F9F9] mb-4">Payment Cancelled</h1>
          <p className="text-[#A0A0A0] mb-8 max-w-sm mx-auto">
            Your payment was cancelled. No charges have been made to your account.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 transition-all font-semibold shadow-[0_0_20px_rgba(232,252,107,0.3)]"
            >
              View Plans
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border border-[#F9F9F9]/20 text-[#F9F9F9] rounded-full hover:border-[#E8FC6B] hover:text-[#E8FC6B] transition-all font-medium"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}