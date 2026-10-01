# OpenDevDocs — Production Release Checklist

This checklist contains all necessary steps, verification points, and infrastructure settings required to release and operate **OpenDevDocs** at `https://docs.tashanto.com`.

---

## 1. DNS & Domain Configuration

- [ ] **Apex / Subdomain Records**:
  - Target Domain: `docs.tashanto.com`
  - CNAME Record:
    ```text
    Type:  CNAME
    Name:  docs
    Value: cname.vercel-dns.com.
    TTL:   60 (or Auto)
    ```
- [ ] **SSL / TLS Certificate**:
  - Automatic Let's Encrypt / DigiCert certificate issued and renewed via Vercel Edge Network.
  - HTTP-to-HTTPS redirect enabled (301 Permanent).
  - HSTS (HTTP Strict Transport Security) enabled.

---

## 2. Vercel Hosting & Build Settings

- [ ] **Framework Preset**: Next.js
- [ ] **Root Directory**: `./`
- [ ] **Build Command**: `pnpm build` (or `next build`)
- [ ] **Install Command**: `pnpm install`
- [ ] **Node.js Version**: `22.x` (or `20.x LTS`)
- [ ] **Package Manager**: `pnpm@12.3.4` (locked via `packageManager` field in `package.json`)
- [ ] **pnpm Hoisting**: Configured in `.npmrc` (`shamefully-hoist=true`, `auto-install-peers=true`) for Turbopack compatibility.
- [ ] **Output Directory**: `.next` (Standard)

---

## 3. Environment Variables & Runtime Config

- [ ] **Base URL**: `https://docs.tashanto.com` (configured in `siteConfig.url` and `metadataBase`).
- [ ] **Production Node Environment**: `NODE_ENV=production`
- [ ] **No Secret Leaks**: Verified that no API keys, private tokens, or database connection strings are committed in client bundles or public repositories.

---

## 4. GitHub Repository Visibility & Governance

- [ ] **Repository Visibility**: Public (`https://github.com/iamtashanto/OpenDevDocs`).
- [ ] **License**: MIT License (`LICENSE` file in root).
- [ ] **Community Health Files**:
  - `README.md` (Project overview, feature highlights, quickstart)
  - `CONTRIBUTING.md` (10-step step-by-step contribution flow)
  - `CODE_OF_CONDUCT.md` (Contributor Covenant v2.1)
  - `SECURITY.md` (Vulnerability disclosure policy)
- [ ] **Issue & PR Templates**:
  - `.github/ISSUE_TEMPLATE/doc_bug.yml`
  - `.github/ISSUE_TEMPLATE/outdated_doc.yml`
  - `.github/ISSUE_TEMPLATE/new_doc_request.yml`
  - `.github/ISSUE_TEMPLATE/feature_request.yml`
  - `.github/ISSUE_TEMPLATE/bug_report.yml`
  - `.github/PULL_REQUEST_TEMPLATE.md`

---

## 5. GitHub Branch Protection & CI Automation

- [ ] **Branch Protection Rules for `main`**:
  - Require pull request reviews before merging (1+ approving reviews).
  - Require status checks to pass before merging:
    - `Validate Content & Links`
    - `TypeScript Check`
    - `ESLint Check`
    - `Next.js Production Build`
  - Require branches to be up to date before merging.
  - Block force pushes (`git push --force` disabled).
  - Block branch deletions.
- [ ] **GitHub Actions Workflows**:
  - `.github/workflows/ci.yml` running on all pull requests and pushes to `main` with pnpm caching and minimal permissions (`contents: read`).

---

## 6. Build, Validation & Lint Verification

- [ ] **Content Validation**:
  ```bash
  pnpm validate-content
  # Verifies 449+ markdown files, YAML frontmatters, enum schemas, and internal link integrity.
  ```
- [ ] **Type Checking**:
  ```bash
  pnpm typecheck
  # Runs tsc --noEmit with 0 errors.
  ```
- [ ] **ESLint**:
  ```bash
  pnpm lint
  # Runs eslint with 0 errors and 0 warnings.
  ```
- [ ] **Production Static Build**:
  ```bash
  pnpm build
  # Generates 456 static HTML pages via Next.js Turbopack in ~4-7 seconds.
  ```

---

## 7. Search Engine Optimization (SEO) & Indexing

- [ ] **`robots.txt`**:
  - Endpoint: `https://docs.tashanto.com/robots.txt`
  - Rules: Allows `*`, disallows `/api/`, links to `https://docs.tashanto.com/sitemap.xml`.
- [ ] **`sitemap.xml`**:
  - Endpoint: `https://docs.tashanto.com/sitemap.xml`
  - Dynamic generation covers all 7 collections (Docs, Commands, Errors, Recipes, Roadmaps, Packages, Tools).
- [ ] **Canonical URLs**: Verified on all pages via `buildPageMetadata()` in `lib/seo.ts`.
- [ ] **Open Graph & Twitter Cards**: `summary_large_image`, title, description, and metadataBase configured.
- [ ] **Structured Data (Schema.org JSON-LD)**:
  - `WebSite` with SearchAction on Homepage.
  - `TechArticle` on all documentation, command, error, and recipe pages.
  - `BreadcrumbList` on all hierarchical documentation pages.
- [ ] **Google Search Console**:
  - Submit sitemap `https://docs.tashanto.com/sitemap.xml`.
  - Request URL indexing for key landing sections (`/`, `/docs`, `/commands`, `/errors`, `/recipes`, `/roadmaps`, `/packages`, `/tools`).
- [ ] **Bing Webmaster Tools**:
  - Import verified site from Google Search Console or submit `https://docs.tashanto.com/sitemap.xml`.

---

## 8. Search & Interactive Features

- [ ] **Unified Full-Text Search**:
  - Endpoint: `/api/search`
  - Keyboard trigger: `⌘K` (macOS) / `Ctrl+K` (Windows/Linux).
  - Searches across titles, descriptions, and structured text sections for all 7 collections.
- [ ] **Theme Switching**:
  - Light and dark mode support with system preference detection and zero hydration mismatch.
- [ ] **Interactive Copy Buttons**:
  - Single-click copy for code blocks, commands, and terminal output with `aria-live="polite"` feedback for assistive technology.
- [ ] **Dynamic Related Content**:
  - Article footers compute high-affinity related docs, commands, errors, and recipes automatically based on topic and tag matching.
- [ ] **404 Not Found Handling**:
  - Custom `not-found.tsx` offering quick navigation back to home, docs, and direct section cards.

---

## 9. Monitoring & Post-Launch Considerations

- [ ] **Error Monitoring** *(Optional / If enabled)*:
  - Sentry or highlight.io can be connected in `next.config.ts` without blocking static prerendering.
- [ ] **Privacy-Focused Analytics** *(Optional / If enabled)*:
  - Plausible, PostHog, or Cloudflare Web Analytics can be integrated via lightweight asynchronous scripts.
- [ ] **Community Contributions**:
  - Monitor new pull requests, verify CI checks pass, and encourage community contributions.
