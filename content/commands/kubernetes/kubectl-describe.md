---
title: "kubectl describe"
description: Show detailed state, configuration, controller bindings, and diagnostic events for a specific Kubernetes resource.
category: devops
topic: kubernetes
type: reference
level: beginner
tags:
  - kubernetes
  - kubectl
  - describe
  - events
  - debugging
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Command

<Command>kubectl describe pod web-app-559d7b489d-abc12</Command>

---

## Short Description

`kubectl describe` produces a detailed human-readable summary of a resource, including container specifications, volume mounts, conditions, and the critical **Events** timeline.

---

## Syntax

```bash
kubectl describe <resource_type> <resource_name> [-n <namespace>]
```

---

## Examples

### 1. Diagnose a Failing Pod
```bash
kubectl describe pod api-server-7f89c66bc-xyz89
```

### 2. Inspect Node Capacity and Health Conditions
```bash
kubectl describe node node-worker-01
```

### 3. Inspect Service Endpoints and Port Mappings
```bash
kubectl describe svc backend-api-service
```

---

## What to Look For

- **Events (at the bottom)**: Shows container pulling errors (`ErrImagePull`), probe failures, and scheduling decisions.
- **State & Reason**: Explains why a container crashed (`OOMKilled`, `CrashLoopBackOff`, `Exit Code`).
- **Conditions**: `Initialized`, `Ready`, `ContainersReady`, `PodScheduled`.

---

## Related Topics

- [Kubernetes Troubleshooting](/docs/kubernetes/troubleshooting)
- [kubectl get](/commands/kubernetes/kubectl-get)
- [kubectl logs](/commands/kubernetes/kubectl-logs)
