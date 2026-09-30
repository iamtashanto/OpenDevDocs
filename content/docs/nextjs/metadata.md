---
title: Next.js Metadata & SEO
description: Configure static and dynamic page metadata, Open Graph tags, Twitter cards, and SEO in the Next.js App Router.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - app-router
  - seo
  - metadata
  - opengraph
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Next.js provides a built-in Metadata API to define your application's `<head>` elements (such as `title`, `description`, `openGraph`, `twitter`, and `robots`) for SEO and social sharing.

Metadata can be configured using either **config-based metadata** (exporting a `metadata` object or `generateMetadata` function) or **file-based metadata** (e.g. `favicon.ico`, `opengraph-image.png`).

---

## Static Metadata

In any `layout.tsx` or `page.tsx`, export a static `metadata` object of type `Metadata`:

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | OpenDevDocs',
    default: 'OpenDevDocs - Developer Documentation',
  },
  description: 'Learn, build, debug, and deploy modern software applications.',
  metadataBase: new URL('https://docs.tashanto.com'),
  openGraph: {
    title: 'OpenDevDocs',
    description: 'Developer knowledge platform.',
    siteName: 'OpenDevDocs',
  },
};
```

---

## Dynamic Metadata with `generateMetadata`

For dynamic routes (e.g. `app/posts/[id]/page.tsx`), use the `generateMetadata` function.

> [!NOTE]
> In modern Next.js (versions 15+ and 16+), route `params` and `searchParams` passed to `generateMetadata` are Promises and must be awaited.

```typescript
// app/posts/[id]/page.tsx
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  // Fetch post details
  const post = { title: `Article #${id}`, summary: `Detailed summary for article ${id}` };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  return <h1>Post: {id}</h1>;
}
```

---

## File-Based Metadata

Next.js supports special file conventions placed directly in the `app/` directory:

| File | Output Tag |
| :--- | :--- |
| `favicon.ico` | `<link rel="icon" ...>` |
| `opengraph-image.(jpg\|png\|tsx)` | `<meta property="og:image" ...>` |
| `twitter-image.(jpg\|png\|tsx)` | `<meta name="twitter:image" ...>` |
| `robots.txt` or `robots.ts` | Robots file generator |
| `sitemap.xml` or `sitemap.ts` | Sitemap generator |

### Dynamic Sitemap (`sitemap.ts`)

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://docs.tashanto.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://docs.tashanto.com/docs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
```

---

## Best Practices

1. **Set `metadataBase` in the Root Layout**: Ensures all relative OpenGraph image URLs are resolved into valid absolute URLs.
2. **Use Title Templates**: Define `title: { template: '%s | SiteName', default: 'SiteName' }` in the root layout so child pages only need to declare `title: 'Page Title'`.
3. **Keep `generateMetadata` Fast**: Avoid expensive redundant queries in `generateMetadata`. Next.js automatically dedupes `fetch` requests between `generateMetadata` and `page.tsx`.
