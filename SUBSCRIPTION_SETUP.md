# Subscription Feature Setup Guide

## Overview
The subscription feature has been implemented to track and display user subscription status in the dashboard. However, you need to run the database migration to create the necessary table.

## Database Migration Required

### Step 1: Run the SQL Migration
You need to execute the SQL commands in `supabase-schema.sql` on your Supabase database. The new subscriptions table has already been added to the schema file.

### Option A: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the entire contents of `supabase-schema.sql`
4. Paste and run the SQL commands
5. The subscriptions table will be created with proper indexes and RLS policies

### Option B: Using Supabase CLI
If you have the Supabase CLI installed:
```bash
supabase db reset --db-url "your-database-url"
# OR
supabase migration up
```

## What Was Added

### 1. Database Schema
- New `subscriptions` table with fields:
  - `user_id` - Links to Clerk user ID
  - `stripe_customer_id` - Stripe customer identifier
  - `stripe_subscription_id` - Stripe subscription identifier
  - `status` - Subscription status (active, canceled, etc.)
  - `plan_name` - Name of the plan (Starter, Professional, Enterprise)
  - `current_period_end` - When the current billing period ends
  - And more...

### 2. Stripe Webhook Handler
- Updated `/app/api/stripe/webhook/route.ts` to handle:
  - `checkout.session.completed` - Creates/updates subscription after payment
  - `customer.subscription.created` - Handles new subscriptions
  - `customer.subscription.updated` - Updates subscription changes
  - `customer.subscription.deleted` - Marks subscriptions as canceled

### 3. UI Components
- **SubscriptionStatus Component** (`/components/SubscriptionStatus.tsx`)
  - Displays current plan and status
  - Shows billing period information
  - Links to change plan or manage subscription
  
- **Profile Dashboard Update** (`/app/profile/page.tsx`)
  - Replaced hardcoded "Active" status with real subscription data
  - Added SubscriptionStatus component to sidebar

- **Subscription Management Page** (`/app/subscription/manage/page.tsx`)
  - Allows users to access Stripe billing portal
  - Manage payment methods, download invoices, cancel subscription

### 4. Stripe Portal API Route
- New `/app/api/stripe/portal-session/route.ts`
- Creates secure session for Stripe billing portal access

## Testing the Feature

1. After running the migration, visit your profile page
2. You should see "You don't have an active subscription" message
3. Click "Choose a Plan" to go to the products page
4. Complete a test purchase using Stripe test card (4242 4242 4242 4242)
5. After successful payment, return to profile to see your active subscription

## Troubleshooting

### "Error fetching subscription" in console
- This means the subscriptions table doesn't exist yet
- Run the SQL migration as described above

### Subscription not showing after payment
- Check that your Stripe webhook endpoint is configured correctly
- Verify the webhook secret in your environment variables
- Check Stripe webhook logs for any errors

### Environment Variables Needed
Make sure you have these configured:
- `STRIPE_WEBHOOK_SECRET` - For webhook signature verification
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - For Stripe checkout
- `STRIPE_SECRET_KEY` - For server-side Stripe operations
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - For admin database operations