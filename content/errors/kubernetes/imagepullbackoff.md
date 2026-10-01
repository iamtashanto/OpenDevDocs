---
title: "Kubernetes Error: ImagePullBackOff / ErrImagePull"
description: Fix ImagePullBackOff and ErrImagePull errors caused by non-existent container images, invalid tags, private registry authorization failures, or rate limits.
category: devops
topic: kubernetes
type: troubleshooting
level: beginner
tags:
  - kubernetes
  - imagepullbackoff
  - errimagepull
  - docker-registry
  - errors
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Symptoms

- `kubectl get pods` shows status `ImagePullBackOff` or `ErrImagePull`.
- `RESTARTS` count is 0.
- Pod is stuck in `Pending` or `Waiting` phase.

---

## Why It Happens

The worker node's container runtime (containerd/CRI-O) tried to pull the specified image from a container registry (Docker Hub, GitHub Container Registry, AWS ECR) and failed.

Common causes:
1. **Typo in image repository or tag**: Image or version tag does not exist (e.g. `nginx:1.999-alpine`).
2. **Missing Private Registry Credentials**: The image is private and the cluster lacks `imagePullSecrets`.
3. **Docker Hub Rate Limit**: Exceeded anonymous pull rate limits (100 pulls per 6 hours).
4. **Network connectivity or DNS failure**: Worker node cannot resolve external registry hostnames.

---

## How to Diagnose

<Steps>
  <Step step={1} title="Inspect Pod Events">
    ```bash
    kubectl describe pod <pod-name>
    ```

    Look at the **Events** table at the bottom of the output:
    ```text
    Failed to pull image "ghcr.io/org/private-app:v1.0.0": rpc error: code = Unknown desc = failed to pull and unpack image: failed to resolve reference: unexpected status from HEAD request: 401 Unauthorized
    ```
  </Step>
</Steps>

---

## Solutions & Fixes

### 1. Fix Image Name and Tag
Verify the exact image name and tag exists on the container registry:

```yaml
spec:
  containers:
    - name: web
      # Ensure image name and tag are spelled correctly
      image: ghcr.io/my-org/my-app:1.2.0
```

### 2. Configure `imagePullSecrets` for Private Registries

#### Step 1: Create a Docker Registry Secret
```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN \
  --docker-email=user@example.com
```

#### Step 2: Attach Secret to Pod or Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    spec:
      imagePullSecrets:
        - name: ghcr-secret
      containers:
        - name: private-api
          image: ghcr.io/my-org/private-app:v1.0.0
```

---

## Related Topics

- [Kubernetes Pods & Workload Basics](/docs/kubernetes/pods)
- [Kubernetes Secrets](/docs/kubernetes/secrets)
