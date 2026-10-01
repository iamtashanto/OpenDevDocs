---
title: "Kubernetes Logs, Exec & Debugging"
description: "Stream container logs, debug previous crashed containers, open interactive shells with kubectl exec, copy files, and port-forward to local ports."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - logs
  - exec
  - debugging
  - port-forward
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Logs, Exec & Debugging

Diagnosing running applications and investigating runtime errors requires using `kubectl logs`, `exec`, and `port-forward`.

---

## 1. Inspecting Container Logs (`kubectl logs`)

### Stream Live Logs
```bash
kubectl logs -f api-deployment-559d7b489d-abc12
```

### View Logs from a Crashed Container Instance (`--previous`)
When a container dies and enters `CrashLoopBackOff`, the normal logs command shows the new fresh container. Use `--previous` to see why the previous container crashed:
```bash
kubectl logs -p api-deployment-559d7b489d-abc12
```

### Target a Specific Container in Multi-Container Pods
```bash
kubectl logs api-pod -c sidecar-logger
```

### Stream Combined Logs Across All Pods with a Label
```bash
kubectl logs -f -l app=backend-api --all-containers=true --tail=50
```

---

## 2. Interactive Terminal Access (`kubectl exec`)

Open an interactive shell inside a running container:

```bash
# Standard interactive shell
kubectl exec -it api-deployment-559d7b489d-abc12 -- /bin/sh

# If bash is installed
kubectl exec -it api-deployment-559d7b489d-abc12 -- /bin/bash

# Run one-off command without interactive shell
kubectl exec api-deployment-559d7b489d-abc12 -- env
```

---

## 3. Port Forwarding (`kubectl port-forward`)

Access internal cluster services and pods directly on your local `localhost` workstation without exposing them publicly:

```bash
# Forward local port 8080 to internal Pod port 3000
kubectl port-forward pod/web-app-abc12 8080:3000

# Forward local port 5432 to PostgreSQL Service
kubectl port-forward svc/postgres-service 5432:5432
```
Now visit `http://localhost:8080` in your local browser or connect your local database GUI.

---

## 4. Copying Files (`kubectl cp`)

```bash
# Copy local file into running Pod container
kubectl cp ./config.json api-pod:/app/config.json

# Copy log file from Pod to local machine
kubectl cp api-pod:/var/log/app.log ./downloaded-app.log
```
