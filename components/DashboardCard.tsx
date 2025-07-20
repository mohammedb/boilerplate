'use client'

import { ShineBorder } from '@/components/magicui/shine-border'
import { motion } from 'framer-motion'

interface DashboardCardProps {
  children: React.ReactNode
  className?: string
  highlight?: boolean
  shineColor?: string | string[]
}

export default function DashboardCard({ 
  children, 
  className = '',
  highlight = false,
  shineColor
}: DashboardCardProps) {
  const defaultShineColor = highlight 
    ? ["#E8FC6B", "#ffaa40", "#E8FC6B"]
    : ["#F9F9F9", "#1a1a1a", "#F9F9F9"]

  return (
    <motion.div 
      className={`relative bg-[#1a1a1a] rounded-[32px] p-8 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <ShineBorder 
        shineColor={shineColor || defaultShineColor}
        borderWidth={highlight ? 2 : 1}
        duration={highlight ? 12 : 18}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}