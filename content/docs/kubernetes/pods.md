---
title: "Kubernetes Pods & Workload Basics"
description: "Understand Pods — the smallest deployable execution units in Kubernetes, shared networking, multi-container sidecars, init containers, and pod lifecycles."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - pods
  - containers
  - workloads
  - sidecars
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Pods & Workload Basics

A **Pod** is the smallest, most fundamental deployable computing unit in Kubernetes. A Pod encapsulates one or more application containers that share storage, network IP, and execution specifications.

---

## 1. What is Inside a Pod?

```
┌─────────────────────────────────────────────────────────────┐
│                        POD (IP: 10.244.1.42)                │
│                                                             │
│  Shared Network Namespace (localhost)                      │
│                                                             │
│  ┌─────────────────────────┐     ┌────────────────────────┐ │
│  │   Main App Container    │     │   Sidecar Container    │ │
│  │   (Next.js Web Server)  │     │   (Envoy Proxy / Logs) │ │
│  │   Port: 3000            │     │   Port: 9090           │ │
│  └────────────┬────────────┘     └───────────┬────────────┘ │
│               │                              │              │
│               ▼                              ▼              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                Shared Volume (emptyDir / PVC)          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

Containers within the same Pod:
- Share the **same IP address** and network port space.
- Communicate with each other via `localhost` (e.g., `http://localhost:3000`).
- Can mount and share the **same storage volumes**.

---

## 2. Pod Manifest Example

```yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-app
  labels:
    app: web
    tier: frontend
spec:
  containers:
    - name: nextjs-frontend
      image: node:22-alpine
      ports:
        - containerPort: 3000
      resources:
        requests:
          cpu: "250m"
          memory: "256Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"
      env:
        - name: NODE_ENV
          value: "production"
```

Apply the pod:
```bash
kubectl apply -f pod.yaml
kubectl get pods
```

---

## 3. Pod Lifecycle Phases

| Phase | Description |
| :--- | :--- |
| `Pending` | Pod accepted by the cluster, but one or more containers are not yet created (e.g., pulling images, waiting for scheduling). |
| `Running` | Pod bound to a node, all containers created, and at least one container is running or starting. |
| `Succeeded` | All containers in the Pod completed successfully and will not restart (e.g., a completed batch Job). |
| `Failed` | All containers terminated, and at least one container exited with a non-zero status. |
| `CrashLoopBackOff` | Container repeatedly starts, crashes, and Kubernetes applies an exponential backoff delay before restarting. |

---

## 4. Init Containers & Sidecars

### Init Containers
Run and complete sequentially before application containers start (e.g., waiting for database readiness or running schema migrations):

```yaml
spec:
  initContainers:
    - name: wait-for-db
      image: busybox:1.36
      command: ['sh', '-c', 'until nc -z postgres-service 5432; do sleep 2; done;']
  containers:
    - name: web-api
      image: my-app:1.0.0
```

> [!NOTE]
> In production, you rarely create standalone Pods directly. If a standalone Pod crashes or its host node dies, Kubernetes will **not** recreate it. Instead, manage Pods via **Deployments** or **StatefulSets**.
