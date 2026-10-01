---
title: "Deploying Static Frontends & SPAs"
description: Complete guide to deploying static HTML/CSS/JS and Vite/React SPAs to Cloudflare Pages, Netlify, and AWS S3 + CloudFront with SPA rewrite rules.
category: devops
topic: deployment
type: guide
level: beginner
tags:
  - static
  - frontend
  - cloudflare
  - netlify
  - s3
  - spa
platforms:
  - cloud
tested:
  vite: "5.x"
lastVerified: "2026-09-30"
---

Static frontends (plain HTML/CSS/JS, Vite + React, Vue, Svelte) compile to pure static files (`index.html`, `.js`, `.css`, images) and are best deployed to globally distributed Content Delivery Networks (CDNs).

---

## 1. Cloudflare Pages (Free, Unlimited Bandwidth)

1. Go to **Cloudflare Dashboard** $\rightarrow$ **Workers & Pages** $\rightarrow$ **Create Application** $\rightarrow$ **Pages**.
2. Connect your Git repository.
3. Configure build settings:
   - **Framework Preset**: `Vite` (or `Create React App`)
   - **Build Command**: `pnpm build`
   - **Build Output Directory**: `dist` (or `build`)
4. Click **Save and Deploy**.

---

## 2. SPA Client-Side Routing Fallback Rules

Single Page Applications (SPAs) manage routing in the browser. When a user navigates directly to `https://example.com/dashboard`, the web server must return `index.html` instead of a 404 error.

### Netlify (`_redirects` file in `./public/`):
```text
/*    /index.html   200
```

### Cloudflare Pages (`_routes.json` or `404.html`):
For standard SPAs, symlink `index.html` to `404.html` or configure SPA mode in dashboard.

### Nginx (Self-Hosted):
```nginx
location / {
  root /var/www/my-spa/dist;
  try_files $uri $uri/ /index.html;
}
```

---

## 3. AWS S3 + CloudFront CDN Architecture

```
Client Browser ──► AWS CloudFront (Global CDN Cache + SSL) ──► S3 Bucket (Private Static Origin)
```

1. Create a private S3 bucket and upload your `./dist` build files.
2. Create a CloudFront Distribution pointing to the S3 bucket via Origin Access Control (OAC).
3. Configure **Custom Error Response**: Map HTTP Error `403` and `404` to `/index.html` with HTTP response code `200`.

---

## Related Guides

- [Deploying Next.js to Vercel](/docs/deployment/deploy-nextjs-vercel)
- [Domains & DNS Records](/docs/deployment/domains-and-dns)
- [Build Process & Optimization](/docs/deployment/build-process)
