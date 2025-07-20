'use client'

import { BellIcon, Share2Icon, Zap, Shield, Code2 } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { motion } from "framer-motion";

const features = [
  {
    Icon: Shield,
    name: "Enterprise Ready",
    description: "Authentication, payments, database, and monitoring configured.",
    href: "/setup",
    cta: "View docs",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8FC6B]/20 via-transparent to-[#9c40ff]/20">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <path d="M100 20L20 60V140L100 180L180 140V60L100 20Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>
      </div>
    ),
  },
  {
    Icon: Zap,
    name: "Built for Speed",
    description: "Next.js 15, React Server Components, and edge-ready deployment. Modern architecture optimized for performance.",
    href: "/setup",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    shine: {
      color: ["#F008E1", "#00C2FF", "#E8FC6B"],
      borderWidth: 2,
      duration: 10,
    },
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#F008E1]/20 via-transparent to-[#00C2FF]/20">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 80%, #F008E1 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #00C2FF 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, #F008E1 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Real-time Updates",
    description: "Webhooks and real-time subscriptions.",
    href: "/products",
    cta: "Explore",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#E8FC6B] to-transparent"
            style={{ top: `${30 + i * 20}%` }}
            animate={{
              x: [-200, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "100+ Integrations",
    description: "Stripe, Clerk, Supabase, and more pre-configured.",
    href: "/setup",
    cta: "View all",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <motion.div className="relative">
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-[#E8FC6B]/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    ),
  },
  {
    Icon: Code2,
    name: "Developer Experience",
    description: "TypeScript, ESLint, Prettier, and Tailwind CSS. Everything configured for the best DX.",
    href: "/setup",
    cta: "Get started",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    shine: {
      color: ["#E8FC6B", "#9c40ff", "#E8FC6B"],
      borderWidth: 1,
      duration: 14,
    },
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative">
          <motion.div
            className="absolute h-32 w-32 rounded-full bg-[#F008E1]/10"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute h-32 w-32 rounded-full bg-[#00C2FF]/10"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </motion.div>
      </div>
    ),
  },
];

export function HomeBentoGrid() {
  return (
    <section className="pb-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <BentoCard {...feature} />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}