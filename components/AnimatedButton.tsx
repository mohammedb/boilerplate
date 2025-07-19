'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface AnimatedButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
}

export default function AnimatedButton({ 
  href, 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  disabled = false 
}: AnimatedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-semibold transition-all"
  
  const variants = {
    primary: "px-8 py-3 bg-[#E8FC6B] text-[#111111] hover:bg-[#E8FC6B]/90",
    secondary: "px-6 py-2.5 border border-[#F9F9F9]/20 text-[#F9F9F9] hover:border-[#E8FC6B] hover:text-[#E8FC6B]"
  }

  const MotionLink = motion(Link)

  const buttonContent = (
    <>
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-[#E8FC6B] rounded-full blur-xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </>
  )

  const motionProps = {
    whileHover: !disabled ? { scale: 1.05 } : undefined,
    whileTap: !disabled ? { scale: 0.98 } : undefined,
    className: `relative ${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
  }

  if (href && !disabled) {
    return (
      <MotionLink href={href} {...motionProps}>
        {buttonContent}
      </MotionLink>
    )
  }

  return (
    <motion.button onClick={onClick} disabled={disabled} {...motionProps}>
      {buttonContent}
    </motion.button>
  )
}