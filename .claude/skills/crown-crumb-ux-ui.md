---
name: crown-crumb-ux-ui
description: Activates when working on Crown Crumb JA UI components, design patterns, responsive layouts, or brand consistency. Use for visual design, component creation, and mobile-first layout decisions.
metadata:
  tags: crown-crumb, ux, ui, design, brand, components, responsive, mobile-first
---

## Activation
This skill activates when working on Crown Crumb JA website UI — component design, layout, responsive patterns, or brand system questions.

---

## Brand System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--crown-lime` | `#CCFF00` | Primary accent, CTAs, highlights |
| `--crown-lavender` | `#B8A9E8` | Secondary accent, headings, decorative |
| `--crown-dark` | `#0A0A0A` | Primary background |
| `--crown-dark-card` | `#1A1A1A` | Card backgrounds |
| `--crown-dark-surface` | `#2A2A2A` | Elevated surfaces, borders |
| `--crown-white` | `#FAFAFA` | Primary text |
| `--crown-muted` | `#A0A0A0` | Secondary text |
| `--crown-pink` | `#FF6B9D` | Packaging accent |
| `--crown-gold` | `#FFD700` | Premium/featured accent |

### Typography
- **Headings**: Space Grotesk (`font-heading`) via `next/font/google`
- **Body**: Inter (`font-sans`) via `next/font/google`

### Design Principles
- **Dark-mode-first**: Always use dark backgrounds with lime/lavender accents
- **CTAs**: `bg-crown-lime text-crown-dark rounded-full font-bold`
- **Cards**: `bg-crown-dark-card rounded-2xl border border-crown-dark-surface`
- **Hover states**: `hover:border-crown-lime/30 hover:scale-105` with color transitions
- **Tailwind v4**: Brand tokens defined in `globals.css` via `@theme inline`, NOT in tailwind.config

---

## Component Patterns

### General Rules
- All interactive components must use `'use client'` directive
- Use Next.js `Image` component with `sizes` attribute for responsive images
- Icons come from the `lucide-react` library
- Prefer Server Components unless interactivity is required

### Product Cards
- Layout: image top, category badge, name, description, "View Details →" link
- Use `bg-crown-dark-card` with `rounded-2xl` and border styling
- Hover: scale-105 with border-crown-lime/30 transition

### AnimatedSection Wrapper
- Use for scroll-reveal animations on sections
- Powered by IntersectionObserver at `src/components/ui/AnimatedSection.tsx`
- Wrap section content to enable fade-in-up on scroll

---

## Responsive Mobile-First Design

### Touch Targets
- Minimum **44px** touch targets for all interactive elements

### Carousels
- Use horizontal scroll with CSS `scroll-snap` for mobile
- `scroll-snap-type: x mandatory` on container
- `scroll-snap-align: start` on items

### Grid Layouts
- **Mobile** (default): 1 column
- **Tablet** (`sm:`): 2 columns
- **Desktop** (`lg:`): 3-4 columns

### Containers
- Standard: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Navigation
- Mobile: hamburger menu with slide-down panel
- Desktop: horizontal nav links with "Get a Quote" CTA button
