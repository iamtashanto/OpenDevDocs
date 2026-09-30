---
title: "VS Code: Essential Keyboard Shortcuts"
description: Complete cheatsheet of the most important productivity keyboard shortcuts in Visual Studio Code for macOS, Windows, and Linux.
category: tools
topic: vscode
type: reference
level: beginner
tags:
  - vscode
  - shortcuts
  - productivity
  - keybindings
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

Mastering editor keybindings drastically accelerates coding, file navigation, multi-cursor editing, and refactoring.

---

## Essential General Navigation

| Action | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Command Palette** | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> |
| **Quick Open File** | <kbd>Cmd</kbd> + <kbd>P</kbd> | <kbd>Ctrl</kbd> + <kbd>P</kbd> |
| **Global Search across Files** | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> |
| **Toggle Integrated Terminal** | <kbd>Ctrl</kbd> + <kbd>`</kbd> | <kbd>Ctrl</kbd> + <kbd>`</kbd> |
| **Toggle Primary Sidebar** | <kbd>Cmd</kbd> + <kbd>B</kbd> | <kbd>Ctrl</kbd> + <kbd>B</kbd> |
| **Split Editor Window** | <kbd>Cmd</kbd> + <kbd>\</kbd> | <kbd>Ctrl</kbd> + <kbd>\</kbd> |
| **Close Active Editor** | <kbd>Cmd</kbd> + <kbd>W</kbd> | <kbd>Ctrl</kbd> + <kbd>W</kbd> |

---

## Code Editing & Multi-Cursor

| Action | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Add Next Match to Selection** | <kbd>Cmd</kbd> + <kbd>D</kbd> | <kbd>Ctrl</kbd> + <kbd>D</kbd> |
| **Select All Occurrences** | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> |
| **Insert Cursor Above / Below** | <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>↑/↓</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>↑/↓</kbd> |
| **Move Line Up / Down** | <kbd>Option</kbd> + <kbd>↑/↓</kbd> | <kbd>Alt</kbd> + <kbd>↑/↓</kbd> |
| **Duplicate Line Up / Down** | <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>↑/↓</kbd> | <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>↑/↓</kbd> |
| **Delete Entire Line** | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> |
| **Toggle Line Comment** | <kbd>Cmd</kbd> + <kbd>/</kbd> | <kbd>Ctrl</kbd> + <kbd>/</kbd> |

---

## Code Navigation & Refactoring

| Action | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Go to Definition** | <kbd>F12</kbd> (or <kbd>Cmd</kbd> + Click) | <kbd>F12</kbd> (or <kbd>Ctrl</kbd> + Click) |
| **Peek Definition** | <kbd>Option</kbd> + <kbd>F12</kbd> | <kbd>Alt</kbd> + <kbd>F12</kbd> |
| **Find All References** | <kbd>Shift</kbd> + <kbd>F12</kbd> | <kbd>Shift</kbd> + <kbd>F12</kbd> |
| **Rename Symbol (F2 Refactor)** | <kbd>F2</kbd> | <kbd>F2</kbd> |
| **Format Document** | <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd> | <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> |
| **Quick Fix / Code Action** | <kbd>Cmd</kbd> + <kbd>.</kbd> | <kbd>Ctrl</kbd> + <kbd>.</kbd> |

---

## Customizing Keyboard Shortcuts

Open keybindings JSON editor:
- Open Command Palette $\rightarrow$ **`Preferences: Open Keyboard Shortcuts (JSON)`**

```json
[
  {
    "key": "cmd+shift+r",
    "command": "workbench.action.reloadWindow"
  }
]
```

---

## Related Guides

- [Command Palette Guide](/docs/tools/vscode/command-palette)
- [Integrated Terminal](/docs/tools/vscode/integrated-terminal)
