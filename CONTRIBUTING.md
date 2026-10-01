# Contributing to OpenDevDocs

Thank you for your interest in contributing to **OpenDevDocs**! OpenDevDocs is a community-driven open-source knowledge platform. Approximately ~90% of the content is plain Markdown (`.md`) files — **you do not need React or web development experience to contribute documentation!**

---

## 🚀 Beginner-Friendly 10-Step Workflow

Follow these steps to contribute your first guide, command reference, or error fix:

<Steps>
  <Step step={1} title="Fork the Repository">
    Click the **Fork** button at the top-right of [github.com/iamtashanto/OpenDevDocs](https://github.com/iamtashanto/OpenDevDocs) to create your own copy.
  </Step>

  <Step step={2} title="Clone Your Fork Locally">
    ```bash
    git clone https://github.com/<your-username>/OpenDevDocs.git
    cd OpenDevDocs
    ```
  </Step>

  <Step step={3} title="Install pnpm (If Not Installed)">
    ```bash
    corepack enable
    corepack prepare pnpm@latest --activate
    # or: npm install -g pnpm
    ```
  </Step>

  <Step step={4} title="Install Dependencies">
    ```bash
    pnpm install
    ```
  </Step>

  <Step step={5} title="Start Local Development Server">
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser. Live changes will reflect automatically.
  </Step>

  <Step step={6} title="Create or Edit Markdown Files">
    Create or modify a Markdown file in the appropriate directory:
    - **Guides & Concepts**: `content/docs/<category>/<topic>.md`
    - **CLI Commands**: `content/commands/<tool>/<command-slug>.md`
    - **Error Troubleshooting**: `content/errors/<technology>/<error-slug>.md`
    - **Practical Recipes**: `content/recipes/<topic>/<recipe-slug>.md`
    - **Package References**: `content/packages/<package-slug>.md`
    - **Developer Tools**: `content/docs/tools/<tool-slug>.md`
  </Step>

  <Step step={7} title="Validate Content Metadata">
    Run the automated content validator to check frontmatter and links:
    ```bash
    pnpm validate-content
    ```
  </Step>

  <Step step={8} title="Commit Your Changes">
    Use clear, conventional commit messages:
    ```bash
    git add .
    git commit -m "docs: add guide on docker multi-stage builds"
    ```
  </Step>

  <Step step={9} title="Push to Your Fork">
    ```bash
    git push origin my-feature-branch
    ```
  </Step>

  <Step step={10} title="Open a Pull Request">
    Navigate to your GitHub fork and click **Compare & pull request**. Fill out the pull request template and submit!
  </Step>
</Steps>

---

## 📝 Frontmatter Metadata Schema

Every Markdown file must begin with YAML frontmatter conforming to our metadata schema:

```yaml
---
title: "Docker Multi-Stage Builds"
description: Complete guide to optimizing image sizes and creating secure production images using multi-stage builds.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - multi-stage
  - optimization
  - security
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---
```

### Allowed `type` values:
- `guide` — Step-by-step practical walk-throughs
- `concept` — Mental models, internal architectures, and deep dives
- `reference` — API, CLI, or configuration reference sheets
- `tutorial` — Complete beginner-to-intermediate tutorials
- `troubleshooting` — Root-cause error diagnostic guides
- `recipe` — Focused, production-ready code patterns

### Allowed `level` values:
- `beginner`
- `intermediate`
- `advanced`
- `production`

---

## 🏷️ Repository Issue & PR Labels

We use standard labels to categorize issues and pull requests:

| Label | Description |
| :--- | :--- |
| `good first issue` | Great starting points for newcomers to open source |
| `help wanted` | Open tasks seeking community assistance |
| `documentation` | Improvements, additions, or fixes to docs content |
| `outdated` | Content referencing deprecated tools, versions, or APIs |
| `frontend` | HTML, CSS, JavaScript, React, Next.js topics |
| `backend` | Node.js, Express, databases, and APIs |
| `database` | PostgreSQL, SQLite, Prisma, and SQL queries |
| `devops` | Docker, CI/CD, Nginx, and cloud deployments |
| `linux` | Linux commands, shells, and system administration |
| `git` | Git commands, branching, and GitHub workflows |
| `networking` | HTTP, DNS, ports, TCP/IP, and reverse proxies |
| `translation` | Localizing documentation into other languages |

---

## ⚙️ Automated Continuous Integration (CI) Checks

Every Pull Request automatically triggers automated GitHub Actions CI checks:

1. **Dependency Lockfile Verification**: `pnpm install --frozen-lockfile`
2. **ESLint Code Quality**: `pnpm lint`
3. **TypeScript Type Safety**: `pnpm typecheck` (`tsc --noEmit`)
4. **Content & Frontmatter Validation**: `pnpm validate-content` (checks required metadata, duplicate slugs, and broken internal links)
5. **Production Build Compilation**: `pnpm build`

---

## 🤝 Community & Code of Conduct

All contributors are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md) to ensure an inclusive, welcoming, and harassment-free environment.

Thank you for helping make OpenDevDocs the best open-source developer knowledge resource!
