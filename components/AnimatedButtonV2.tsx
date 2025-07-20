'use client'

import { ShimmerButton } from '@/components/magicui/shimmer-button'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AnimatedButtonV2Props {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
}

export default function AnimatedButtonV2({ 
  href, 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  disabled = false 
}: AnimatedButtonV2Props) {
  
  const buttonProps = variant === 'primary' ? {
    shimmerColor: "#E8FC6B",
    background: "rgba(232, 252, 107, 0.2)",
    className: `${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  } : {
    shimmerColor: "#F9F9F9",
    background: "rgba(17, 17, 17, 1)",
    className: `border border-[#F9F9F9]/20 hover:border-[#E8FC6B] ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  }

  const buttonContent = (
    <span className={`whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight ${
      variant === 'primary' ? 'text-[#111111]' : 'text-[#F9F9F9]'
    } lg:text-base`}>
      {children}
    </span>
  )

  if (href && !disabled) {
    return (
      <Link href={href} className="inline-block">
        <ShimmerButton {...buttonProps} disabled={disabled}>
          {buttonContent}
        </ShimmerButton>
      </Link>
    )
  }

  return (
    <ShimmerButton onClick={onClick} disabled={disabled} {...buttonProps}>
      {buttonContent}
    </ShimmerButton>
  )
}