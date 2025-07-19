import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get recent checkout sessions
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
    });

    // Get recent subscriptions
    const subscriptions = await stripe.subscriptions.list({
      limit: 10,
    });

    const sessionData = sessions.data.map(s => ({
      id: s.id,
      client_reference_id: s.client_reference_id,
      customer: s.customer,
      customer_email: s.customer_details?.email,
      subscription: s.subscription,
      payment_status: s.payment_status,
      status: s.status,
      mode: s.mode,
      created: new Date(s.created * 1000).toISOString(),
      metadata: s.metadata,
    }));

    const userSessions = sessionData.filter(s => s.client_reference_id === userId);

    return NextResponse.json({
      currentUserId: userId,
      userSessions: {
        count: userSessions.length,
        sessions: userSessions
      },
      allRecentSessions: {
        count: sessionData.length,
        sessions: sessionData.slice(0, 5) // Show first 5
      },
      recentSubscriptions: {
        count: subscriptions.data.length,
        subscriptions: subscriptions.data.slice(0, 5).map(s => ({
          id: s.id,
          customer: s.customer,
          status: s.status,
          created: new Date(s.created * 1000).toISOString(),
          items: s.items.data.map(i => ({
            price_id: i.price.id,
            product: i.price.product
          }))
        }))
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}