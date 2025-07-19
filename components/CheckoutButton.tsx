'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@clerk/nextjs';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonProps {
  priceId: string;
  productName: string;
  amount: number;
  className?: string;
}

export default function CheckoutButton({ priceId, productName, amount, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();

  const handleCheckout = async () => {
    if (!isSignedIn) {
      window.location.href = '/sign-in';
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel',
        }),
      });

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        
        if (error) {
          console.error('Stripe checkout error:', error);
          alert('Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={className || "px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"}
    >
      {loading ? 'Processing...' : 'Get Started'}
    </button>
  );
}