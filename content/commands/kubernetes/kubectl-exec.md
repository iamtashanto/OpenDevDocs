---
title: "kubectl exec"
description: Execute commands or open an interactive terminal session inside a running container within a Kubernetes Pod.
category: devops
topic: kubernetes
type: reference
level: beginner
tags:
  - kubernetes
  - kubectl
  - exec
  - bash
  - debugging
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Command

<Command>kubectl exec -it web-app-abc12 -- /bin/sh</Command>

---

## Short Description

`kubectl exec` executes commands directly inside an active container in a Pod, allowing interactive shell sessions and runtime debugging.

---

## Syntax

```bash
kubectl exec (POD | TYPE/NAME) [-c CONTAINER] [FLAGS] -- COMMAND [args...]
```

---

## Examples

### 1. Open Interactive Shell Session
```bash
kubectl exec -it web-app-559d7b489d-abc12 -- /bin/sh
```

### 2. Run Database Migration Inside App Pod
```bash
kubectl exec api-deployment-abc12 -- npx prisma migrate deploy
```

### 3. Test Network Connectivity to Another Service
```bash
kubectl exec web-app-abc12 -- wget -qO- http://backend-api:8080/healthz
```

---

## Common Options

| Option | Shorthand | Description |
| :--- | :--- | :--- |
| `--stdin` | `-i` | Pass standard input (stdin) to the container. |
| `--tty` | `-t` | Allocate a pseudo-TTY for terminal color and interactive input. |
| `--container` | `-c` | Target container name in multi-container pods. |

---

## Warnings

<Warning title="Ephemeral Container State">
Modifications made to the container filesystem via `kubectl exec` are lost if the Pod restarts or is rescheduled to another node. Never make manual persistent hotfixes via `exec`.
</Warning>
