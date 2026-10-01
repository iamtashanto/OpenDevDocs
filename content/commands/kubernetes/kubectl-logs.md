---
title: "kubectl logs"
description: Print or stream standard output (stdout) and standard error (stderr) logs from containers running inside a Kubernetes Pod.
category: devops
topic: kubernetes
type: reference
level: beginner
tags:
  - kubernetes
  - kubectl
  - logs
  - stdout
  - debugging
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Command

<Command>kubectl logs -f deployment/api-server --tail=100</Command>

---

## Short Description

`kubectl logs` retrieves standard output (`stdout`) and standard error (`stderr`) streams from containers in a Pod or workload controller.

---

## Syntax

```bash
kubectl logs [-f] [-p] (POD | TYPE/NAME) [-c CONTAINER] [FLAGS]
```

---

## Examples

### 1. Stream Live Logs from a Pod
```bash
kubectl logs -f web-app-559d7b489d-abc12
```

### 2. View Logs from the Previous Crashed Container
```bash
kubectl logs -p web-app-559d7b489d-abc12
```

### 3. Log a Specific Container in a Multi-Container Pod
```bash
kubectl logs web-app-abc12 -c envoy-proxy
```

### 4. Stream Logs from All Pods Matching a Label
```bash
kubectl logs -f -l app=backend-api --all-containers=true
```

---

## Common Options

| Option | Shorthand | Description |
| :--- | :--- | :--- |
| `--follow` | `-f` | Stream logs in real time as they arrive. |
| `--previous` | `-p` | Print logs for the previously terminated container instance. |
| `--tail` | | Lines of recent log file to display (e.g. `--tail=50`). |
| `--since` | | Show logs written since a duration (e.g. `--since=1h` or `--since=15m`). |
| `--timestamps` | | Prefix each log line with an RFC3339 timestamp. |

---

## Related Topics

- [Kubernetes Logs & Exec](/docs/kubernetes/logs-and-exec)
- [CrashLoopBackOff Error Guide](/errors/kubernetes/crashloopbackoff)
