---
title: "Kubernetes ConfigMaps"
description: "Decouple non-sensitive configuration parameters, environment variables, and config files from container images using Kubernetes ConfigMaps."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - configmaps
  - configuration
  - env-vars
  - 12-factor
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes ConfigMaps

A **ConfigMap** is an API object used to store non-confidential configuration data as key-value pairs. ConfigMaps allow you to decouple application configuration from container images, following 12-Factor App principles.

---

## 1. Creating a ConfigMap

### Declarative YAML Manifest
```yaml
# app-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-settings
  namespace: default
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  PORT: "8080"
  app-config.json: |
    {
      "featureFlags": {
        "newDashboard": true,
        "betaCheckout": false
      }
    }
```

Apply the ConfigMap:
```bash
kubectl apply -f app-config.yaml
```

---

## 2. Consuming ConfigMaps in Pods

### 2.1 As Specific Environment Variables (`configMapKeyRef`)
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-pod
spec:
  containers:
    - name: api
      image: my-api:latest
      env:
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-settings
              key: LOG_LEVEL
```

### 2.2 As Bulk Environment Variables (`envFrom`)
Injects all keys in the ConfigMap as environment variables:
```yaml
spec:
  containers:
    - name: api
      image: my-api:latest
      envFrom:
        - configMapRef:
            name: app-settings
```

### 2.3 Mounted as Files via Volume Mounts
Mounts `app-config.json` into `/etc/config/app-config.json`:
```yaml
spec:
  containers:
    - name: api
      image: my-api:latest
      volumeMounts:
        - name: config-vol
          mountPath: /etc/config
          readOnly: true
  volumes:
    - name: config-vol
      configMap:
        name: app-settings
```
