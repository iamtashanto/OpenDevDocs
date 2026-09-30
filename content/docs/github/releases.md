---
title: "GitHub Releases & Binary Distribution"
description: "Publishing project releases on GitHub: linking Git tags, generating automated release notes, attaching binary assets, and pre-releases."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - releases
  - tags
  - semver
  - distribution
platforms:
  - all
lastVerified: "2026-09-30"
---

# GitHub Releases & Binary Distribution

**GitHub Releases** package software iterations, release notes, and binary artifacts for end users and downstream package distributions.

---

## 1. Creating a Release

1. Navigate to your repository on GitHub and click **Releases** → **Draft a new release**.
2. **Choose a Tag**: Select an existing tag (e.g. `v1.0.0`) or create a new tag on publish.
3. **Target Branch**: Typically `main`.
4. **Release Title**: e.g., `v1.0.0 — OpenDevDocs Production Release`.
5. **Release Notes**: Click **Generate release notes** to automatically summarize all merged Pull Requests and list contributors since the previous release.
6. **Attach Binaries**: Upload compiled binaries (`.tar.gz`, `.zip`, `.exe`, `.dmg`).
7. Click **Publish release**.

---

## 2. Publishing Releases via GitHub CLI

```bash
gh release create v1.0.0 \
  --title "v1.0.0 - Production Release" \
  --generate-notes \
  ./dist/app-darwin-arm64.zip \
  ./dist/app-linux-x64.tar.gz
```

---

## Related Topics

- [Git Tags & Semantic Versioning](/docs/git/tags)
- [GitHub Actions CI Automation](/docs/github/github-actions)
- [Package Managers (npm, pnpm)](/docs/fundamentals/package-managers)
