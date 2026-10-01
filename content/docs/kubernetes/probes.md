---
title: "Kubernetes Probes & Health Checks"
description: "Configure Startup, Liveness, and Readiness probes to guarantee high availability, self-healing, and zero-downtime traffic routing."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - probes
  - health-checks
  - liveness
  - readiness
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Probes & Health Checks

Probes are diagnostic health checks performed periodically by the `kubelet` on running containers.

---

## 1. The Three Probe Types

| Probe | Purpose | Failure Action |
| :--- | :--- | :--- |
| **`startupProbe`** | Determines if a slow-starting application has finished initialization. | Kills and restarts the container if it exceeds `failureThreshold`. |
| **`livenessProbe`** | Determines if the container is still alive (e.g. not deadlocked or hung). | **Restarts the container**. |
| **`readinessProbe`**| Determines if the container is ready to accept user network requests. | **Removes Pod from Service Endpoints** (stops sending traffic; container stays alive). |

---

## 2. Probe Configuration Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: nextjs
          image: my-app:1.0.0
          ports:
            - containerPort: 3000

          # 1. Startup Probe: Allows up to 30s for Next.js to compile initial bundle
          startupProbe:
            httpGet:
              path: /api/healthz
              port: 3000
            failureThreshold: 30
            periodSeconds: 1

          # 2. Readiness Probe: Checks if app can handle incoming traffic
          readinessProbe:
            httpGet:
              path: /api/ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 2
            failureThreshold: 3

          # 3. Liveness Probe: Restarts container if hung or in infinite deadlock
          livenessProbe:
            httpGet:
              path: /api/healthz
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 3
```

---

## 3. Check Mechanisms

- **`httpGet`**: Sends an HTTP GET request; 200–399 is considered healthy.
- **`tcpSocket`**: Attempts to open a TCP socket connection on the specified port.
- **`exec`**: Runs an arbitrary command inside the container; exit code `0` is healthy.
