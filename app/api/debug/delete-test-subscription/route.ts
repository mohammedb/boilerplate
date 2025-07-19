import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Delete test subscriptions (ones with test IDs)
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('user_id', userId)
      .like('stripe_customer_id', 'cus_test_%');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Test subscription deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting test subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}