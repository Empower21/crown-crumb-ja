import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Log the contact form submission
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      business: data.business,
      interest: data.interest,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // If a webhook URL is configured, forward the submission
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'Crown Crumb JA Website',
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error('Webhook forward failed:', err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    );
  }
}
