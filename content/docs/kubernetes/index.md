---
title: "Kubernetes Overview & Fundamentals"
description: "Introduction to Kubernetes (K8s) — the production-grade container orchestration system for automating application deployment, scaling, and management."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - k8s
  - devops
  - containers
  - orchestration
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Overview & Fundamentals

**Kubernetes** (often abbreviated as **K8s**) is an open-source container orchestration platform designed to automate deploying, scaling, and operating application containers across clusters of host machines.

---

## 1. What Problem Does Kubernetes Solve?

When running Docker containers on a single virtual machine or VPS, you encounter fundamental production challenges:

```
┌─────────────────────────────────────────────────────────────┐
│                    Single Docker Host                       │
│  ❌ If host crashes -> All containers go down               │
│  ❌ Manual scaling -> Must SSH and run docker run manually │
│  ❌ Zero-downtime updates -> Difficult port switching       │
│  ❌ Traffic balancing -> Requires manual Nginx configs      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Kubernetes Cluster Orchestration            │
│  ✅ Self-Healing: Restarts failed containers automatically  │
│  ✅ Auto-Scaling: Scales pods up/down based on CPU & traffic │
│  ✅ Declarative Desired State: "Keep 5 replicas running"    │
│  ✅ Service Discovery & Load Balancing: Built-in DNS        │
│  ✅ Rolling Updates & Instant Rollbacks: Zero downtime      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Core Architectural Philosophy: Declarative State

Unlike imperative scripts where you issue step-by-step commands (`install`, `start`, `restart`), Kubernetes operates on **Declarative Desired State**:

1. You define the **Desired State** in YAML manifest files (e.g., *"Run 3 replicas of the web app on port 3000"*).
2. You submit the YAML to the **Kubernetes API Server**.
3. **Control loops (Controllers)** continuously compare the **Current State** with the **Desired State** and take corrective actions (reconciling drift) automatically.

---

## 3. High-Level Concept Map

```
┌──────────────────────────────────────────────────────────┐
│                   Kubernetes Cluster                     │
│                                                          │
│  [ Ingress ] (Routes domain traffic: docs.tashanto.com)  │
│       │                                                  │
│       ▼                                                  │
│  [ Service ] (Stable Virtual IP & Load Balancer)         │
│       │                                                  │
│       ▼                                                  │
│  [ Deployment / ReplicaSet ]                             │
│       ├── [ Pod 1 ] (Container + Storage + IP)           │
│       ├── [ Pod 2 ] (Container + Storage + IP)           │
│       └── [ Pod 3 ] (Container + Storage + IP)           │
│                                                          │
│  Config: [ ConfigMap ] & [ Secret ]                      │
│  Storage: [ PersistentVolumeClaim ]                      │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Documentation Map

- [Architecture & Control Plane](/docs/kubernetes/architecture)
- [Cluster & Nodes](/docs/kubernetes/cluster-and-nodes)
- [Pods & Workloads](/docs/kubernetes/pods)
- [Deployments & Rollouts](/docs/kubernetes/deployments)
- [Services & Networking](/docs/kubernetes/services)
- [ConfigMaps & Secrets](/docs/kubernetes/configmaps)
- [Troubleshooting & Diagnostics](/docs/kubernetes/troubleshooting)
