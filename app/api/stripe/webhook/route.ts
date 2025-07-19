import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  console.log('\n\n=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  
  console.log('Has signature:', !!signature);
  console.log('Body length:', body.length);
  
  // Parse the body to see what event type it is
  try {
    const jsonBody = JSON.parse(body);
    console.log('Event type:', jsonBody.type);
    console.log('Event ID:', jsonBody.id);
  } catch (e) {
    console.log('Could not parse body for logging');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Webhook received: checkout.session.completed');
        console.log('Session ID:', session.id);
        console.log('Customer ID:', session.customer);
        console.log('Client Reference ID (User ID):', session.client_reference_id);
        console.log('Subscription ID:', session.subscription);
        console.log('Payment Status:', session.payment_status);
        
        // Retrieve the subscription details
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          console.log('Subscription Status:', subscription.status);
          
          // Get price details
          const price = await stripe.prices.retrieve(
            subscription.items.data[0].price.id
          );
          console.log('Price Amount:', price.unit_amount);
          
          // Determine plan name based on price
          let planName = 'Unknown';
          if (price.unit_amount === 999) planName = 'Starter';
          else if (price.unit_amount === 2999) planName = 'Professional';
          else if (price.unit_amount === 9999) planName = 'Enterprise';
          console.log('Plan Name:', planName);
          
          // First check if user_profile exists
          const { data: profileCheck } = await supabase
            .from('user_profiles')
            .select('user_id')
            .eq('user_id', session.client_reference_id!)
            .single();
            
          console.log('User profile exists:', !!profileCheck);
          
          // Update or create subscription record
          const subscriptionData = {
            user_id: session.client_reference_id!,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscription.id,
            stripe_price_id: subscription.items.data[0].price.id,
            status: subscription.status,
            plan_name: planName,
            current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          };
          
          console.log('Attempting to upsert subscription data:', subscriptionData);
          
          // First try to update existing subscription
          const { data: existingSubscription } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('user_id', session.client_reference_id!)
            .single();

          let data, error;
          
          if (existingSubscription) {
            // Update existing subscription
            ({ data, error } = await supabase
              .from('subscriptions')
              .update(subscriptionData)
              .eq('user_id', session.client_reference_id!)
              .select());
          } else {
            // Insert new subscription
            ({ data, error } = await supabase
              .from('subscriptions')
              .insert(subscriptionData)
              .select());
          }
            
          if (error) {
            console.error('Error updating subscription:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
          } else {
            console.log('Subscription created/updated successfully:', data);
            console.log('Subscription saved for user:', session.client_reference_id);
          }
        } else {
          console.log('No subscription ID in session - this might be a one-time payment');
        }
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        
        // Get customer details
        const customer = await stripe.customers.retrieve(
          subscription.customer as string
        ) as Stripe.Customer;
        
        // Get price details
        const subPrice = await stripe.prices.retrieve(
          subscription.items.data[0].price.id
        );
        
        // Determine plan name
        let subPlanName = 'Unknown';
        if (subPrice.unit_amount === 999) subPlanName = 'Starter';
        else if (subPrice.unit_amount === 2999) subPlanName = 'Professional';
        else if (subPrice.unit_amount === 9999) subPlanName = 'Enterprise';
        
        // Find user by email
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('user_id')
          .eq('user_id', customer.metadata.userId || '')
          .single();
          
        if (profile) {
          // Check if subscription already exists
          const { data: existingSub } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('stripe_subscription_id', subscription.id)
            .single();

          let error;
          if (existingSub) {
            // Update existing
            ({ error } = await supabase
              .from('subscriptions')
              .update({
                user_id: profile.user_id,
                stripe_customer_id: customer.id,
                stripe_price_id: subscription.items.data[0].price.id,
                status: subscription.status,
                plan_name: subPlanName,
                current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                cancel_at_period_end: subscription.cancel_at_period_end,
              })
              .eq('stripe_subscription_id', subscription.id));
          } else {
            // Insert new
            ({ error } = await supabase
              .from('subscriptions')
              .insert({
                user_id: profile.user_id,
                stripe_customer_id: customer.id,
                stripe_subscription_id: subscription.id,
                stripe_price_id: subscription.items.data[0].price.id,
                status: subscription.status,
                plan_name: subPlanName,
                current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
                current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                cancel_at_period_end: subscription.cancel_at_period_end,
              }));
          }
            
          if (error) {
            console.error('Error updating subscription:', error);
          }
        }
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        
        // Update subscription status
        const { error: deleteError } = await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', deletedSubscription.id);
          
        if (deleteError) {
          console.error('Error canceling subscription:', deleteError);
        }
        break;
        
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent was successful:', paymentIntent.id);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}