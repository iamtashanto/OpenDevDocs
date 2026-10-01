---
title: "Deploy Node.js & PostgreSQL on Kubernetes"
description: "Deploy a Node.js API server connected to a persistent PostgreSQL database using PersistentVolumeClaims, Secrets, and internal ClusterIP networking."
category: devops
topic: kubernetes
type: recipe
level: intermediate
tags:
  - kubernetes
  - nodejs
  - postgresql
  - pvc
  - storage
platforms:
  - all
tested:
  kubernetes: "1.31"
  node: "22-alpine"
  postgres: "17-alpine"
lastVerified: "2026-10-01"
---

## Goal

Deploy a Node.js API backend connected to a dedicated PostgreSQL database with persistent storage, secure credentials, and internal cluster service discovery.

---

## Prerequisites

- Access to a Kubernetes cluster with a default StorageClass configured
- Node.js API container image (e.g. `ghcr.io/org/node-api:1.0.0`)

---

<Steps>
  <Step step={1} title="Create PostgreSQL Secret and Storage Claim (PVC)">
    Create database credentials and request 10Gi of persistent block storage:

    ```yaml
    # postgres-storage-secret.yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: postgres-secret
      namespace: default
    type: Opaque
    stringData:
      POSTGRES_DB: "production_db"
      POSTGRES_USER: "api_user"
      POSTGRES_PASSWORD: "secure_db_password_123"
    ---
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: postgres-pvc
      namespace: default
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 10Gi
    ```
  </Step>

  <Step step={2} title="Deploy PostgreSQL Database">
    Deploy PostgreSQL with persistent volume mount and internal ClusterIP Service:

    ```yaml
    # postgres-deployment-service.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: postgres
      namespace: default
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: postgres-db
      template:
        metadata:
          labels:
            app: postgres-db
        spec:
          containers:
            - name: postgres
              image: postgres:17-alpine
              ports:
                - containerPort: 5432
              envFrom:
                - secretRef:
                    name: postgres-secret
              volumeMounts:
                - name: postgres-storage
                  mountPath: /var/lib/postgresql/data
                  subPath: pgdata
              resources:
                requests:
                  cpu: "250m"
                  memory: "512Mi"
                limits:
                  cpu: "1000m"
                  memory: "1024Mi"
          volumes:
            - name: postgres-storage
              persistentVolumeClaim:
                claimName: postgres-pvc
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: postgres-service
      namespace: default
    spec:
      type: ClusterIP
      selector:
        app: postgres-db
      ports:
        - port: 5432
          targetPort: 5432
    ```
  </Step>

  <Step step={3} title="Deploy Node.js API Service">
    Deploy the Node.js API with an initContainer waiting for PostgreSQL readiness:

    ```yaml
    # node-api-deployment.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: node-api
      namespace: default
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: node-api
      template:
        metadata:
          labels:
            app: node-api
        spec:
          initContainers:
            - name: wait-for-postgres
              image: busybox:1.36
              command: ['sh', '-c', 'until nc -z -w 2 postgres-service 5432; do echo "Waiting for PostgreSQL..."; sleep 2; done;']
          containers:
            - name: node-api
              image: ghcr.io/org/node-api:1.0.0
              ports:
                - containerPort: 8080
              env:
                - name: PORT
                  value: "8080"
                - name: DATABASE_URL
                  value: "postgresql://api_user:secure_db_password_123@postgres-service:5432/production_db"
              resources:
                requests:
                  cpu: "100m"
                  memory: "128Mi"
                limits:
                  cpu: "500m"
                  memory: "512Mi"
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: node-api-service
      namespace: default
    spec:
      type: ClusterIP
      selector:
        app: node-api
      ports:
        - port: 80
          targetPort: 8080
    ```
  </Step>
</Steps>

---

## Verification

```bash
# Apply all manifests
kubectl apply -f postgres-storage-secret.yaml
kubectl apply -f postgres-deployment-service.yaml
kubectl apply -f node-api-deployment.yaml

# Check pods status
kubectl get pods

# Test internal connection via port-forward
kubectl port-forward svc/node-api-service 8080:80
```

---

## Related Topics

- [Kubernetes Persistent Storage](/docs/kubernetes/volumes-and-storage)
- [Kubernetes Services](/docs/kubernetes/services)
- [Kubernetes Secrets](/docs/kubernetes/secrets)
