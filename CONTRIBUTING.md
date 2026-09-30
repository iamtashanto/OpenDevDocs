# Contributing to OpenDevDocs

Thank you for wanting to contribute! OpenDevDocs is community-driven and ~90% of the content is plain Markdown — you do **not** need to know React to contribute.

---

## Adding Content

### 1. Choose the right section

| What you're adding | Section |
|--------------------|---------|
| Conceptual guide or reference | `content/docs/` |
| CLI command reference | `content/commands/` |
| Error fix | `content/errors/` |
| How-to pattern | `content/recipes/` |
| Learning path | `content/roadmaps/` |
| Library/package docs | `content/packages/` |
| Developer tool guide | `content/tools/` |

### 2. Create the Markdown file

```
content/<section>/<technology>/<page-name>.md
```

Example: `content/errors/javascript/cannot-read-properties-of-undefined.md`

### 3. Required frontmatter

Every file **must** start with:

```yaml
---
title: Page Title Here
description: A clear one-sentence description of what this page covers.
---
```

### 4. Validate and build

```bash
pnpm validate-content   # check frontmatter
pnpm build              # ensure no build errors
```

### 5. Open a pull request

Push your branch and open a PR. The title should follow:
- `docs: add X guide` for new content
- `fix: correct X error page` for corrections
- `feat: add X component` for code changes

---

## Sidebar Ordering

Add a `meta.json` file alongside your content to control sidebar order:

```json
{
  "title": "JavaScript",
  "pages": ["cannot-read-properties-of-undefined", "type-error", "reference-error"]
}
```

---

## Code of Conduct

Be respectful, helpful, and constructive. We welcome contributors of all experience levels.
