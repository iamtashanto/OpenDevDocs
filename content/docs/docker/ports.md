---
title: "Docker Ports & Port Mapping"
description: Complete guide to port publishing, host port mapping, binding specific network interfaces, and EXPOSE vs -p in Docker.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - ports
  - networking
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

By default, containers are isolated and their listening ports are inaccessible to external hosts. Docker port publishing maps host network interfaces to container ports via `iptables` / NAT.

---

## Syntax for Port Mapping (`-p`)

The `-p` (or `--publish`) flag follows the format:

```
-p [host_ip:][host_port]:container_port[/protocol]
```

### Common Patterns

```bash
# 1. Map host port 8080 to container port 3000
docker run -d -p 8080:3000 my-node-app

# 2. Map same port on host and container
docker run -d -p 5432:5432 postgres:16-alpine

# 3. Bind only to localhost (Security Best Practice for databases)
docker run -d -p 127.0.0.1:5432:5432 postgres:16-alpine

# 4. Assign an ephemeral random host port
docker run -d -p 80 nginx

# 5. Publish UDP port instead of TCP
docker run -d -p 53:53/udp coredns/coredns
```

---

## Inspecting Port Mappings

```bash
# List all mapped ports for a running container
docker port <container_name_or_id>

# Output example:
# 3000/tcp -> 0.0.0.0:8080
# 3000/tcp -> :::8080
```

---

## `EXPOSE` vs `-p`

| Feature | `EXPOSE 3000` in Dockerfile | `docker run -p 8080:3000` |
| :--- | :--- | :--- |
| **Action** | Documentation only; does NOT open host ports | Actually binds host interface and maps traffic |
| **Where** | Inside `Dockerfile` | On CLI or inside `compose.yaml` |
| **Effect** | Enables `-P` (random publish) | Makes container accessible at `http://host:8080` |

---

## Common Port Errors

- [Error: Port Already Allocated (`bind: address already in use`)](/errors/docker/port-already-allocated)
- [Error: Cannot Connect to Database](/errors/docker/cannot-connect-to-database)
