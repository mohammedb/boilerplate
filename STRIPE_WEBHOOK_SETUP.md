# Stripe Webhook Setup for Local Development

## Quick Setup

1. **Install Stripe CLI** (if not already installed):
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows (using scoop)
   scoop install stripe

   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe CLI**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copy the webhook signing secret** that appears:
   ```
   > Ready! Your webhook signing secret is whsec_1234567890abcdef (^C to quit)
   ```

5. **Update your `.env.local`** with the signing secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef
   ```

6. **Restart your Next.js dev server** to pick up the new environment variable

## Testing

1. Keep the `stripe listen` command running in a terminal
2. Make a test purchase on your site
3. You should see webhook events in the Stripe CLI terminal
4. Check your server logs for "=== STRIPE WEBHOOK RECEIVED ==="

## Common Issues

- **No webhook events**: Make sure Stripe CLI is running and connected
- **Signature verification failed**: The webhook secret in `.env.local` doesn't match
- **404 errors**: Check the webhook URL path is correct

## For Production

In production, you need to:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events: 
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the signing secret and add to your production environment variables