'use client'

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, hoverScale, glowPulse, scrollReveal } from "@/lib/animations";
import { ShineBorder } from "@/components/magicui/shine-border";
import { HomeBentoGrid } from "@/components/HomeBentoGrid";

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

      <HomeBentoGrid />

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