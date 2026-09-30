---
title: "docker system prune"
description: Reclaim host disk space by removing all unused containers, networks, images, and build cache.
category: devops
topic: docker
type: reference
level: intermediate
tags:
  - docker
  - cleanup
  - disk
  - prune
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## Command

<Command>docker system prune -a --volumes -f</Command>

---

## Short Description

`docker system prune` is the primary cleanup command in Docker. It removes stopped containers, unused networks, dangling images, and build caches to free up substantial gigabytes of disk space.

---

## Syntax

```bash
docker system prune [OPTIONS]
```

---

## Examples

### Standard Cleanup (Stopped containers + dangling images)

```bash
docker system prune
```

### Deep Cleanup (All unused images + unreferenced volumes)

```bash
docker system prune --all --volumes --force
```

---

## Flags & Options

| Flag | Shorthand | Description |
| :--- | :--- | :--- |
| `--all` | `-a` | Remove all unused images, not just dangling ones. |
| `--volumes` | | Prune unused named volumes as well. |
| `--force` | `-f` | Do not prompt for interactive confirmation. |

---

## Warnings

<Danger title="Persistent Volume Data Loss">
Adding the `--volumes` flag will permanently delete any Docker named volume not currently attached to a running container. Ensure your database dumps are backed up before running `--volumes`.
</Danger>
