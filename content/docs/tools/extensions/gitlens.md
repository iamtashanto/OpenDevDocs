---
title: "GitLens: Git Supercharged"
description: Complete guide to the GitLens VS Code extension, inline blame annotations, visual commit graph, file history revisions, and branch comparisons.
category: tools
topic: extensions
type: reference
level: beginner
tags:
  - gitlens
  - vscode
  - git
  - extensions
platforms:
  - linux
  - macos
  - windows
tested:
  extension: "15.x"
  git: "2.46.x"
lastVerified: "2026-09-30"
---

## What It Does

**GitLens** (`eamodio.gitlens`) supercharges the built-in Git capabilities of VS Code, providing inline Git blame annotations, interactive file histories, visual commit graphs, and branch comparison views directly in your editor.

---

## Why Use It

1. **Inline Blame Annotations**: Instantly see who changed a line of code, in which commit, and how long ago without running `git blame` in the terminal.
2. **Visual Commit Graph**: Browse complex multi-branch merge histories with an interactive graphical tree.
3. **Revision Navigation**: Step through past revisions of any file or function block backwards and forwards in time.

---

## Installation

- **VS Code Marketplace**: Search for `eamodio.gitlens` and click **Install**.
- **CLI**:
  ```bash
  code --install-extension eamodio.gitlens
  ```

---

## Configuration

In `.vscode/settings.json`:

```json
{
  // Show inline blame message at end of current line
  "gitlens.currentLine.enabled": true,
  "gitlens.currentLine.delay": 200,

  // Show commit author avatar
  "gitlens.avatars": true,

  // Visual commit graph
  "gitlens.graph.showDetailsView": true,

  // Status bar blame
  "gitlens.statusBar.enabled": true
}
```

---

## Use Cases & Examples

### 1. Understanding Code Context
Placing your cursor on any line renders a subtle dimmed annotation:
`Alice, 3 weeks ago • Fix race condition in authentication token refresh`
Clicking the annotation reveals the full commit message, diff changes, and linked Pull Request URL.

### 2. Comparing Branches / Commits
Open the **GitLens Side Bar** $\rightarrow$ **Compare References** to generate a diff of all files modified between `main` and your current feature branch.

---

## Alternatives

- **Git Graph**: Lightweight, open-source visual commit tree extension.
- **Git History**: Simple commit browser extension.
- **Built-in VS Code Timeline**: Lightweight built-in local and Git history view.

---

## Performance & Security Considerations

- **Large Repositories**: In monorepos with hundreds of thousands of commits, disable `gitlens.codeLens.authors.enabled` to reduce Git process spawning overhead.
- **Telemetry**: GitLens includes optional cloud features; free local features do not require any cloud sign-in.

---

## Related Guides

- [VS Code Git Integration](/docs/tools/vscode/git-integration)
- [Git Fundamentals](/docs/git/commits)
