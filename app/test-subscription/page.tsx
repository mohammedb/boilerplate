'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestSubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const createTestSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/create-test-subscription', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data);
      
      if (response.ok) {
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      }
    } catch (error) {
      setResult({ error: 'Failed to create test subscription' });
    }
    setLoading(false);
  };

  const checkDebugInfo = async () => {
    try {
      const response = await fetch('/api/debug/subscription');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to fetch debug info' });
    }
  };

  const processLastCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/process-last-webhook', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data);
      
      if (response.ok) {
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      }
    } catch (error) {
      setResult({ error: 'Failed to process last checkout' });
    }
    setLoading(false);
  };

  const deleteTestSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/delete-test-subscription', {
        method: 'DELETE',
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to delete test subscription' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Test Subscription</h1>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={createTestSubscription}
          disabled={loading}
          className="bg-[#E8FC6B] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#d9eb5c] disabled:opacity-50 mr-4"
        >
          {loading ? 'Creating...' : 'Create Test Subscription'}
        </button>
        
        <button
          onClick={processLastCheckout}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 mr-4"
        >
          {loading ? 'Processing...' : 'Process Last Stripe Checkout'}
        </button>
        
        <button
          onClick={checkDebugInfo}
          className="bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600"
        >
          Check Debug Info
        </button>
        
        <button
          onClick={deleteTestSubscription}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Deleting...' : 'Delete Test Subscription'}
        </button>
      </div>

      {result && (
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Result:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Click "Create Test Subscription" to add a test subscription to your account</li>
          <li>You'll be redirected to your profile page after 2 seconds</li>
          <li>Check if the subscription shows up in your dashboard</li>
          <li>Use "Check Debug Info" to see current subscription status</li>
        </ol>
      </div>
    </div>
  );
}