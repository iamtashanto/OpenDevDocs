---
title: "Docker Extension for VS Code"
description: Complete guide to the official Docker extension for VS Code, managing containers, images, volumes, networks, and Dockerfile autocomplete and linting.
category: tools
topic: extensions
type: reference
level: beginner
tags:
  - docker
  - vscode
  - containers
  - extensions
platforms:
  - linux
  - macos
  - windows
tested:
  extension: "1.29.x"
  docker: "27.x"
lastVerified: "2026-09-30"
---

## What It Does

The official **Docker** extension (`ms-azuretools.vscode-docker`) brings container management directly into VS Code, offering a visual explorer for running containers, images, volumes, registries, and rich autocomplete/scaffolding for `Dockerfile` and `compose.yaml` files.

---

## Why Use It

1. **Visual Container Management**: Start, stop, restart, attach shells, and view logs with a single click.
2. **Dockerfile Scaffolding**: Automatically generate optimized Dockerfiles and Compose files for Node.js, Python, Go, Java, and .NET.
3. **Interactive Inspection**: Browse container filesystems and inspect volume contents directly within the editor tree.
4. **Autocomplete & Linting**: Context-aware IntelliSense for Dockerfile instructions and Compose properties.

---

## Installation

- **VS Code Marketplace**: Search for `ms-azuretools.vscode-docker` and click **Install**.
- **CLI**:
  ```bash
  code --install-extension ms-azuretools.vscode-docker
  ```

---

## Configuration

In `.vscode/settings.json`:

```json
{
  "docker.dockerPath": "docker",
  "docker.composeBuild": true,
  "docker.attachShellCommand.linuxContainer": "/bin/sh",
  "docker.promptForTelemetry": false
}
```

---

## Use Cases & Examples

### 1. Generating Docker Files Automatically
Press <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> $\rightarrow$ **`Docker: Add Docker Files to Workspace`**:
- Select Application Platform: **Node.js**
- Select Entry Point: `src/index.js`
- Select Port: `3000`
- Include Docker Compose: **Yes**

The extension generates production-ready `Dockerfile`, `compose.yaml`, and `.dockerignore` files tailored to your project.

### 2. Attaching a Shell to a Running Container
In the Docker Explorer sidebar:
- Right-click any running container $\rightarrow$ **Attach Shell**.
- Opens an interactive terminal session inside the container without typing `docker exec -it`.

---

## Alternatives

- **Docker Desktop Dashboard**: Standalone GUI client.
- **Portainer**: Web-based container management UI.
- **Lazydocker**: Terminal TUI for container monitoring.

---

## Performance & Security Considerations

- **Linux Permissions**: On Linux, ensure your user is in the `docker` group; otherwise, the extension cannot connect to `/var/run/docker.sock`.
- **Remote Host Docker**: Set `DOCKER_HOST=ssh://user@remote-host` to manage remote Docker engines from your local editor.

---

## Related Guides

- [Docker Architecture & Guide](/docs/docker/architecture)
- [Dev Containers Guide](/docs/tools/vscode/dev-containers)
- [Error: Permission Denied to Docker Socket](/errors/docker/permission-denied)
