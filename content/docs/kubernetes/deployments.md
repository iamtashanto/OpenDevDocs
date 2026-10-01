---
title: "Kubernetes Deployments & Rollouts"
description: "Master Kubernetes Deployments — declarative desired state management, zero-downtime rolling updates, revisions, and rollbacks for stateless applications."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - deployments
  - rollouts
  - scaling
  - rolling-update
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Deployments & Rollouts

A **Deployment** is a high-level Kubernetes controller that declaratively manages **Pods** and **ReplicaSets**. It provides automated self-healing, scaling, and zero-downtime rolling updates for stateless applications.

---

## 1. Complete Deployment Manifest

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  labels:
    app: api-server
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Can create 1 extra pod during rollout (total: 4)
      maxUnavailable: 0  # 0 pods can be down during update (100% uptime)
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
        - name: api-server
          image: ghcr.io/org/api:v1.2.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
```

Apply the deployment:
```bash
kubectl apply -f deployment.yaml
```

---

## 2. How Rolling Updates Work

```
Step 1 (Active v1):  [Pod v1]  [Pod v1]  [Pod v1]
Step 2 (Surge v2):   [Pod v1]  [Pod v1]  [Pod v1]  + [Pod v2 (Starting)]
Step 3 (Ready v2):   [Pod v1]  [Pod v1]  [Terminated] + [Pod v2 (Live)]
Step 4 (Progress):   [Pod v1]  [Terminated] + [Pod v2 (Live)] [Pod v2 (Live)]
Step 5 (Finished):   [Pod v2]  [Pod v2]  [Pod v2]
```

---

## 3. Managing Rollouts with `kubectl`

### Update Container Image
```bash
kubectl set image deployment/api-deployment api-server=ghcr.io/org/api:v1.3.0
```

### Check Rollout Status in Real-Time
```bash
kubectl rollout status deployment/api-deployment
```

### View Rollout Revision History
```bash
kubectl rollout history deployment/api-deployment
```

### Instantly Roll Back to Previous Revision
```bash
kubectl rollout undo deployment/api-deployment
```

Or roll back to a specific revision:
```bash
kubectl rollout undo deployment/api-deployment --to-revision=2
```

---

## 4. Scaling Pods

### Declarative Scaling
Update `replicas: 5` in `deployment.yaml` and run `kubectl apply -f deployment.yaml`.

### Imperative Scaling
```bash
kubectl scale deployment api-deployment --replicas=5
```
