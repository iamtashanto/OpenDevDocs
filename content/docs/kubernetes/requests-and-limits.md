---
title: "Kubernetes Resource Requests & Limits"
description: "Master CPU and memory resource management in Kubernetes — requests, limits, CPU throttling, OOMKilled exit code 137, and QoS classes."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - resources
  - requests
  - limits
  - oomkilled
  - qos
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Resource Requests & Limits

Configuring compute resource constraints prevents individual containers from starving other workloads of CPU and memory on shared cluster nodes.

---

## 1. Requests vs Limits

| Dimension | `requests` (Minimum Guaranteed) | `limits` (Maximum Ceiling) |
| :--- | :--- | :--- |
| **Scheduler** | Used by `kube-scheduler` to find a Node with sufficient free capacity. | Ignored by scheduler during node placement. |
| **Enforcement** | Guaranteed resource allocation. | Hard boundary enforced by the Linux kernel (`cgroups`). |
| **Exceeding CPU** | Application consumes excess available node CPU. | **CPU Throttling**: CPU clock cycles are throttled; process is NOT killed. |
| **Exceeding Memory** | Application allocates beyond requested memory. | **OOMKilled (137)**: Linux kernel terminates the container immediately. |

---

## 2. Resource Units

- **CPU**: Measured in millicores (`m`):
  - `1000m` = `1` full vCPU / core.
  - `250m` = 0.25 vCPU (25% of one CPU core).
- **Memory**: Measured in binary mebibytes (`Mi`) or gibibytes (`Gi`):
  - `256Mi` = 256 Mebibytes ($256 \times 1024 \times 1024$ bytes).
  - `2Gi` = 2 Gibibytes.

---

## 3. Pod Specification Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-worker
spec:
  containers:
    - name: app
      image: node:22-alpine
      resources:
        requests:
          cpu: "200m"      # 0.2 CPU core
          memory: "256Mi"  # 256 MB RAM
        limits:
          cpu: "1000m"     # 1 full CPU core max
          memory: "512Mi"  # 512 MB RAM max (OOMKilled if exceeded)
```

---

## 4. Quality of Service (QoS) Classes

Kubernetes classifies Pods into three QoS tiers to decide termination priority during node memory exhaustion:

```
┌────────────────────────────────────────────────────────┐
│  1. Guaranteed: requests == limits (Highest Priority)  │
│  2. Burstable: requests < limits                       │
│  3. BestEffort: No requests/limits (Evicted First!)   │
└────────────────────────────────────────────────────────┘
```
