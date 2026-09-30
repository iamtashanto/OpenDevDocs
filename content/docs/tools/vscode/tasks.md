---
title: "VS Code: Tasks Automation (`tasks.json`)"
description: Complete guide to configuring automated build, test, and watch tasks in .vscode/tasks.json, task problem matchers, and keyboard shortcut triggers.
category: tools
topic: vscode
type: guide
level: intermediate
tags:
  - vscode
  - tasks
  - automation
  - json
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

**VS Code Tasks** allow you to map shell commands, build pipelines, and test runners into native editor actions with automatic error highlighting via problem matchers.

---

## Configuring `.vscode/tasks.json`

Open Command Palette $\rightarrow$ **`Tasks: Configure Task`**:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": ["$tsc"],
      "label": "npm: build (default)"
    },
    {
      "type": "shell",
      "command": "npm run test",
      "group": "test",
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      },
      "label": "Run Unit Tests"
    },
    {
      "type": "shell",
      "command": "docker compose up -d",
      "label": "Start Dev Containers",
      "problemMatcher": []
    }
  ]
}
```

---

## Running Tasks

- **Trigger Default Build Task**: <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>
- **Open Task Runner**: Open Command Palette $\rightarrow$ **`Tasks: Run Task`**

---

## Problem Matchers

Problem matchers parse the raw stdout/stderr output of compilers (`tsc`, `eslint`, `gcc`) and convert errors directly into clickable underlines in your code and entries in the **Problems Panel** (<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>).

---

## Related Guides

- [VS Code Settings](/docs/tools/vscode/settings)
- [npm Scripts](/docs/package-managers/scripts)
- [Integrated Terminal](/docs/tools/vscode/integrated-terminal)
