'use client'

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, hoverScale, glowPulse, scrollReveal } from "@/lib/animations";

export default function Home() {
  const { userId } = useAuth();

  return (
    <PageTransition>
      <section className="pt-20 pb-20 px-6">
        <motion.div 
          className="max-w-[1200px] mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-12" variants={staggerItem}>
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6H11M6 1V11" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              News
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="text-[64px] md:text-[80px] lg:text-[96px] font-serif leading-[0.9] text-[#F9F9F9] mb-8 max-w-[1000px]"
            variants={fadeInUp}
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              The Fastest Way
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              to Ship Your SaaS
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#A0A0A0] mb-12 max-w-[600px]"
            variants={staggerItem}
          >
            Professional Next.js boilerplate with authentication, payments, and database. 
            Focus on your product, not the setup.
          </motion.p>
          
          <motion.div variants={staggerItem}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block relative"
            >
              <motion.div
                className="absolute inset-0 bg-[#E8FC6B] rounded-full blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              <Link
                href={userId ? "/profile" : "/sign-up"}
                className="relative inline-flex items-center gap-3 px-8 py-4 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 transition-all text-base font-semibold"
              >
                Subscribe — Our Plan
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2"/>
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              offscreen: { opacity: 0 },
              onscreen: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="bg-[#D9D9D9] rounded-[32px] p-12 min-h-[600px] relative overflow-hidden group"
              variants={scrollReveal}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-4 bg-[#D9D9D9] rounded-[32px] blur-2xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                style={{ zIndex: -1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#F008E1]/20 via-transparent to-[#00C2FF]/20"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <motion.div 
                    className="w-12 h-12 bg-[#111111]/10 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8" stroke="#111111" strokeWidth="2"/>
                      <path d="M10 9L14 12L10 15" stroke="#111111" strokeWidth="2"/>
                    </svg>
                  </motion.div>
                  <span className="text-sm text-[#111111]/60 font-medium">01</span>
                </div>
                <h3 className="text-3xl font-serif text-[#111111] mb-4">Built for Speed</h3>
                <p className="text-[#111111]/70 mb-8">
                  Modern architecture with Next.js 15, React Server Components, and edge-ready deployment.
                </p>
                <div className="mt-auto pt-12">
                  <div className="aspect-[4/3] bg-[#111111]/5 rounded-2xl flex items-center justify-center">
                    <motion.div 
                      className="text-[#111111]/20"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <rect x="20" y="30" width="80" height="60" rx="8" stroke="currentColor" strokeWidth="2"/>
                        <line x1="20" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="35" cy="40" r="3" fill="currentColor"/>
                        <circle cx="45" cy="40" r="3" fill="currentColor"/>
                        <circle cx="55" cy="40" r="3" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-[#1a1a1a] rounded-[32px] p-12 min-h-[600px] relative overflow-hidden group"
              variants={scrollReveal}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-4 bg-[#E8FC6B]/10 rounded-[32px] blur-2xl"
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                  scale: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1.5,
                }}
                style={{ zIndex: -1 }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <motion.div 
                    className="w-12 h-12 bg-[#F9F9F9]/10 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#F9F9F9" strokeWidth="2"/>
                    </svg>
                  </motion.div>
                  <span className="text-sm text-[#F9F9F9]/60 font-medium">02</span>
                </div>
                <h3 className="text-3xl font-serif text-[#F9F9F9] mb-4">Enterprise Ready</h3>
                <p className="text-[#A0A0A0] mb-8">
                  Authentication, payments, database, and monitoring. Everything configured and ready to scale.
                </p>
                <div className="mt-auto pt-12">
                  <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.2
                        }
                      }
                    }}
                  >
                    {[
                      'Clerk Authentication',
                      'Stripe Payments',
                      'Supabase Database',
                      'TypeScript & Tailwind'
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center gap-4"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-[#E8FC6B] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        <span className="text-[#F9F9F9]/80 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div 
                    className="mt-8 pt-8 border-t border-[#F9F9F9]/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link href="/setup" className="text-[#E8FC6B] text-sm font-medium hover:underline">
                      View Documentation →
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section 
        className="py-20 border-t border-[#F9F9F9]/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-12 opacity-40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 0.4,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {['VERCEL', 'NEXT.JS', 'STRIPE', 'CLERK', 'SUPABASE', 'TAILWIND'].map((partner, index) => (
              <motion.div
                key={partner}
                className="text-[#A0A0A0] font-medium"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {partner}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </PageTransition>
  );
}