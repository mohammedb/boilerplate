# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.2 full-stack SaaS boilerplate with:
- **Authentication**: Clerk (NOT Supabase Auth)
- **Payments**: Stripe subscriptions
- **Database/Storage**: Supabase (PostgreSQL + file storage)
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: Shadcn/ui + MagicUI animations

## Essential Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# No test commands configured yet
```

## Architecture & Key Patterns

### 1. Authentication Flow
- Uses Clerk for all authentication (social logins, user management)
- Protected routes configured in `middleware.ts` using `clerkMiddleware`
- API routes must use `await auth()` from `@clerk/nextjs/server`

### 2. Supabase Integration Patterns
**CRITICAL**: Since we use Clerk (not Supabase Auth), traditional RLS policies using `auth.uid()` won't work. Authorization is handled at the application level.

**Client vs Server Utilities**:
```typescript
// Client Components - use these imports:
import { uploadAvatar } from '@/lib/supabase/storage-client'
import { createPost } from '@/lib/supabase/database' // with isServer=false

// Server Components/API Routes - use these imports:
import { uploadAvatar } from '@/lib/supabase/storage-server'
import { createPost } from '@/lib/supabase/database' // with isServer=true
```

### 3. API Route Pattern
```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Your logic here
}
```

### 4. Stripe Integration
- Webhook endpoint: `/api/stripe/webhook`
- Checkout: `/api/stripe/checkout-session`
- Customer portal: `/api/stripe/customer-portal`
- Always verify webhook signatures

## Key Files & Directories

- `/app/api/` - All API routes (profile, stripe, supabase endpoints)
- `/lib/supabase/` - Database and storage utilities (separate client/server versions)
- `/lib/stripe/` - Stripe configuration and utilities
- `/components/ui/` - Shadcn/ui components
- `/components/magicui/` - Animated components (shine borders, particles, etc.)
- `/scripts/create-stripe-prices.js` - Utility to create Stripe products/prices

## Environment Variables Required

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Database Schema

Run `supabase-schema.sql` to create:
- `posts` table with user_id, title, content, published
- `user_profiles` table with user metadata
- Required indexes and updated_at triggers

## Common Issues & Solutions

1. **"authMiddleware is not a function"**: Use `clerkMiddleware` from `@clerk/nextjs/server`
2. **"auth is not a function"**: Remember to `await auth()` in server components
3. **"You're importing a component that needs next/headers"**: Use client utilities in client components
4. **Storage upload fails**: Initialize buckets by visiting `/setup` route

## Development Workflow

1. Always check if a component/utility already exists before creating new ones
2. Follow existing patterns for client/server separation
3. Use TypeScript strict mode - all new code must be properly typed
4. API routes must validate user ownership before mutations
5. Never commit real API keys or secrets