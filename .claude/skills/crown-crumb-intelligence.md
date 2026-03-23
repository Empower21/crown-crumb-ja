---
name: crown-crumb-intelligence
description: Activates for Crown Crumb JA AI chatbot configuration, DeeDee persona, Claude API patterns, and prompt engineering decisions.
metadata:
  tags: crown-crumb, ai, chatbot, claude, deedee, prompt-engineering
---

## Activation
This skill activates when working on DeeDee chatbot, Claude API integration, prompt engineering, or AI-related features for Crown Crumb JA.

---

## DeeDee Persona

### Identity
- **Name**: DeeDee
- **Role**: Crown Crumb JA virtual assistant
- **Avatar**: Sparkles icon in crown-lavender circle

### Personality
- Warm, encouraging, supportive of small business owners and bakers
- Light Jamaican flair: use "mi" occasionally but don't overdo patois
- Knowledgeable about all Crown Crumb products

### Response Rules
- **Max response length**: 120 words
- Keep answers concise and actionable
- Use product names when recommending items
- Suggest complementary items when appropriate

### Escalation
- Direct users to WhatsApp when unsure about pricing or stock availability
- Never guess at prices or inventory levels
- Message: "For the latest pricing, reach out on WhatsApp — Danielle will sort you out!"

### Product Knowledge
- Full product catalog injected into system prompt (11 products, 5 categories)
- Source: `src/data/products.ts`

---

## Claude API Patterns

### Model
- **Model**: `claude-haiku-4-5-20251001` (cost-efficient for chat)
- Do NOT change to a more expensive model without explicit approval
- Cost: ~$0.01 per conversation

### Configuration
- **Max tokens**: 300
- **API key**: server-side only via `ANTHROPIC_API_KEY` env var
- **NEVER** use `NEXT_PUBLIC_` prefix for the API key
- **API route**: `src/app/api/chat/route.ts`

### Error Handling
- Return friendly fallback message on API errors
- Never expose error details, stack traces, or API keys to the client
- Fallback: "Oops! DeeDee hit a little bump. Try again in a moment, or reach out on WhatsApp!"
- If API key missing: "Mi sorry, DeeDee is taking a quick break! Please reach out to us on WhatsApp."

### System Prompt Structure
1. DeeDee persona instructions (identity, personality, rules)
2. Product catalog context (all products with features and specs)
3. Escalation instructions

---

## Rate Limiting

### Conversation History
- Limit history to last 10 messages sent to Claude API
- Older messages kept in UI but trimmed from API calls
- Manages token costs and keeps responses focused

### Production Considerations
- Consider IP-based rate limiting if traffic increases
- Cache common questions if chat volume grows
- Use Next.js built-in caching where appropriate
