'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Calendar, CreditCard, Package } from 'lucide-react';
import Link from 'next/link';
import AnimatedCard from '@/components/AnimatedCard';

interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  status: string;
  plan_name: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export function SubscriptionStatus() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) return;

      const supabase = createClient();
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // Handle the case where table doesn't exist or no subscription found
        if (error.code === '42P01') {
          console.error('Subscriptions table does not exist. Please run the SQL migration in supabase-schema.sql');
        } else if (error.code === 'PGRST116') {
          // No subscription found for user - this is expected for new users
          console.log('No subscription found for user');
        } else {
          console.error('Error fetching subscription:', error);
        }
      } else {
        setSubscription(data);
      }
      setLoading(false);
    }

    fetchSubscription();
  }, [user]);

  if (loading) {
    return (
      <AnimatedCard>
        <h3 className="text-2xl font-bold mb-4">Subscription</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </AnimatedCard>
    );
  }

  if (!subscription || subscription.status === 'canceled') {
    return (
      <AnimatedCard>
        <h3 className="text-2xl font-bold mb-4">Subscription</h3>
        <p className="text-gray-400 mb-6">You don&apos;t have an active subscription</p>
        <Link href="/products">
          <button className="w-full bg-[#E8FC6B] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#d9eb5c] transition-colors flex items-center justify-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Choose a Plan
          </button>
        </Link>
      </AnimatedCard>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-500', label: 'Active' },
      past_due: { color: 'bg-red-500', label: 'Past Due' },
      canceled: { color: 'bg-gray-500', label: 'Canceled' },
      incomplete: { color: 'bg-yellow-500', label: 'Incomplete' },
      incomplete_expired: { color: 'bg-gray-500', label: 'Expired' },
      trialing: { color: 'bg-blue-500', label: 'Trial' },
      unpaid: { color: 'bg-red-500', label: 'Unpaid' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: 'bg-gray-500',
      label: status,
    };

    return (
      <span className={`${config.color} text-white text-xs px-2 py-1 rounded-full`}>
        {config.label}
      </span>
    );
  };

  return (
    <AnimatedCard>
      <h3 className="text-2xl font-bold mb-4">Subscription</h3>
      <p className="text-gray-400 mb-6">Manage your subscription and billing</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#E8FC6B]" />
            <span className="font-semibold text-lg">{subscription.plan_name} Plan</span>
          </div>
          {getStatusBadge(subscription.status)}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Current period ends: {formatDate(subscription.current_period_end)}</span>
          </div>
          {subscription.cancel_at_period_end && (
            <p className="text-red-400 text-sm">
              Your subscription will be canceled at the end of the current period
            </p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <Link href="/subscription/manage" className="flex-1">
            <button className="w-full border border-[#F9F9F9]/20 text-white font-semibold py-3 px-6 rounded-full hover:bg-[#F9F9F9]/10 transition-colors">
              Manage Subscription
            </button>
          </Link>
          {subscription.status === 'active' && (
            <Link href="/products" className="flex-1">
              <button className="w-full bg-[#E8FC6B] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#d9eb5c] transition-colors">
                Change Plan
              </button>
            </Link>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}