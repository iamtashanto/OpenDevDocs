---
title: "Docker Engine Architecture"
description: Deep dive into the Docker client-server architecture, dockerd daemon, containerd, runc OCI runtime, and container registries.
category: devops
topic: docker
type: concept
level: intermediate
tags:
  - docker
  - architecture
  - dockerd
  - containerd
  - runc
  - oci
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## Docker Client-Server Architecture

Docker uses a client-server architecture where the **Docker Client (CLI)** communicates with the **Docker Daemon (`dockerd`)** via a REST API over Unix domain sockets or network interfaces.

```
┌─────────────────────────────────┐
│        Docker Client (CLI)      │ ──(REST API over /var/run/docker.sock)
└────────────────┬────────────────┘
                 ▼
┌─────────────────────────────────┐
│     Docker Daemon (dockerd)     │ ──> Manages images, networks, volumes
└────────────────┬────────────────┘
                 ▼ (gRPC)
┌─────────────────────────────────┐
│       containerd (Daemon)       │ ──> Manages container lifecycles & snapshots
└────────────────┬────────────────┘
                 ▼
┌─────────────────────────────────┐
│        runc (OCI Runtime)       │ ──> Interfaces with Linux kernel cgroups/namespaces
└────────────────┬────────────────┘
                 ▼
     [ Isolated Container Process ]
```

---

## Key Architectural Components

### 1. Docker CLI (`docker`)
The command-line interface developers use to issue instructions (e.g. `docker build`, `docker run`, `docker compose`).

### 2. Docker Daemon (`dockerd`)
The persistent background service that listens for Docker API requests and manages high-level objects like Docker images, containers, networks, and data volumes.

### 3. containerd
An industry-standard core container runtime (graduated CNCF project) that manages the complete container lifecycle: image transfer, storage management, container execution, and supervision.

### 4. runc
A lightweight, low-level CLI tool for spawning and running containers according to the **Open Container Initiative (OCI)** specification.

### 5. Container Registries (Docker Hub, GHCR, ECR)
Central repositories for storing and distributing versioned container images. When you run `docker pull postgres:16`, Docker streams layer blobs from the remote registry down to your local daemon storage.
