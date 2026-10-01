---
title: "Tailwind CSS Theme Customization"
description: "Customize design tokens in Tailwind CSS v4 using the native @theme directive: custom colors, fonts, breakpoints, shadows, and animations."
category: frontend
topic: tailwindcss
type: guide
level: intermediate
tags:
  - tailwindcss
  - theme
  - design-system
  - customization
  - css-variables
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Theme Customization

Tailwind CSS v4 replaces JavaScript configuration files with the native `@theme` CSS directive.

---

## 1. The `@theme` Directive

Declare design tokens directly in your global stylesheet:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Custom Font Families */
  --font-sans: "Inter", -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Custom Brand Color Palette */
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;

  /* Custom Spacing Step */
  --spacing-18: 4.5rem;

  /* Custom Border Radius */
  --radius-4xl: 2rem;

  /* Custom Box Shadow */
  --shadow-glow: 0 0 25px -5px rgba(37, 99, 235, 0.5);
}
```

---

## 2. Using Custom Theme Tokens in Markup

Every token defined in `@theme` is immediately available as utility classes:

```html
<!-- Uses --font-sans, --color-brand-600, --shadow-glow, --radius-4xl -->
<button class="font-sans bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-4xl shadow-glow transition-all">
  Primary Action
</button>
```

---

## 3. Extending Keyframe Animations

You can declare custom CSS keyframes and animations within `@theme`:

```css
@theme {
  --animate-shimmer: shimmer 2s infinite linear;

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
}
```

Usage in markup:
```html
<div class="animate-shimmer w-full h-4 bg-slate-200" />
```

---

## Related Topics

- [Colors & Opacity](/docs/tailwindcss/colors)
- [Typography System](/docs/tailwindcss/typography)
- [Reusable React Patterns](/docs/tailwindcss/reusable-patterns)
