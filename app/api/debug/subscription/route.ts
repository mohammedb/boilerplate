import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Check if user profile exists
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get subscription data
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get all subscriptions (for debugging)
    const { data: allSubscriptions, error: allSubError } = await supabase
      .from('subscriptions')
      .select('user_id, status, plan_name, created_at')
      .limit(10);

    return NextResponse.json({
      currentUserId: userId,
      userProfile: {
        exists: !!profile,
        data: profile,
        error: profileError
      },
      subscription: {
        exists: !!subscription,
        data: subscription,
        error: subError
      },
      recentSubscriptions: {
        count: allSubscriptions?.length || 0,
        data: allSubscriptions,
        error: allSubError
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}