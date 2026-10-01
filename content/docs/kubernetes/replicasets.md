---
title: "Kubernetes ReplicaSets"
description: "Understand ReplicaSets — the low-level controller maintaining a stable set of replica Pods, label selectors, and self-healing mechanics."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - replicasets
  - pods
  - controllers
  - self-healing
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes ReplicaSets

A **ReplicaSet** is a controller whose primary purpose is to maintain a stable set of replica Pods running at any given time. It acts as the self-healing engine behind Deployments.

---

## 1. The Relationship: Deployment -> ReplicaSet -> Pod

```
┌───────────────────────────────────────────────┐
│         Deployment (api-deployment)           │
│  Manages declarative rollout strategy         │
└───────────────────────┬───────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│  ReplicaSet (Old: v1)   │   │  ReplicaSet (New: v2)   │
│  Desired: 0 / Current: 0│   │  Desired: 3 / Current: 3│
└─────────────────────────┘   └────────────┬────────────┘
                                           │
                        ┌──────────────────┼──────────────────┐
                        ▼                  ▼                  ▼
                   ┌─────────┐        ┌─────────┐        ┌─────────┐
                   │  Pod 1  │        │  Pod 2  │        │  Pod 3  │
                   └─────────┘        └─────────┘        └─────────┘
```

> [!NOTE]
> In day-to-day Kubernetes management, you will almost never create `ReplicaSet` objects directly. Instead, create a **Deployment**, which automatically creates, manages, and scales underlying ReplicaSets during version rollouts.

---

## 2. How ReplicaSets Match Pods

ReplicaSets identify which Pods they own using label selectors (`matchLabels`):

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend-rs
  labels:
    app: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: web
  template:
    metadata:
      labels:
        tier: web
    spec:
      containers:
        - name: nginx
          image: nginx:1.27-alpine
```

---

## 3. Inspecting ReplicaSets

View all active ReplicaSets:

```bash
kubectl get replicasets
# or short alias:
kubectl get rs
```

Output:
```text
NAME                        DESIRED   CURRENT   READY   AGE
api-deployment-559d7b489d   3         3         3       12m
api-deployment-7f89c66bc    0         0         0       45m
```
- `DESIRED`: Target replica count defined in the Deployment.
- `CURRENT`: Total Pods currently created.
- `READY`: Pods that have passed readiness probes and can receive traffic.
