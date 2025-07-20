'use client'

import { motion } from 'framer-motion'
import { ShineBorder } from '@/components/magicui/shine-border'
import { cardHover, scrollReveal } from '@/lib/animations'

interface AnimatedCardWithShineProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
  shineColor?: string | string[]
  shineBorderWidth?: number
  shineDuration?: number
}

export default function AnimatedCardWithShine({ 
  children, 
  className = '', 
  delay = 0,
  hover = true,
  shineColor = ["#E8FC6B", "#9c40ff", "#ffaa40"],
  shineBorderWidth = 2,
  shineDuration = 14
}: AnimatedCardWithShineProps) {
  return (
    <motion.div
      className={`relative bg-[#1a1a1a] rounded-[32px] p-8 overflow-hidden ${className}`}
      variants={scrollReveal}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
      {...(hover ? {
        whileHover: { 
          scale: 1.02,
          transition: { duration: 0.3 }
        }
      } : {})}
    >
      <ShineBorder 
        shineColor={shineColor}
        borderWidth={shineBorderWidth}
        duration={shineDuration}
      />
      {children}
    </motion.div>
  )
}