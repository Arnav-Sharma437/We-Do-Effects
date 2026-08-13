import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, company, email, phone, notes, items } = body;

    // Custom Order Processing Logic goes here in the future
    // e.g. Saving to custom DB, sending confirmation email via Resend, connecting to Stripe

    const orderId = `WDE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // For now, we simulate a successful local order
    console.info(`[CUSTOM ECOMMERCE] Received Order ${orderId} for ${email}`);
    
    // Fake processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, orderId });

  } catch (error: any) {
    console.error("[ORDER_ERROR]", error);
    return NextResponse.json(
      { error: 'Failed to process order.' }, 
      { status: 500 }
    );
  }
}
