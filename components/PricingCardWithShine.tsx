'use client'

import { motion } from 'framer-motion'
import { ShineBorder } from '@/components/magicui/shine-border'
import CheckoutButton from '@/components/CheckoutButton'
import { staggerItem } from '@/lib/animations'

interface PricingCardWithShineProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    priceId: string
    features: string[]
    popular: boolean
  }
  index: number
}

export default function PricingCardWithShine({ product, index }: PricingCardWithShineProps) {
  return (
    <motion.div
      variants={staggerItem}
      custom={index}
      className={`relative bg-[#1a1a1a] rounded-[32px] p-8 overflow-hidden ${
        product.popular ? 'shadow-[0_0_30px_rgba(232,252,107,0.2)]' : ''
      }`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* ShineBorder for all cards, but more prominent for popular */}
      <ShineBorder 
        shineColor={product.popular 
          ? ["#E8FC6B", "#ffaa40", "#E8FC6B"] 
          : ["#F9F9F9", "#A0A0A0", "#F9F9F9"]
        }
        borderWidth={product.popular ? 2 : 1}
        duration={product.popular ? 10 : 14}
      />
      
      {product.popular && (
        <motion.div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <motion.span 
            className="px-4 py-1 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-semibold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            MOST POPULAR
          </motion.span>
        </motion.div>
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
  )
}