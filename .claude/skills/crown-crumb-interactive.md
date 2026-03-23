---
name: crown-crumb-interactive
description: Activates for Crown Crumb JA animations, transitions, DeeDee chatbot widget behavior, WhatsApp integration, and user interaction patterns.
metadata:
  tags: crown-crumb, animation, interaction, chatbot, whatsapp, widget
---

## Activation
This skill activates when working on Crown Crumb JA interactive features — animations, chat widget, WhatsApp links, or user interactions.

---

## Animation System

### Scroll Reveal
- Use `AnimatedSection` component at `src/components/ui/AnimatedSection.tsx`
- IntersectionObserver with threshold 0.1, rootMargin "0px 0px -40px 0px"
- Elements animate in when they enter the viewport

### CSS Keyframes (defined in `globals.css`)
| Animation | Effect |
|-----------|--------|
| `fadeInUp` | Fade in while sliding up (24px) |
| `slideInRight` | Slide in from right (24px) |
| `pulseGlow` | Pulsing lime glow effect |
| `bounceIn` | Bounce entrance (0.3 → 1.05 → 0.9 → 1.0) |
| `float` | Subtle floating motion (8px) |

### Transition Durations
- **Micro** (hover, focus): 150ms
- **Macro** (panel open/close): 300ms
- **Transforms** (scale, translate): 500ms

### Stagger Pattern
- Use `index * 100ms` delay pattern for staggered list animations
- Apply via `delay` prop on `AnimatedSection`

### Accessibility
- Always support `prefers-reduced-motion: reduce` — animations disabled

---

## DeeDee Chat Widget Behavior

### Layout
- **Position**: fixed bottom-right, `z-50`
- **Toggle button**: 56px (w-14 h-14) circle, `bg-crown-lavender`, Sparkles icon
- **Chat panel**: `max-w-[380px]`, `max-h-[560px]`, `rounded-2xl`
- **Mobile**: `w-[90vw]`, `h-[70vh]`

### Behavior
- Quick replies shown on first open (before any user messages)
- Typing indicator: 3 bouncing dots in `crown-lavender`
- Reset button clears all messages and returns to initial state
- Auto-scroll to bottom on new messages
- State: React state + sessionStorage (no cross-session persistence)

### Key File
- Widget: `src/components/chat/DeeDeeWidget.tsx`
- API: `src/app/api/chat/route.ts`

---

## WhatsApp Integration

### Configuration
- Number stored in `NEXT_PUBLIC_WHATSAPP_NUMBER` env var (18763388183)
- **CRITICAL: NEVER display the phone number as visible text on the site**

### Link Generation
- Use `whatsappLink()` utility from `@/lib/utils` for ALL WhatsApp links
- Pre-fill messages with product name on product detail pages
- Example: `whatsappLink("Hi, I'm interested in the 10x10 Pop-Up Tent")`

### Floating Button
- **Position**: fixed bottom-left, `z-50`
- **Color**: `#25D366` (WhatsApp green) background
- **Icon**: MessageCircle from lucide-react, filled white
- Always visible on all pages
