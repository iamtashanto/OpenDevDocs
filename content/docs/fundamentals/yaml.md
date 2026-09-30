---
title: "YAML (YAML Ain't Markup Language)"
description: "Understanding YAML: indentation rules, scalars, lists, mappings, multi-line strings, and configuration in GitHub Actions, Docker, and Kubernetes."
category: fundamentals
topic: serialization
type: guide
level: beginner
tags:
  - yaml
  - serialization
  - configuration
  - devops
  - docker
  - kubernetes
platforms:
  - all
lastVerified: "2026-09-30"
---

# YAML (YAML Ain't Markup Language)

**YAML** is a human-readable data serialization language. It is the dominant configuration format for DevOps tooling, CI/CD pipelines (GitHub Actions, GitLab CI), container orchestration (Docker Compose, Kubernetes), and frontmatter metadata in Markdown.

---

## 1. Core Syntax Rules

1. **Indentation Matters**: Hierarchy is defined strictly using **spaces** (typically 2 spaces per indentation level). **Never use Tab characters `\t`**; tabs cause syntax parsing errors.
2. **Key-Value Pairs**: Formatted as `key: value` (space after colon is mandatory).
3. **Case Sensitivity**: Keys are case-sensitive.

---

## 2. YAML Data Structures

### Mappings (Objects / Dictionaries)
```yaml
app:
  name: OpenDevDocs
  port: 3000
  production: true
```

### Sequences (Lists / Arrays)
```yaml
skills:
  - TypeScript
  - Next.js
  - Docker
  - PostgreSQL
```

### Multi-Line Strings
YAML offers two operators for preserving or folding long paragraphs:
- **`|` (Literal)**: Preserves line breaks exactly as written.
- **`>` (Folded)**: Converts line breaks into single spaces (folds into one long paragraph).

```yaml
summary_folded: >
  This is a very long sentence that will be folded
  into a single continuous line upon parsing.

summary_literal: |
  Line 1
  Line 2
  Line 3 (line breaks preserved)
```

---

## 3. Real-World Example: GitHub Actions Workflow

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Run Validation Suite
        run: pnpm test
```

---

## 4. Common YAML Mistakes

| Mistake | Consequence | How to Fix |
| :--- | :--- | :--- |
| Using `Tab` instead of Spaces | Parser error: `found character '\t' that cannot start any token` | Configure editor to convert tabs to 2 spaces automatically. |
| Missing space after colon (`key:value`) | Parsed as single string rather than key-value pair | Always write `key: value`. |
| Unquoted country codes like `NO` or `ON` | YAML 1.1 parses `NO`, `no`, `ON`, `off`, `yes` as Booleans (`false`/`true`) | Quote string values: `country: "NO"`. |

---

## Related Topics

- [JSON Data Format](/docs/fundamentals/json)
- [Environment Variables](/docs/fundamentals/environment-variables)
- [Docker Compose Multi-Stage Builds](/recipes/docker/dockerize-nextjs)
- [Nginx Configuration Recipe](/recipes/devops/nginx-reverse-proxy-ssl)
