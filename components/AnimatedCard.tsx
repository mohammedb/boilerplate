'use client'

import { motion } from 'framer-motion'
import { cardHover, scrollReveal } from '@/lib/animations'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`bg-[#1a1a1a] rounded-[32px] p-8 border border-[#F9F9F9]/10 ${className}`}
      variants={scrollReveal}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
      {...(hover ? {
        whileHover: { 
          scale: 1.02,
          borderColor: "rgba(232, 252, 107, 0.3)",
          transition: { duration: 0.3 }
        }
      } : {})}
    >
      {children}
    </motion.div>
  )
}