import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the most recent checkout session for debugging
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
    });

    const userSession = sessions.data.find(
      session => session.client_reference_id === userId
    );

    if (!userSession) {
      return NextResponse.json({ 
        error: 'No checkout sessions found for your user ID',
        userId,
        recentSessions: sessions.data.map(s => ({
          id: s.id,
          client_reference_id: s.client_reference_id,
          customer: s.customer,
          subscription: s.subscription,
          payment_status: s.payment_status,
          created: new Date(s.created * 1000).toISOString()
        }))
      }, { status: 404 });
    }

    if (!userSession.subscription) {
      return NextResponse.json({ 
        error: 'Session found but no subscription attached',
        session: userSession
      }, { status: 400 });
    }

    // Process the subscription
    const supabase = createAdminClient();
    const subscription = await stripe.subscriptions.retrieve(
      userSession.subscription as string
    );

    const price = await stripe.prices.retrieve(
      subscription.items.data[0].price.id
    );

    let planName = 'Unknown';
    if (price.unit_amount === 999) planName = 'Starter';
    else if (price.unit_amount === 2999) planName = 'Professional';
    else if (price.unit_amount === 9999) planName = 'Enterprise';

    const subscriptionData = {
      user_id: userId,
      stripe_customer_id: userSession.customer as string,
      stripe_subscription_id: subscription.id,
      stripe_price_id: subscription.items.data[0].price.id,
      status: subscription.status,
      plan_name: planName,
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    };

    // Check if subscription already exists
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .single();

    let data, error;
    
    if (existingSubscription) {
      // Update existing subscription
      ({ data, error } = await supabase
        .from('subscriptions')
        .update(subscriptionData)
        .eq('user_id', userId)
        .select()
        .single());
    } else {
      // Insert new subscription
      ({ data, error } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
        .select()
        .single());
    }

    if (error) {
      return NextResponse.json({ 
        error: 'Failed to save subscription',
        details: error
      }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Subscription processed successfully',
      subscription: data
    });

  } catch (error) {
    console.error('Error processing webhook manually:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}