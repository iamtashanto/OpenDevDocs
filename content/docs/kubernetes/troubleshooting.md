---
title: "Kubernetes Troubleshooting & Diagnostics Guide"
description: "A systematic troubleshooting methodology and decision tree for debugging CrashLoopBackOff, ImagePullBackOff, Pending pods, and Service routing failures."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - troubleshooting
  - debugging
  - crashloopbackoff
  - imagepullbackoff
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Troubleshooting & Diagnostics Guide

When things go wrong in a Kubernetes cluster, follow a systematic diagnostic triage process from the cluster layer down to the container logs.

---

## 1. The 4-Step Diagnostic Workflow

```
[ Step 1: Check Pod Status ] ──► kubectl get pods -o wide
              │
              ▼
[ Step 2: Read Cluster Events ] ──► kubectl describe pod <pod-name>
              │
              ▼
[ Step 3: Check Application Logs ] ──► kubectl logs <pod-name> (--previous)
              │
              ▼
[ Step 4: Inspect Networking ] ──► kubectl get endpoints <service-name>
```

---

## 2. Troubleshooting Decision Tree

### Scenario A: Pod is Stuck in `Pending`
1. **Diagnosis**: Pod cannot be scheduled onto any worker node.
2. **Action**: Run `kubectl describe pod <pod-name>` and look at the bottom **Events** section.
3. **Common Causes**:
   - `0/3 nodes are available: insufficient cpu/memory`: Cluster nodes do not have enough unallocated allocatable resources to satisfy `requests`.
   - `PersistentVolumeClaim is not bound`: Waiting for storage provisioner or PV.
   - `NodeSelector / NodeAffinity mismatch`: No nodes match the specified label.

---

### Scenario B: Pod in `CrashLoopBackOff`
1. **Diagnosis**: Container starts, exits with an error code, and kubelet restarts it with increasing backoff delays.
2. **Action**:
   ```bash
   # Check logs of the previous crashed instance:
   kubectl logs <pod-name> --previous
   ```
3. **Common Causes**:
   - Application threw an uncaught error at startup (e.g. missing `DATABASE_URL` environment variable).
   - Database connection refused.
   - Liveness probe is failing or initial delay is too short.

---

### Scenario C: Pod in `ImagePullBackOff` or `ErrImagePull`
1. **Diagnosis**: Container runtime cannot pull the container image from the registry.
2. **Common Causes**:
   - Typo in image repository name or version tag (e.g. `node:99-alpine`).
   - Private registry credentials missing: You need to specify `imagePullSecrets: [{name: regcred}]`.

---

### Scenario D: Pod is `OOMKilled` (Exit Code 137)
1. **Diagnosis**: Container consumed more RAM than allowed by `resources.limits.memory`.
2. **Action**: Check `kubectl describe pod <pod-name>`:
   ```text
   State:          Terminated
     Reason:       OOMKilled
     Exit Code:    137
   ```
3. **Fix**: Increase memory limits in the PodSpec or profile memory leaks in application code.

---

### Scenario E: Service Returns 503 or Requests Hang
1. **Diagnosis**: Traffic reaching the Service is not routing to backend Pods.
2. **Action**: Check if the Service has active registered endpoints:
   ```bash
   kubectl get endpoints <service-name>
   ```
   If `ENDPOINTS: <none>`:
   - Verify `spec.selector` in Service YAML matches `spec.template.metadata.labels` in Deployment YAML.
   - Verify Pods are passing their `readinessProbe`.
