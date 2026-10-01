---
title: "kubectl rollout"
description: Manage and observe deployment rollouts, track revision histories, pause/resume updates, and perform instant zero-downtime rollbacks.
category: devops
topic: kubernetes
type: reference
level: intermediate
tags:
  - kubernetes
  - kubectl
  - rollout
  - updates
  - rollback
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Command

<Command>kubectl rollout status deployment/web-app</Command>

---

## Short Description

`kubectl rollout` manages the rollout lifecycle of Deployments, StatefulSets, and DaemonSets, providing real-time status monitoring, pause/resume controls, and revision rollbacks.

---

## Syntax

```bash
kubectl rollout SUBCOMMAND (TYPE NAME | TYPE/NAME) [FLAGS]
```

---

## Subcommands & Examples

### 1. Check Rollout Status
```bash
kubectl rollout status deployment/api-server
```

### 2. View Revision History
```bash
kubectl rollout history deployment/api-server
```

### 3. Roll Back to Previous Revision
```bash
kubectl rollout undo deployment/api-server
```

### 4. Roll Back to Specific Revision
```bash
kubectl rollout undo deployment/api-server --to-revision=3
```

### 5. Restart All Pods (Graceful Rolling Restart)
```bash
kubectl rollout restart deployment/api-server
```

---

## Related Topics

- [Kubernetes Deployments & Rollouts](/docs/kubernetes/deployments)
- [Kubernetes Rollouts & Scaling](/docs/kubernetes/rollouts-and-scaling)
