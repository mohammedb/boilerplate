import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  
  console.log('=== WEBHOOK TEST RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Has Stripe Signature:', !!signature);
  console.log('Body length:', body.length);
  console.log('First 200 chars of body:', body.substring(0, 200));
  console.log('===========================');
  
  return NextResponse.json({ 
    received: true,
    timestamp: new Date().toISOString(),
    hasSignature: !!signature
  });
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    message: 'Webhook test endpoint is working',
    timestamp: new Date().toISOString()
  });
}