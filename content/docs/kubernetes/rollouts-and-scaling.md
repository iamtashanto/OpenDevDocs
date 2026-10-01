---
title: "Kubernetes Rollouts & Autoscaling (HPA)"
description: "Manage deployment rollouts, zero-downtime updates, revision histories, manual scaling, and dynamic Horizontal Pod Autoscaling (HPA)."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - rollouts
  - scaling
  - hpa
  - autoscaling
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Rollouts & Autoscaling (HPA)

Managing production application lifecycles requires coordinating software updates and scaling replicas dynamically based on user demand.

---

## 1. Rollout Management Commands

```bash
# Check rollout progress
kubectl rollout status deployment/web-app

# Pause a rollout midway (e.g. for canary testing)
kubectl rollout pause deployment/web-app

# Resume paused rollout
kubectl rollout resume deployment/web-app

# View revision history
kubectl rollout history deployment/web-app

# Roll back to immediate previous version
kubectl rollout undo deployment/web-app

# Restart all pods gracefully without changing image (rolling restart)
kubectl rollout restart deployment/web-app
```

---

## 2. Manual Scaling

Scale replica counts instantly:

```bash
kubectl scale deployment web-app --replicas=10
```

---

## 3. Horizontal Pod Autoscaler (HPA)

The **Horizontal Pod Autoscaler** automatically increases or decreases the number of Pod replicas based on observed CPU utilization, memory consumption, or custom application metrics.

> [!IMPORTANT]
> HPA requires `metrics-server` installed in the cluster and explicit `resources.requests.cpu` configured in the Deployment PodSpec.

### 3.1 Declarative HPA Manifest
```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
  namespace: default
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 75
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### 3.2 Monitoring Autoscaling
```bash
kubectl get hpa
```

Output:
```text
NAME          REFERENCE            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
web-app-hpa   Deployment/web-app   42%/75%, 65%/80% 2         10        3          4d
```
