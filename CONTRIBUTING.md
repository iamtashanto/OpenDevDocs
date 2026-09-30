# Contributing to OpenDevDocs

Thank you for wanting to contribute! OpenDevDocs is community-driven and ~90% of the content is plain Markdown — you do **not** need to know React to contribute.

---

## Content Philosophy

1. **Direct and Actionable**: Provide working commands, code snippets, and direct solutions before lengthy theory.
2. **Accurate & Tested**: Always document the tested runtime/version (e.g. Node 22, Ubuntu 24.04, Docker 27).
3. **No Fluff**: Get straight to the point. Focus on production best practices and common edge-cases.

---

## Adding Documentation

### 1. Choose the Section

| What you're adding | Target Directory |
| :--- | :--- |
| In-depth guides & concepts | `content/docs/<category>/<topic>.md` |
| CLI command reference | `content/commands/<tool>/<command-group>.md` |
| Error troubleshooting & root-cause fix | `content/errors/<language>/<error-slug>.md` |
| How-to recipe & pattern | `content/recipes/<technology>/<recipe-slug>.md` |
| Learning path / curriculum | `content/roadmaps/<role>/<step-slug>.md` |
| Library / package reference | `content/packages/<package-name>/<topic>.md` |
| Developer tool guide | `content/tools/<tool-name>/<guide-slug>.md` |

---

## Strict Frontmatter Metadata Schema

Every Markdown file must begin with YAML frontmatter conforming to our Zod schema:

```yaml
---
title: Docker Installation on Ubuntu
description: Install and configure Docker Engine, containerd, and Docker Compose on Ubuntu Linux.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - ubuntu
  - containers
  - linux
platforms:
  - linux
tested:
  docker: "27.x"
  ubuntu: "24.04"
lastVerified: "2026-09-30"
draft: false
---
```

### Allowed `type` values:
- `guide` — Step-by-step practical walk-throughs
- `concept` — Core architecture, mental models, and deep dives
- `reference` — API, CLI, or configuration references
- `tutorial` — Complete beginner-to-intermediate tutorials
- `troubleshooting` — Root cause error solutions
- `recipe` — Focused, production-ready code patterns

### Allowed `level` values:
- `beginner`
- `intermediate`
- `advanced`
- `production`

---

## Local Verification Commands

Before opening a pull request, run the following commands to ensure tests pass:

```bash
# 1. Validate frontmatter across all files
pnpm validate-content

# 2. Run TypeScript checks
pnpm typecheck

# 3. Run ESLint
pnpm lint

# 4. Run static production build
pnpm build
```

---

## Sidebar Organization (`meta.json`)

To configure sidebar display names and ordering, add a `meta.json` file in the folder:

```json
{
  "title": "Docker",
  "pages": ["installation-ubuntu", "containers"]
}
```

---

## Pull Request Guidelines

1. Fork the repository and create a feature branch (`git checkout -b docs/add-docker-guide`).
2. Commit with conventional commit messages:
   - `docs: add docker installation guide on ubuntu`
   - `fix: correct variable scoping example in javascript docs`
3. Push to your fork and submit a PR to `main`.
