# Next.js + Clerk + Stripe + Supabase Integration Guide

This project demonstrates a modern web application stack with authentication, payments, database, and storage capabilities.

## Stack Overview

- **Next.js 14** - React framework with App Router
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing
- **Supabase** - Database and file storage
- **TypeScript** - Type safety

## Architecture Decisions

### Authentication (Clerk)

We use Clerk for authentication instead of Supabase Auth to provide:
- Seamless social logins
- Built-in user management UI
- Advanced security features
- Better integration with Next.js middleware

### Important: Clerk API Updates

The latest version of Clerk has significant API changes:

1. **Middleware**: `authMiddleware` → `clerkMiddleware`
   ```typescript
   // Old (deprecated)
   import { authMiddleware } from "@clerk/nextjs"
   
   // New
   import { clerkMiddleware } from "@clerk/nextjs/server"
   ```

2. **Server-side auth**: Import path changed
   ```typescript
   // Old
   import { auth } from "@clerk/nextjs"
   
   // New (for server components/API routes)
   import { auth } from "@clerk/nextjs/server"
   
   // Usage requires await
   const { userId } = await auth()
   ```

### Database & Storage (Supabase)

Supabase provides:
- PostgreSQL database
- Real-time subscriptions (if needed)
- File storage with CDN
- Row Level Security (with caveats - see below)

### Payments (Stripe)

Stripe handles:
- One-time payments
- Subscription management
- Webhook processing
- Payment method storage

## Key Integration Points

### 1. Clerk + Supabase Integration

Since we use Clerk for auth instead of Supabase Auth, we:
- Pass Clerk user IDs to Supabase
- Handle authorization in API routes (not RLS policies)
- Store Clerk user IDs as text in Supabase tables

**Important**: Supabase RLS policies that use `auth.uid()` won't work with Clerk. Authorization is handled at the application level.

### 2. Client vs Server Supabase Usage

To avoid Next.js build errors, we separate client and server Supabase utilities:

```typescript
// Client Components use:
import { uploadAvatar } from '@/lib/supabase/storage-client'

// Server Components/API routes use:
import { uploadAvatar } from '@/lib/supabase/storage-server'
```

### 3. Protected Routes

Routes are protected using Clerk middleware:

```typescript
// middleware.ts
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/api/stripe/checkout-session(.*)',
  '/api/supabase/posts(.*)',
])
```

## Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Database Schema

Run the SQL in `supabase-schema.sql` to set up:
- `posts` table - For blog/content
- `user_profiles` table - For user metadata
- Indexes and triggers for performance

## Common Patterns

### Creating Authenticated API Routes

```typescript
import { auth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Your logic here
}
```

### Uploading Files (Client-side)

```typescript
import { uploadAvatar } from '@/lib/supabase/storage-client'
import { useAuth } from '@clerk/nextjs'

const { userId } = useAuth()
const { publicUrl } = await uploadAvatar(userId, file)
```

### Database Operations (Server-side)

```typescript
import { createPost } from '@/lib/supabase/database'

const post = await createPost({
  title: 'My Post',
  content: 'Content',
  user_id: userId,
  published: true
}, true) // true = server-side
```

## Setup Process

### Initial Setup

1. **Environment Variables**: Copy `.env.local.example` to `.env.local` and fill in your keys
2. **Database Setup**: Run the SQL from `supabase-schema.sql` in your Supabase project
3. **Storage Buckets**: Visit `/setup` in your app and click "Initialize Storage Buckets"

### Storage Buckets

The app uses two storage buckets:
- `avatars` - Public bucket for user profile pictures
- `files` - Private bucket for user files

These are created automatically when you visit `/setup` and initialize storage.

## Troubleshooting

### "authMiddleware is not a function"
Update to use `clerkMiddleware` from `@clerk/nextjs/server`

### "auth is not a function"
1. Import from `@clerk/nextjs/server` for server components
2. Use `await auth()` instead of `auth()`

### "You're importing a component that needs next/headers"
Use `storage-client.ts` functions in client components, not `storage-server.ts`

### User shows as logged out despite being authenticated
Ensure you're awaiting the `auth()` function in server components

### "Error uploading avatar" with empty error object
The storage buckets haven't been created yet. Visit `/setup` and click "Initialize Storage Buckets"

## Security Considerations

1. **API Routes**: Always validate user ownership before allowing updates/deletes
2. **File Uploads**: Validate file types and sizes
3. **Stripe Webhooks**: Verify webhook signatures
4. **Environment Variables**: Never commit real keys to version control

## Next Steps

1. Set up Stripe products/prices in dashboard
2. Configure Stripe webhook endpoint
3. Create Supabase project and run schema SQL
4. Deploy to Vercel/hosting platform
5. Set production environment variables

## Resources

- [Clerk Docs](https://clerk.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)