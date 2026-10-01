---
title: "The Build Process & Production Artifacts"
description: Complete guide to production builds, bundling, minification, tree-shaking, code-splitting, source maps, and immutable build artifacts.
category: devops
topic: deployment
type: concept
level: intermediate
tags:
  - deployment
  - build
  - bundling
  - optimization
platforms:
  - linux
  - macos
  - windows
tested:
  nextjs: "16.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

The **Build Process** transforms human-readable development source code (TypeScript, JSX, SCSS, modular imports) into optimized, minified, and secure production assets ready for deployment.

---

## Build Pipeline Stages

```
┌─────────────────────────────────────────────────────────────┐
│ Modern Frontend/Fullstack Build Pipeline                    │
├───────────────┬───────────────┬──────────────┬──────────────┤
│ 1. Transpile  │ 2. Tree-Shake │ 3. Minify    │ 4. Code Split│
│ TypeScript to │ Remove unused │ Strip spaces │ Chunk into   │
│ JavaScript    │ exported code │ & mangle vars│ route bundles│
└───────────────┴───────────────┴──────────────┴──────────────┘
```

### 1. Transpilation & Compilation
Compilers (`tsc`, `swc`, `esbuild`, `babel`) transform modern TypeScript / JSX syntax into browser-compatible ECMAScript.

### 2. Tree-Shaking (Dead Code Elimination)
Bundlers (Turbopack, Rollup, Webpack) analyze static ES module imports (`import { a } from 'lib'`). If `lib` exports 500 functions but your app only uses `a`, the other 499 functions are completely omitted from the production bundle.

### 3. Minification & Variable Mangling
Minifiers (`terser`, `esbuild`) remove all unnecessary whitespace, strip comments, and rename local variables (`const calculateTotalPrice` $\rightarrow$ `const c`), shrinking file sizes by 60–80%.

### 4. Code Splitting & Content Hashing
The application bundle is divided into smaller chunks based on routes. Each asset is saved with an immutable cryptographic hash in its filename:
```
/static/chunks/app-layout-8f3a9b1c.js
/static/chunks/blog-page-4d2e1f0a.js
```
Because the filename changes whenever the content changes, web servers and CDNs can safely cache these files indefinitely (`Cache-Control: public, max-age=31536000, immutable`).

---

## Source Maps in Production

**Source Maps** (`.js.map`) map compiled, minified production code back to original TypeScript lines.

> [!CAUTION]
> Upload source maps directly to error monitoring services (e.g. Sentry, Datadog) using CI secrets, but **do not publish public `.map` files to your production web server**. Public source maps expose your entire private TypeScript source code to any visitor.

---

## Related Guides

- [Docker Multi-Stage Builds](/docs/docker/multi-stage-builds)
- [Next.js Standalone Output](/recipes/docker/dockerize-nextjs)
- [Production Best Practices](/docs/deployment/dev-vs-prod)
