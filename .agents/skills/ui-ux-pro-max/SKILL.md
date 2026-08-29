---
name: ui-ux-pro-max-skill
description: An AI skill that provides design intelligence for building professional UI/UX across multiple platforms.
---

# UI/UX Pro Max Skill

## Core Principles
1. **No "AI Template" Look**: Strive for clean, modern, and highly customized interfaces. Avoid generic Bootstrap/Tailwind blocky looks. Use subtle gradients, deep shadows, and precise spacing.
2. **Glassmorphism & Gradients**: Use `bg-background/80 backdrop-blur-md` and `bg-gradient-to-b` for text and backgrounds to create depth.
3. **Animations**: Integrate micro-interactions (e.g., `animate-appear`, `animate-appear-zoom`) to make the UI feel alive.
4. **Shadcn UI Standard**: All components should be placed in `components/ui/` or `components/blocks/`. Use `lib/utils.ts` for the `cn()` utility.
5. **Tailwind CSS**: Use Tailwind utility classes for all styling. Rely heavily on CSS variables mapped in `tailwind.config.js` for colors (`hsl(var(--background))`).

## Execution Protocol
When asked to build a UI component, follow the shadcn project structure and never inline excessive CSS properties when a Tailwind utility exists. Ensure responsive behavior by default (`sm:`, `md:`, `lg:` prefixes).
