---
title: Next.js Image Optimization
description: Optimize images, prevent layout shifts, and handle responsive loading using the Next.js Image component (next/image).
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - images
  - performance
  - core-web-vitals
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

The Next.js Image component (`next/image`) extends standard HTML `<img>` elements with automatic image optimization:

- **Format Optimization**: Serves modern formats (WebP, AVIF) when supported by the client browser.
- **Visual Stability**: Automatically reserves space to eliminate Cumulative Layout Shift (CLS).
- **Faster Page Loads**: Images are lazy-loaded by default as they enter the viewport.
- **Asset Flexibility**: On-demand image resizing for remote and local images.

---

## Local Images

For local images, import the file directly. Next.js automatically infers the `width`, `height`, and generates blur placeholders:

```tsx
// app/page.tsx
import Image from 'next/image';
import heroImage from '@/public/hero.png';

export default function Home() {
  return (
    <Image
      src={heroImage}
      alt="Hero banner"
      placeholder="blur"
      priority // Use priority for above-the-fold hero images (LCP)
    />
  );
}
```

---

## Remote Images

For remote images, specify `src` as a URL string along with explicit `width` and `height`:

```tsx
import Image from 'next/image';

export function UserAvatar({ avatarUrl }: { avatarUrl: string }) {
  return (
    <Image
      src={avatarUrl}
      alt="User Avatar"
      width={64}
      height={64}
      className="rounded-full"
    />
  );
}
```

### Configuring Remote Domains

To protect against malicious image origins, configure `remotePatterns` in `next.config.ts`:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
```

---

## Responsive Images with `fill` and `sizes`

When the image dimensions are determined by parent CSS containers, use `fill` alongside `sizes`:

```tsx
<div className="relative w-full h-64 overflow-hidden rounded-lg">
  <Image
    src="/nature.jpg"
    alt="Nature scene"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

---

## Best Practices

1. **Add `priority` to LCP Images**: Hero banners and above-the-fold images should have `priority` to preload them and speed up Largest Contentful Paint.
2. **Always Provide `sizes` When Using `fill`**: Without `sizes`, the browser defaults to `100vw`, loading unnecessarily large assets on small screens.
3. **Keep `alt` Descriptive**: Descriptive alt text ensures accessibility and improves SEO.
