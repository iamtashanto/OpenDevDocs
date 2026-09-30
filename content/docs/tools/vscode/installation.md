---
title: "VS Code: Installation & First Steps"
description: Complete guide to installing Visual Studio Code across macOS, Linux, and Windows, enabling CLI shell integration (code command), and initial setup.
category: tools
topic: vscode
type: guide
level: beginner
tags:
  - vscode
  - installation
  - editor
  - tools
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

**Visual Studio Code** (VS Code) is an open-source, extensible code editor developed by Microsoft, supporting almost every programming language and runtime.

---

## Installation by Platform

### macOS
1. Download the Universal `.zip` or `.dmg` from [code.visualstudio.com](https://code.visualstudio.com).
2. Drag `Visual Studio Code.app` into your `/Applications` folder.
3. Enable the `code` terminal command:
   - Open VS Code.
   - Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open Command Palette.
   - Type `Shell Command: Install 'code' command in PATH` and press <kbd>Enter</kbd>.

### Linux (Ubuntu / Debian)
```bash
sudo apt update
sudo apt install software-properties-common apt-transport-https wget -y
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code
```

### Windows
1. Download the **User Installer (64-bit)** `.exe` from [code.visualstudio.com](https://code.visualstudio.com).
2. Run installer and ensure **"Add to PATH (requires shell restart)"** and **"Register Code as an editor for supported file types"** are checked.

---

## Launching Projects from Terminal

Once the `code` CLI is in your path:

```bash
# Open current directory in VS Code
code .

# Open a specific file
code src/index.ts

# Open a file at a specific line and column
code -g src/index.ts:42:10

# Compare two files (Diff Editor)
code --diff fileA.js fileB.js
```

---

## Related Guides

- [VS Code Settings & Configuration](/docs/tools/vscode/settings)
- [Command Palette Guide](/docs/tools/vscode/command-palette)
- [Essential Keyboard Shortcuts](/docs/tools/vscode/keyboard-shortcuts)
