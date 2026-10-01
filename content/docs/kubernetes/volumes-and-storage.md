---
title: "Kubernetes Volumes & Persistent Storage"
description: "Master Kubernetes storage — ephemeral emptyDir volumes, PersistentVolumes (PV), PersistentVolumeClaims (PVC), and dynamic StorageClasses."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - storage
  - volumes
  - persistent-volume
  - pvc
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Volumes & Persistent Storage

By default, data stored in a container filesystem is ephemeral: if the container crashes, the kubelet restarts it with a clean slate. Kubernetes provides **Volumes** to persist state across container restarts and pod lifecycles.

---

## 1. Storage Architecture: PV, PVC, and StorageClass

```
┌──────────────────────────────────────────────┐
│        StorageClass (e.g. AWS gp3 / SSD)     │
│        (Dynamic Cloud Storage Provisioner)   │
└──────────────────────┬───────────────────────┘
                       │ (Provisions)
                       ▼
┌──────────────────────────────────────────────┐
│        PersistentVolume (PV)                 │
│        (20Gi Network Block Storage EBS/Disk) │
└──────────────────────┬───────────────────────┘
                       │ (Binds to)
                       ▼
┌──────────────────────────────────────────────┐
│        PersistentVolumeClaim (PVC)           │
│        (Developer Request: "I need 20Gi")    │
└──────────────────────┬───────────────────────┘
                       │ (Mounted into)
                       ▼
┌──────────────────────────────────────────────┐
│        Pod / StatefulSet Workload            │
│        (/var/lib/postgresql/data)            │
└──────────────────────────────────────────────┘
```

---

## 2. Storage Access Modes

| Access Mode | CLI Abbr | Description | Common Backing Storage |
| :--- | :--- | :--- | :--- |
| **ReadWriteOnce** | `RWO` | Volume can be mounted as read-write by a **single node**. | AWS EBS, Google Persistent Disk |
| **ReadOnlyMany** | `ROX` | Volume can be mounted read-only by **many nodes**. | Read-only NFS |
| **ReadWriteMany** | `RWX` | Volume can be mounted as read-write by **many nodes concurrently**. | AWS EFS, NFS, CephFS |

---

## 3. Creating a PersistentVolumeClaim (PVC)

```yaml
# postgres-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-storage-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: standard # Uses default cluster dynamic storage class
```

---

## 4. Mounting PVC into a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres-db
spec:
  containers:
    - name: postgres
      image: postgres:17-alpine
      volumeMounts:
        - name: db-data
          mountPath: /var/lib/postgresql/data
  volumes:
    - name: db-data
      persistentVolumeClaim:
        claimName: postgres-storage-pvc
```

---

## 5. Ephemeral Volumes (`emptyDir`)

An `emptyDir` is created when a Pod is assigned to a Node. It exists for the lifetime of that Pod on that Node (useful for scratch caches and sharing files between sidecar containers):

```yaml
volumes:
  - name: cache-volume
    emptyDir: {}
```
