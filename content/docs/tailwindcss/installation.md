---
title: "Tailwind CSS Installation"
description: "Step-by-step setup for Tailwind CSS v4 in Next.js, Vite, PostCSS, and standalone CLI environments."
category: frontend
topic: tailwindcss
type: guide
level: beginner
tags:
  - tailwindcss
  - installation
  - nextjs
  - vite
  - postcss
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Installation

Tailwind CSS v4 works natively across all modern web bundlers (Next.js, Vite, Webpack) using dedicated PostCSS or Vite plugins.

---

## 1. Next.js App Router Setup

<Steps>
  <Step step={1} title="Install Packages">
    Install Tailwind CSS v4 and the official PostCSS plugin:

    <PackageManagerTabs package="tailwindcss @tailwindcss/postcss postcss" dev />
  </Step>

  <Step step={2} title="Configure PostCSS">
    Create `postcss.config.mjs` in your project root:

    ```javascript
    // postcss.config.mjs
    export default {
      plugins: {
        "@tailwindcss/postcss": {},
      },
    };
    ```
  </Step>

  <Step step={3} title="Import Tailwind in Global CSS">
    Add the single import directive to your root stylesheet (e.g. `app/globals.css`):

    ```css
    /* app/globals.css */
    @import "tailwindcss";
    ```
  </Step>

  <Step step={4} title="Verify in Root Layout">
    Ensure your root layout (`app/layout.tsx`) imports `globals.css`:

    ```tsx
    // app/layout.tsx
    import "./globals.css";

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            {children}
          </body>
        </html>
      );
    }
    ```
  </Step>
</Steps>

---

## 2. Vite (React / Vue) Setup

For Vite projects, use the dedicated `@tailwindcss/vite` plugin for optimal build speed:

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

Configure `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

Import Tailwind in your main entry CSS (`src/index.css`):

```css
@import "tailwindcss";
```

---

## 3. Standalone Tailwind CLI Setup

If you are building static HTML without a framework or JavaScript bundler:

```bash
# 1. Install CLI
pnpm add -D tailwindcss @tailwindcss/cli

# 2. Compile CSS
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch
```

---

## Related Guides

- [Tailwind CSS with Next.js App Router](/docs/tailwindcss/nextjs-integration)
- [Theme Customization with @theme](/docs/tailwindcss/theme-customization)
- [CSS Fundamentals](/docs/css/syntax)
