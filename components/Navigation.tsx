'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useAuth } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { navMenuSlide } from '@/lib/animations'

interface NavLink {
  href: string
  label: string
  authenticated?: boolean
}

const navLinks: NavLink[] = [
  { href: '/products', label: 'Pricing' },
  { href: '/posts', label: 'Blog' },
  { href: '/setup', label: 'Docs' },
  { href: '/profile', label: 'Dashboard', authenticated: true },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { userId } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredLinks = navLinks.filter(link => 
    !link.authenticated || (link.authenticated && userId)
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#F9F9F9]/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              href="/" 
              className="text-[#F9F9F9] text-2xl font-medium flex items-center hover:text-[#E8FC6B] transition-colors group"
            >
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="inline-block"
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </motion.svg>
              <span className="ml-2">Qyspo</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative ${
                    pathname === link.href
                      ? 'text-[#E8FC6B]'
                      : 'text-[#F9F9F9] hover:text-[#E8FC6B]'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E8FC6B]"
                      layoutId="activeNav"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Auth Section */}
          <motion.div 
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {userId ? (
              <>
                <Link
                  href="/posts"
                  className="px-4 py-2 text-[#F9F9F9] text-sm font-medium hover:text-[#E8FC6B] transition-colors"
                >
                  Create
                </Link>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-[#F9F9F9] hover:text-[#E8FC6B] transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-block"
                >
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
                  <Link
                    href="/sign-up"
                    className="relative block px-6 py-2.5 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 transition-all text-sm font-semibold"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F9F9F9] hover:text-[#E8FC6B] transition-colors"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden mt-6 pb-6 border-t border-[#F9F9F9]/10 pt-6"
              variants={navMenuSlide}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div 
                className="flex flex-col gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1,
                    }
                  }
                }}
              >
                {filteredLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-base font-medium transition-colors ${
                        pathname === link.href
                          ? 'text-[#E8FC6B]'
                          : 'text-[#F9F9F9] hover:text-[#E8FC6B]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="mt-4 pt-4 border-t border-[#F9F9F9]/10">
                  {userId ? (
                    <div className="flex items-center justify-between">
                      <Link
                        href="/posts"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[#F9F9F9] hover:text-[#E8FC6B] transition-colors font-medium"
                      >
                        Create Post
                      </Link>
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10"
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/sign-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center px-6 py-2.5 border border-[#F9F9F9]/20 text-[#F9F9F9] rounded-full hover:border-[#E8FC6B] hover:text-[#E8FC6B] transition-all font-medium"
                      >
                        Sign In
                      </Link>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                      >
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
                        <Link
                          href="/sign-up"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="relative block text-center px-6 py-2.5 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 transition-all font-semibold"
                        >
                          Get Started
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}