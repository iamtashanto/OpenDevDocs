---
title: "VS Code: Integrated Terminal"
description: Complete guide to the VS Code integrated terminal, split terminals, multiple shell profiles (Zsh, Bash, PowerShell, WSL), and shell integration.
category: tools
topic: vscode
type: guide
level: beginner
tags:
  - vscode
  - terminal
  - zsh
  - bash
  - wsl
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

VS Code includes an integrated terminal that runs directly at the root of your workspace, allowing you to run dev servers, Git commands, and build scripts without switching application windows.

---

## Terminal Shortcuts

- **Toggle Terminal**: <kbd>Ctrl</kbd> + <kbd>`</kbd>
- **Create New Terminal Tab**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>`</kbd>
- **Split Terminal (Side-by-Side)**: <kbd>Cmd</kbd> + <kbd>\</kbd> (macOS) / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>5</kbd> (Win/Linux)
- **Switch Between Active Terminal Tabs**: <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>↑/↓</kbd> (macOS) / <kbd>Alt</kbd> + <kbd>↑/↓</kbd> (Win/Linux)

---

## Configuring Default Shell Profiles

You can configure VS Code to launch Zsh on macOS, Bash or Fish on Linux, and PowerShell or WSL2 on Windows.

In `settings.json`:

```json
{
  // macOS default
  "terminal.integrated.defaultProfile.osx": "zsh",

  // Linux default
  "terminal.integrated.defaultProfile.linux": "bash",

  // Windows default (WSL or PowerShell)
  "terminal.integrated.defaultProfile.windows": "PowerShell",

  // Shell Profiles
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    "Ubuntu (WSL)": {
      "path": "wsl.exe",
      "args": ["-d", "Ubuntu"]
    },
    "Git Bash": {
      "path": "C:\\Program Files\\Git\\bin\\bash.exe"
    }
  }
}
```

---

## Shell Integration Features

VS Code terminal includes rich shell integration:
- **Command decorations**: Blue circle next to successful commands; red circle next to failed commands.
- **Run Recent Command**: Press <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> $\rightarrow$ `Terminal: Run Recent Command` to search historical commands interactively.
- **Scroll to Previous Command**: <kbd>Cmd/Ctrl</kbd> + <kbd>↑/↓</kbd> jumps directly between command prompts.

---

## Related Guides

- [Terminal Tools & Starship](/docs/tools/terminal-tools)
- [VS Code Tasks](/docs/tools/vscode/tasks)
- [Linux Essential Commands](/docs/linux/essential-commands)
