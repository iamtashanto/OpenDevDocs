---
title: "VS Code: Command Palette & Quick Open"
description: Complete guide to using the Command Palette (>), Quick Open (Ctrl/Cmd+P), symbol search (@), and file navigation in VS Code.
category: tools
topic: vscode
type: guide
level: beginner
tags:
  - vscode
  - command-palette
  - quick-open
  - navigation
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

The **Command Palette** is the central control hub of VS Code, providing instant keyboard access to every internal editor command, extension action, and configuration option.

---

## Opening the Command Palette

- **macOS**: <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (or <kbd>F1</kbd>)
- **Windows / Linux**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (or <kbd>F1</kbd>)

---

## Command Palette Prefixes & Modes

The input bar changes its behavior based on the leading prefix character:

| Prefix | Mode | Description | Example |
| :--- | :--- | :--- | :--- |
| `>` | **Commands** | Executes internal VS Code & extension commands | `>Reload Window` |
| *(None)* | **Quick Open** | Fuzzy file search across workspace | `user.controller` |
| `@` | **Symbols** | Navigates functions, classes, and variables in active file | `@handleClick` |
| `@:` | **Symbols by Category** | Groups symbols by classes, methods, fields | `@:methods` |
| `#` | **Workspace Symbols** | Searches symbols across the entire project | `#UserInterface` |
| `:` | **Go to Line** | Jumps directly to line number | `:42` or `:42:10` |
| `?` | **Help** | Lists all available prefix operators | `?` |

---

## Top 5 Most Useful Commands

1. **`>Developer: Reload Window`**: Restarts the VS Code renderer without closing background tasks. Useful when TypeScript types or extension servers get stuck.
2. **`>TypeScript: Restart TS Server`**: Re-analyzes TypeScript types and resolves stale lint/type errors.
3. **`>View: Toggle Terminal`**: Shows/hides integrated terminal panel.
4. **`>Git: Checkout to...`**: Interactive branch switcher with fuzzy search.
5. **`>Preferences: Open User Settings (JSON)`**: Jumps directly to raw settings configuration.

---

## Related Guides

- [Keyboard Shortcuts](/docs/tools/vscode/keyboard-shortcuts)
- [Settings Reference](/docs/tools/vscode/settings)
