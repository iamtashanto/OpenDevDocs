---
title: "VS Code: Remote - SSH Development"
description: Complete guide to using the Remote - SSH extension in VS Code to edit files, run debuggers, and execute terminals on remote Linux servers and cloud VMs.
category: tools
topic: vscode
type: guide
level: intermediate
tags:
  - vscode
  - remote-ssh
  - linux
  - ssh
  - cloud
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

The **Remote - SSH** extension allows you to use your local VS Code UI while running extensions, language servers, terminals, and debuggers directly on a remote Linux server or cloud VM (AWS EC2, DigitalOcean, Hetzner).

---

## How It Works

```
┌───────────────────────────┐         SSH Tunnel         ┌───────────────────────────┐
│ Local Machine             │ ─────────────────────────► │ Remote Linux Server       │
│ - VS Code UI              │                            │ - VS Code Server Process  │
│ - Theme & Keybindings     │                            │ - Compilers & Toolchains  │
│ - Keyboard & Mouse Inputs │                            │ - Source Code & Database  │
└───────────────────────────┘                            └───────────────────────────┘
```

---

## Setup & Connection

<Steps>
  <Step step={1} title="Install Remote - SSH Extension">
    Install `ms-vscode-remote.remote-ssh` from the VS Code Marketplace.
  </Step>

  <Step step={2} title="Configure ~/.ssh/config">
    Edit your local `~/.ssh/config` file:

    ```ssh-config
    Host dev-server
        HostName 192.168.1.50
        User ubuntu
        IdentityFile ~/.ssh/id_ed25519
    ```
  </Step>

  <Step step={3} title="Connect to Remote Host">
    1. Click the green **Remote Indicator** button in the bottom-left corner of the status bar.
    2. Select **Connect to Host...** $\rightarrow$ `dev-server`.
    3. VS Code installs the lightweight VS Code Server daemon on the remote host and opens a new window.
  </Step>
</Steps>

---

## Remote Port Forwarding

VS Code automatically detects listening network ports on the remote host (e.g. `localhost:3000`) and creates an encrypted local forward tunnel so you can test web apps at `http://localhost:3000` in your local browser!

---

## Related Guides

- [Dev Containers Guide](/docs/tools/vscode/dev-containers)
- [Linux SSH Fundamentals](/docs/linux/ssh)
- [Docker Documentation](/docs/docker/architecture)
