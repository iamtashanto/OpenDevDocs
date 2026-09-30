---
title: "VS Code: Git & Version Control Integration"
description: Complete guide to VS Code Git integration, Source Control panel, stage ranges, 3-way merge conflict editor, timeline view, and branch management.
category: tools
topic: vscode
type: guide
level: beginner
tags:
  - vscode
  - git
  - source-control
  - version-control
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
  git: "2.46.x"
lastVerified: "2026-09-30"
---

VS Code includes built-in Git support providing visual diffing, partial staging, branch switching, and a dedicated 3-way merge conflict editor.

---

## Source Control Panel (Ctrl/Cmd + Shift + G)

- **Stage Files (`+`)**: Moves files to the Git staging index (`git add`).
- **Discard Changes (`⟲`)**: Restores file to `HEAD` status (`git restore`).
- **Commit**: Type commit message in top box and press <kbd>Cmd/Ctrl</kbd> + <kbd>Enter</kbd>.
- **Partial Staging (Gutter Staging)**: Click line numbers in the diff editor to stage only individual lines or hunks without staging the whole file.

---

## Visual 3-Way Merge Conflict Editor

When Git encounters a merge conflict, VS Code offers an interactive 3-way editor:

```
┌──────────────────────────────┬──────────────────────────────┐
│ Incoming (Their Branch)      │ Current (Your Branch)        │
├──────────────────────────────┴──────────────────────────────┤
│ Result (Editable Merged Output)                             │
│ [Accept Incoming]  [Accept Current]  [Accept Both] [Custom] │
└─────────────────────────────────────────────────────────────┘
```

Click **"Accept Incoming"**, **"Accept Current"**, or **"Accept Both"** to resolve each conflict block cleanly without leaving leftover `<<<<<<< HEAD` marker artifacts.

---

## Timeline View

Located in the bottom-left sidebar, the **Timeline View** displays a chronological history of:
- Git commits that modified the active file.
- Local editor save snapshots (even if uncommitted!).

---

## Related Guides

- [GitLens Extension Guide](/docs/tools/extensions/gitlens)
- [Git Fundamentals](/docs/git/commits)
- [Resolving Merge Conflicts](/docs/git/merging)
