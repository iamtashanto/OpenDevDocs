---
title: "Tailwind CSS Dark Mode"
description: "Implement dark mode using the dark:* variant, CSS custom property theming, and class-based switching."
category: frontend
topic: tailwindcss
type: guide
level: beginner
tags:
  - tailwindcss
  - dark-mode
  - theming
  - accessibility
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Dark Mode

Tailwind provides first-class support for dark mode via the `dark:` variant modifier.

---

## 1. How Dark Mode Works

When you prefix any utility with `dark:`, that styling is applied whenever dark mode is active:

```html
<div class="bg-white text-slate-900 border-slate-200
            dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800
            p-6 rounded-xl border">
  <h2 class="text-xl font-bold">Theme Adaptive Card</h2>
  <p class="text-slate-600 dark:text-slate-400 mt-2">
    This card automatically adjusts its background, text, and border colors.
  </p>
</div>
```

---

## 2. Configuration Strategies

### Strategy A: Class Strategy (Manual Toggle via `.dark`)

To allow users to manually toggle between light, dark, or system themes (e.g. using `next-themes` or Fumadocs theme provider):

```css
/* app/globals.css */
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));
```

Whenever `.dark` is added to `<html>` or `<body>`, all `dark:*` classes take effect.

---

## 3. Best Practice: Semantic CSS Variables for Theming

Instead of repeating `bg-white dark:bg-slate-900` on hundreds of components, define semantic CSS theme tokens:

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --bg-surface: #ffffff;
  --text-primary: #0f172a;
  --border-subtle: #e2e8f0;
}

.dark {
  --bg-surface: #090d16;
  --text-primary: #f8fafc;
  --border-subtle: #1e293b;
}

@theme {
  --color-surface: var(--bg-surface);
  --color-text-main: var(--text-primary);
  --color-border-main: var(--border-subtle);
}
```

Now your components are concise and resilient:

```html
<div class="bg-surface text-text-main border border-border-main p-6 rounded-xl">
  <!-- Automatically switches without needing dark: prefixes everywhere -->
  <h2>Clean Tokenized Card</h2>
</div>
```

---

## Related Topics

- [Colors & Opacity](/docs/tailwindcss/colors)
- [Theme Customization](/docs/tailwindcss/theme-customization)
- [Next.js Theming Integration](/docs/tailwindcss/nextjs-integration)
