'use client'

import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { MagicCard } from '@/components/magicui/magic-card'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

export default function MagicUIDemo() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dot Pattern Background */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full"
        )}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          {/* Animated Gradient Text */}
          <AnimatedGradientText className="mb-8">
            <span
              className={cn(
                "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
              )}
            >
              MagicUI Components
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>

          <h1 className="text-6xl font-bold mb-6">
            Beautiful UI Components
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Enhance your existing design with MagicUI's animated components that seamlessly integrate with your dark theme aesthetic.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Shimmer Buttons</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Default Shimmer
              </span>
            </ShimmerButton>

            <ShimmerButton
              shimmerColor="#E8FC6B"
              background="rgba(232, 252, 107, 0.1)"
              className="shadow-2xl"
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-[#E8FC6B] lg:text-lg">
                Accent Color
              </span>
            </ShimmerButton>

            <ShimmerButton
              shimmerColor="#9c40ff"
              background="rgba(156, 64, 255, 0.1)"
              borderRadius="8px"
              className="shadow-2xl"
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-[#9c40ff] lg:text-lg">
                Square Style
              </span>
            </ShimmerButton>
          </div>
        </div>

        {/* Magic Cards Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Magic Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <MagicCard
              className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
              gradientColor="#E8FC6B"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Feature One</h3>
                <p className="text-base text-gray-400">
                  Interactive card with gradient border effect on hover
                </p>
              </div>
            </MagicCard>

            <MagicCard
              className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
              gradientColor="#9c40ff"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Feature Two</h3>
                <p className="text-base text-gray-400">
                  Beautiful animations that respond to mouse movement
                </p>
              </div>
            </MagicCard>

            <MagicCard
              className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
              gradientColor="#ffaa40"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Feature Three</h3>
                <p className="text-base text-gray-400">
                  Customizable gradient colors to match your brand
                </p>
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Integration Example */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Integrate</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            These components work perfectly with your existing Clerk auth, Stripe payments, and Supabase backend.
          </p>
          <ShimmerButton
            shimmerColor="#E8FC6B"
            background="rgba(232, 252, 107, 0.2)"
            className="shadow-2xl"
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              Start Building
            </span>
          </ShimmerButton>
        </div>
      </div>
    </div>
  )
}