'use client'

import { motion } from 'framer-motion'
import { MagicCard } from '@/components/magicui/magic-card'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { cn } from '@/lib/utils'
import { ChevronRight, Zap, Shield, Rocket } from 'lucide-react'

export default function MagicUISection() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Built with Next.js 15 and optimized for peak performance",
      color: "#E8FC6B"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure by Default",
      description: "Clerk authentication and Stripe payments integrated",
      color: "#9c40ff"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Ready to Scale",
      description: "Supabase backend with real-time capabilities",
      color: "#ffaa40"
    }
  ]

  return (
    <section className="py-20 px-6">
      <motion.div 
        className="max-w-[1200px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header with Animated Gradient Text */}
        <div className="text-center mb-16">
          <AnimatedGradientText className="mb-6">
            <span
              className={cn(
                "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
              )}
            >
              Enhanced with MagicUI
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
          
          <h2 className="text-5xl md:text-6xl font-serif text-[#F9F9F9] mb-6">
            Beautiful Components
          </h2>
          
          <p className="text-xl text-[#A0A0A0] max-w-2xl mx-auto">
            Elevate your user experience with animated, interactive components that seamlessly blend with your design.
          </p>
        </div>

        {/* Magic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MagicCard
                className="cursor-pointer h-full"
                gradientColor={feature.color}
              >
                <div className="p-8">
                  <div className="mb-4" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-[#F9F9F9]">
                    {feature.title}
                  </h3>
                  <p className="text-[#A0A0A0]">
                    {feature.description}
                  </p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* CTA with Shimmer Button */}
        <div className="text-center">
          <ShimmerButton
            shimmerColor="#E8FC6B"
            background="rgba(232, 252, 107, 0.2)"
            className="shadow-2xl"
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg px-4 py-1">
              Explore Components
            </span>
          </ShimmerButton>
        </div>
      </motion.div>
    </section>
  )
}