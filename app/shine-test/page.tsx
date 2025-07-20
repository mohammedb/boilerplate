'use client'

import { ShineBorder } from '@/components/magicui/shine-border'

export default function ShineTest() {
  return (
    <div className="min-h-screen p-20">
      <h1 className="text-4xl font-bold text-center mb-10">ShineBorder Animation Test</h1>
      
      {/* Test 1: Basic shine */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative bg-[#1a1a1a] rounded-2xl p-8 overflow-hidden">
          <ShineBorder 
            shineColor={["#E8FC6B", "#9c40ff", "#00D9FF"]}
            borderWidth={2}
            duration={3}
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Test Card 1</h2>
            <p>Duration: 3s, Border: 2px</p>
            <p className="text-sm text-gray-400 mt-2">Multi-color gradient</p>
          </div>
        </div>
      </div>

      {/* Test 2: Single color shine */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative bg-[#1a1a1a] rounded-2xl p-8 overflow-hidden">
          <ShineBorder 
            shineColor="#E8FC6B"
            borderWidth={3}
            duration={2}
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Test Card 2</h2>
            <p>Duration: 2s, Border: 3px</p>
            <p className="text-sm text-gray-400 mt-2">Single color</p>
          </div>
        </div>
      </div>

      {/* Test 3: Manual CSS animation */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative bg-[#1a1a1a] rounded-2xl p-8 overflow-hidden">
          <div 
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              padding: '2px',
              backgroundImage: 'radial-gradient(transparent, transparent, #E8FC6B, transparent, transparent)',
              backgroundSize: '300% 300%',
              backgroundPosition: '0% 0%',
              animation: 'shine 4s linear infinite',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Test Card 3</h2>
            <p>Manual CSS animation</p>
            <p className="text-sm text-gray-400 mt-2">Direct style application</p>
          </div>
        </div>
      </div>

      {/* Test 4: Debug info */}
      <div className="max-w-md mx-auto text-center">
        <p className="text-sm text-gray-400">
          If you don't see animations, check:
        </p>
        <ul className="text-sm text-gray-400 mt-2">
          <li>• Browser dev tools for CSS animations</li>
          <li>• Reduced motion settings in your OS</li>
          <li>• Console for any errors</li>
        </ul>
      </div>
    </div>
  )
}