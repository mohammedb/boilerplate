'use client'

import { ShineBorder } from '@/components/magicui/shine-border'
import AnimatedCardWithShine from '@/components/AnimatedCardWithShine'
import { motion } from 'framer-motion'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { Star, Zap, Shield } from 'lucide-react'

export default function ShineBorderDemo() {
  const cards = [
    {
      title: "Featured Project",
      description: "Highlight your most important content with eye-catching shine effects",
      icon: <Star className="w-6 h-6" />,
      shineColor: ["#E8FC6B", "#ffaa40", "#E8FC6B"],
      featured: true
    },
    {
      title: "Premium Features",
      description: "Draw attention to premium offerings with subtle animations",
      icon: <Zap className="w-6 h-6" />,
      shineColor: ["#9c40ff", "#FE8FB5", "#9c40ff"],
      featured: false
    },
    {
      title: "Security First",
      description: "Build trust with secure, professional-looking components",
      icon: <Shield className="w-6 h-6" />,
      shineColor: ["#00D9FF", "#00ff88", "#00D9FF"],
      featured: false
    }
  ]

  const showcaseCards = [
    {
      title: "Gradient Shine",
      shineColor: ["#A07CFE", "#FE8FB5", "#FFBE7B"],
      borderWidth: 2,
      duration: 10
    },
    {
      title: "Monochrome Elegance",
      shineColor: "#E8FC6B",
      borderWidth: 1,
      duration: 14
    },
    {
      title: "Rainbow Effect",
      shineColor: ["#ff0080", "#ff8c00", "#ffd700", "#00ff00", "#00ffff", "#ff0080"],
      borderWidth: 3,
      duration: 8
    }
  ]

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-serif text-[#F9F9F9] mb-6">
            ShineBorder Effects
          </h1>
          <p className="text-xl text-[#A0A0A0] max-w-2xl mx-auto">
            Create stunning animated borders that draw attention to your most important content
          </p>
        </div>

        {/* Feature Cards with Different Shine Effects */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-[#F9F9F9] mb-8 text-center">
            Feature Cards with Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <AnimatedCardWithShine
                key={index}
                shineColor={card.shineColor}
                shineBorderWidth={card.featured ? 2 : 1}
                shineDuration={card.featured ? 10 : 14}
                className={card.featured ? 'md:scale-105' : ''}
              >
                <div className="text-[#E8FC6B] mb-4">{card.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-[#F9F9F9]">
                  {card.title}
                </h3>
                <p className="text-[#A0A0A0]">{card.description}</p>
              </AnimatedCardWithShine>
            ))}
          </div>
        </section>

        {/* Showcase Different Shine Styles */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-[#F9F9F9] mb-8 text-center">
            Shine Style Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseCards.map((card, index) => (
              <motion.div
                key={index}
                className="relative bg-[#1a1a1a] rounded-2xl p-8 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ShineBorder
                  shineColor={card.shineColor}
                  borderWidth={card.borderWidth}
                  duration={card.duration}
                />
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-[#F9F9F9]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#A0A0A0] mb-4">
                    Border: {card.borderWidth}px | Duration: {card.duration}s
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {Array.isArray(card.shineColor) ? (
                      card.shineColor.map((color, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: color }}
                        />
                      ))
                    ) : (
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: card.shineColor }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Login Card Example */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-[#F9F9F9] mb-8 text-center">
            Interactive Form Example
          </h2>
          <div className="max-w-md mx-auto">
            <div className="relative bg-[#1a1a1a] rounded-2xl p-8 overflow-hidden">
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 text-[#F9F9F9]">Welcome Back</h3>
                <p className="text-[#A0A0A0] mb-6">
                  Sign in to access your account
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm text-[#F9F9F9] mb-1 block">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-[#111111] border border-[#F9F9F9]/20 rounded-lg text-[#F9F9F9] focus:border-[#E8FC6B] focus:outline-none transition-colors"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#F9F9F9] mb-1 block">Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-[#111111] border border-[#F9F9F9]/20 rounded-lg text-[#F9F9F9] focus:border-[#E8FC6B] focus:outline-none transition-colors"
                    />
                  </div>
                  <ShimmerButton
                    className="w-full"
                    shimmerColor="#E8FC6B"
                    background="rgba(232, 252, 107, 0.2)"
                  >
                    <span className="text-white font-medium">Sign In</span>
                  </ShimmerButton>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-serif text-[#F9F9F9] mb-4">
            Ready to Add Shine to Your Cards?
          </h2>
          <p className="text-xl text-[#A0A0A0] mb-8 max-w-2xl mx-auto">
            Use ShineBorder to highlight important content, premium features, or create visual hierarchy
          </p>
          <div className="flex gap-4 justify-center">
            <ShimmerButton
              shimmerColor="#E8FC6B"
              background="rgba(232, 252, 107, 0.2)"
            >
              <span className="text-white font-medium px-4 py-1">View Documentation</span>
            </ShimmerButton>
            <ShimmerButton
              shimmerColor="#F9F9F9"
              background="rgba(17, 17, 17, 1)"
              className="border border-[#F9F9F9]/20"
            >
              <span className="text-white font-medium px-4 py-1">See More Examples</span>
            </ShimmerButton>
          </div>
        </section>
      </div>
    </div>
  )
}