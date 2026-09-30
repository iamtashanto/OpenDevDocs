---
title: "VS Code: Dev Containers Introduction"
description: Complete introduction to Development Containers (.devcontainer/devcontainer.json), containerized toolchains, automated onboarding, and Docker isolation.
category: tools
topic: vscode
type: guide
level: intermediate
tags:
  - vscode
  - devcontainers
  - docker
  - reproducibility
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
  docker: "27.x"
lastVerified: "2026-09-30"
---

The **Dev Containers** extension (`ms-vscode-remote.remote-containers`) allows you to use a Docker container as a full-featured development environment.

---

## Why Use Dev Containers?

1. **Zero Local SDK Installations**: Developers don't need to install Node, Python, Rust, Go, or Postgres directly on their host OS.
2. **Instant Team Onboarding**: New developers clone the repository, click *"Reopen in Container"*, and have all compilers, linters, extensions, and databases pre-configured in minutes.
3. **No "Works on My Machine"**: 100% environment parity between team members across macOS, Windows (WSL2), and Linux.

---

## Configuring `.devcontainer/devcontainer.json`

Create `.devcontainer/devcontainer.json` in your repository:

```json
{
  "name": "Node.js & TypeScript Dev Container",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    "ghcr.io/devcontainers-contrib/features/pnpm:2": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "prisma.prisma"
      ],
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
      }
    }
  },
  "forwardPorts": [3000],
  "postCreateCommand": "pnpm install"
}
```

---

## Opening a Dev Container

1. Install **Dev Containers** extension (`ms-vscode-remote.remote-containers`).
2. Open project folder in VS Code.
3. Press <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> $\rightarrow$ **`Dev Containers: Reopen in Container`**.
4. VS Code builds the Docker container image, installs extensions inside the container, and mounts your workspace files seamlessly.

---

## Related Guides

- [Docker Architecture & Basics](/docs/docker/architecture)
- [Remote SSH Development](/docs/tools/vscode/remote-ssh)
- [VS Code Extensions Reference](/docs/tools/vscode/extensions)
