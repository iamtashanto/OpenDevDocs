---
title: Content Metadata Schema & Standards
description: The official specification for OpenDevDocs documentation frontmatter and structure.
category: standards
topic: contributing
type: reference
level: beginner
tags:
  - schema
  - frontmatter
  - contributing
  - standards
lastVerified: "2026-09-30"
---

## Overview

OpenDevDocs uses a strict, automated metadata system powered by Zod and Fumadocs. Every document in the repository requires consistent YAML frontmatter to support automated search indexing, SEO metadata generation, breadcrumbs, and reader level indicators.

---

## Frontmatter Schema Reference

```yaml
---
title: Docker Installation on Ubuntu
description: Install and configure Docker on Ubuntu.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - ubuntu
  - containers
platforms:
  - linux
tested:
  docker: "current"
  ubuntu: "24.04"
lastVerified: "2026-09-30"
draft: false
---
```

### Supported Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Clear, descriptive document title. |
| `description` | `string` | Recommended | 1–2 sentence summary used for SEO and previews. |
| `category` | `string` | Optional | High-level category (e.g., `frontend`, `backend`, `devops`, `database`, `linux`). |
| `topic` | `string` | Optional | Specific technology or library (e.g., `docker`, `react`, `typescript`, `postgresql`). |
| `type` | `enum` | Optional | Content format (see allowed values below). |
| `level` | `enum` | Optional | Target audience experience level (see allowed values below). |
| `tags` | `string[]` | Optional | Relevant keyword tags for search and discovery. |
| `platforms` | `string[]` | Optional | Applicable OS/environments (`linux`, `macos`, `windows`, `web`, `all`). |
| `tested` | `record` | Optional | Key-value pairs of tested runtime/package versions. |
| `lastVerified` | `string` | Optional | Date in `YYYY-MM-DD` format when the code/steps were last tested. |
| `draft` | `boolean` | Optional | When `true`, hides the document from search and navigation. |

---

## Allowed Enums

### Content Types (`type`)

- `guide` — Step-by-step practical walk-throughs
- `concept` — In-depth architectural or conceptual explanations
- `reference` — Comprehensive API, CLI, or configuration references
- `tutorial` — End-to-end beginner learning tutorials
- `troubleshooting` — Root-cause error diagnoses and solutions
- `recipe` — Focused, production-ready code patterns

### Experience Levels (`level`)

- `beginner` — Assumes zero prior domain knowledge
- `intermediate` — Requires basic familiarity with syntax and tooling
- `advanced` — Deep internals, optimization, and complex architectures
- `production` — Hardened, secure enterprise setups and deployment configurations

---

## Content Hierarchy Rules

To keep URLs clean and maintainable, organize files logically:

```
content/docs/
├── javascript/
│   ├── variables.md           -> /docs/javascript/variables
│   └── meta.json
├── react/
│   ├── hooks/
│   │   ├── use-effect.md      -> /docs/react/hooks/use-effect
│   │   └── meta.json
│   └── meta.json
└── docker/
    ├── containers.md          -> /docs/docker/containers
    └── meta.json
```

---

## Validating Your Frontmatter

Before opening a pull request, run the automated validator:

```bash
pnpm validate-content
```
