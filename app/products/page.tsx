'use client'

import CheckoutButton from '@/components/CheckoutButton';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { ShineBorder } from '@/components/magicui/shine-border';

// Example products - in a real app, these would come from a database
const products = [
  {
    id: 1,
    name: 'Starter',
    description: 'Perfect for side projects',
    price: 999, // $9.99 in cents
    priceId: 'price_1Rma4aHBM6bRAUjKoBtx5rfQ',
    features: ['1 user', '10 projects', 'Community support', 'Basic analytics'],
    popular: false,
  },
  {
    id: 2,
    name: 'Professional',
    description: 'For growing businesses',
    price: 2999, // $29.99 in cents
    priceId: 'price_1Rma4bHBM6bRAUjKxs7QAQRL',
    features: ['5 users', 'Unlimited projects', 'Priority support', 'Advanced analytics', 'API access'],
    popular: true,
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'Custom solutions at scale',
    price: 9999, // $99.99 in cents
    priceId: 'price_1Rma4bHBM6bRAUjKWYbKLNyZ',
    features: ['Unlimited users', 'Unlimited projects', '24/7 dedicated support', 'Custom integrations', 'SLA guarantee', 'On-premise option'],
    popular: false,
  },
];

export default function ProductsPage() {
  const { userId } = useAuth();

  return (
    <PageTransition className="pb-20 px-6">
      <motion.div 
        className="max-w-[1200px] mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={staggerItem}>
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-medium mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 3V6L8 8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Limited Time Offer
          </motion.span>
          <motion.h1 
            className="text-5xl md:text-6xl font-serif text-[#F9F9F9] mb-4"
            variants={fadeInUp}
          >Simple, Transparent Pricing</motion.h1>
          <motion.p 
            className="text-xl text-[#A0A0A0] max-w-2xl mx-auto"
            variants={staggerItem}
          >
            Choose the perfect plan for your needs. Always flexible to scale.
          </motion.p>
        </motion.div>
      
        {!userId && (
          <motion.div 
            className="bg-[#1a1a1a] border border-[#E8FC6B]/20 rounded-2xl p-6 mb-12 text-center max-w-2xl mx-auto"
            variants={staggerItem}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[#E8FC6B]">
              Sign in to unlock special pricing and start your free trial
            </p>
          </motion.div>
        )}
      
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={staggerItem}
              custom={index}
              className="relative"
            >
              {product.popular && (
                <motion.div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.span 
                    className="px-4 py-1 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-semibold whitespace-nowrap"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    MOST POPULAR
                  </motion.span>
                </motion.div>
              )}
              <motion.div
                className={`relative bg-[#1a1a1a] rounded-[32px] p-8 overflow-hidden ${
                  product.popular 
                    ? 'shadow-[0_0_30px_rgba(232,252,107,0.2)]' 
                    : 'border border-[#F9F9F9]/10'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {product.popular && (
                  <ShineBorder 
                    shineColor={["#E8FC6B", "#ffaa40", "#E8FC6B"]}
                    borderWidth={2}
                    duration={10}
                  />
                )}
                <div className="relative z-10">
                
                <div className="mb-8">
                <h2 className="text-2xl font-serif text-[#F9F9F9] mb-2">{product.name}</h2>
                <p className="text-[#A0A0A0] text-sm">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline">
                  <motion.span 
                    className="text-4xl font-bold text-[#F9F9F9]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    ${(product.price / 100).toFixed(0)}
                  </motion.span>
                  <span className="text-[#A0A0A0] ml-2">/month</span>
                </div>
              </div>
              
              <motion.ul 
                className="mb-8 space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.3 + index * 0.1
                    }
                  }
                }}
              >
                {product.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    className="flex items-start"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E8FC6B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <motion.div 
                        className="w-2 h-2 bg-[#E8FC6B] rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: featureIndex * 0.2 }}
                      />
                    </div>
                    <span className="ml-3 text-[#F9F9F9]/80 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              <CheckoutButton
                priceId={product.priceId}
                productName={product.name}
                amount={product.price}
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  product.popular
                    ? 'bg-[#E8FC6B] text-[#111111] hover:bg-[#E8FC6B]/90 shadow-[0_0_20px_rgba(232,252,107,0.3)]'
                    : 'bg-transparent border border-[#F9F9F9]/20 text-[#F9F9F9] hover:border-[#E8FC6B] hover:text-[#E8FC6B]'
                }`}
              />
              </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[#A0A0A0] mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <Link href="/setup" className="text-[#E8FC6B] hover:underline text-sm">
            View full feature comparison →
          </Link>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}