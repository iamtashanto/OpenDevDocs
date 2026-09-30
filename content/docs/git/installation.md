---
title: "Installing Git on macOS, Linux, and Windows"
description: "Step-by-step installation instructions for Git across macOS (Homebrew/Xcode), Ubuntu/Debian, Fedora, and Windows (Git for Windows)."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - installation
  - cli
  - setup
platforms:
  - macos
  - linux
  - windows
lastVerified: "2026-09-30"
---

# Installing Git on macOS, Linux, and Windows

---

## 1. macOS Installation

### Option A: Homebrew (Recommended)
```bash
brew install git
```

### Option B: Apple Xcode Command Line Tools
```bash
xcode-select --install
```

---

## 2. Linux Installation

### Ubuntu / Debian:
```bash
sudo apt update
sudo apt install -y git
```

### Fedora / RHEL:
```bash
sudo dnf install -y git
```

### Arch Linux:
```bash
sudo pacman -S git
```

---

## 3. Windows Installation

Download and run the official installer from [git-scm.com/download/win](https://git-scm.com/download/win) to install **Git for Windows**, which includes:
- Git Bash (Unix terminal emulation)
- Git GUI
- Windows Credential Manager integration

---

## 4. Verifying Installation

Verify that the CLI executable is available in your `$PATH`:

```bash
git --version
# Expected: git version 2.45+ or newer
```

---

## Related Topics

- [Git Global Configuration](/docs/git/configuration)
- [Git Repositories & Working Directory](/docs/git/repositories)
- [GitHub SSH Authentication](/docs/github/ssh-authentication)
