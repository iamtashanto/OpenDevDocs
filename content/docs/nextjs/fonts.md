---
title: Next.js Font Optimization
description: Optimize Google Fonts and local font files with zero layout shift using next/font in Next.js.
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - fonts
  - performance
  - css
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

`next/font` automatically optimizes your fonts (including custom and Google Fonts) by downloading font files at build time and hosting them alongside your static assets. This eliminates external network requests to Google servers, improves privacy, and ensures zero layout shift (CLS).

---

## Google Fonts

Import any Google Font directly from `next/font/google`:

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Configure Variable Font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Configure Monospace Font
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

---

## Local Fonts

For custom proprietary or offline font files, use `next/font/local`:

```typescript
// app/layout.tsx
import localFont from 'next/font/local';

const customSans = localFont({
  src: [
    {
      path: '../public/fonts/CustomFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CustomFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={customSans.variable}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Integrating with Tailwind CSS

Map the CSS variable defined by `next/font` in your Tailwind configuration or `globals.css`:

```css
/* app/globals.css */
@theme {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-mono), monospace;
}
```

---

## Best Practices

1. **Prefer Variable Fonts**: Variable fonts combine multiple weights and styles into a single, compact file download.
2. **Specify Subsets**: Always specify subsets (e.g. `subsets: ['latin']`) to minimize the font file size.
3. **Use CSS Variables on `<html>`**: Attaching font variables to the root `<html>` tag makes fonts globally accessible to all components and CSS utilities.
