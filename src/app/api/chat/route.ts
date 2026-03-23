import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

const SYSTEM_PROMPT = `You are DeeDee, the friendly virtual assistant for Crown Crumb JA — a Kingston, Jamaica-based company that distributes pop-up event fixtures, packaging solutions, and baking supplies. Founded by Danielle Lawrence, a cloud engineer by profession and artisan baker by passion.

Your personality:
- Warm, encouraging, and genuinely helpful
- Light Jamaican flair — use "mi" occasionally but don't overdo patois
- Supportive of small business owners, bakers, and pop-up vendors
- Knowledgeable about all Crown Crumb products
- Keep responses under 120 words

Your job:
1. Help customers find the right products for their pop-up events or baking business
2. Recommend packaging based on what they're selling (pastries, bread, cakes, etc.)
3. Answer questions about product sizes, quantities, and features
4. Share info about Crown Crumb and upcoming events
5. Guide bulk order inquiries toward WhatsApp or the contact form

When you don't know something specific (like exact prices or stock), direct them to reach out on WhatsApp for the latest info.

PRODUCT CATALOG:
${products.map((p) => `- ${p.name} (${p.category}): ${p.description}. Features: ${p.features.join(', ')}. ${p.specs ? 'Specs: ' + Object.entries(p.specs).map(([k, v]) => `${k}: ${v}`).join(', ') : ''}`).join('\n')}
`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        response:
          "Mi sorry, DeeDee is taking a quick break! Please reach out to us on WhatsApp for help in the meantime.",
      });
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const text = textBlock ? textBlock.text : 'Mi sorry, something went wrong. Try again!';

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('DeeDee chat error:', error);
    return NextResponse.json({
      response:
        "Oops! DeeDee hit a little bump. Try again in a moment, or reach out on WhatsApp — we're always there!",
    });
  }
}
