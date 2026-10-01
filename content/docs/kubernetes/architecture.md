---
title: "Kubernetes Architecture & Components"
description: "Deep dive into Kubernetes architecture — Control Plane components (API Server, etcd, Scheduler, Controllers) and Worker Node agents (Kubelet, Kube-proxy, Containerd)."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - architecture
  - control-plane
  - kubelet
  - etcd
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Architecture & Components

A Kubernetes cluster is divided into two primary operational layers: the **Control Plane** (the brain) and **Worker Nodes** (where your application workloads run).

---

## 1. Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                         CONTROL PLANE (MASTER)                         │
│                                                                        │
│   ┌──────────────┐         ┌───────────────┐     ┌────────────────┐    │
│   │ kube-scheduler│ ◄─────► │ kube-apiserver│ ◄──►│      etcd      │    │
│   └──────────────┘         └───────┬───────┘     │ (Cluster State)│    │
│                                    │             └────────────────┘    │
│                            ┌───────▼──────────────┐                    │
│                            │kube-controller-manager│                    │
│                            └──────────────────────┘                    │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ (HTTPS / TLS)
          ┌──────────────────────────┴──────────────────────────┐
          ▼                                                     ▼
┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│          WORKER NODE 1            │ │          WORKER NODE 2            │
│ ┌───────────────┐ ┌─────────────┐ │ │ ┌───────────────┐ ┌─────────────┐ │
│ │    kubelet    │ │  kube-proxy │ │ │ │    kubelet    │ │  kube-proxy │ │
│ └───────┬───────┘ └─────────────┘ │ │ └───────┬───────┘ └─────────────┘ │
│         ▼                         │ │         ▼                         │
│ ┌───────────────────────────────┐ │ │ ┌───────────────────────────────┐ │
│ │ Container Runtime (containerd)│ │ │ │ Container Runtime (containerd)│ │
│ │  ┌─────────┐   ┌─────────┐    │ │ │ │  ┌─────────┐   ┌─────────┐    │ │
│ │  │  Pod A  │   │  Pod B  │    │ │ │ │  │  Pod C  │   │  Pod D  │    │ │
│ │  └─────────┘   └─────────┘    │ │ │ │  └─────────┘   └─────────┘    │ │
│ └───────────────────────────────┘ │ │ └───────────────────────────────┘ │
└───────────────────────────────────┘ └───────────────────────────────────┘
```

---

## 2. Control Plane Components

The control plane makes global decisions about the cluster (such as scheduling), detecting events, and responding to failures.

### 2.1 `kube-apiserver`
- The central REST API gateway for the entire cluster.
- All communications (from users via `kubectl`, worker nodes via `kubelet`, and controllers) pass through the API server.
- Handles authentication, authorization (RBAC), and schema validation.

### 2.2 `etcd`
- Consistent, highly-available distributed key-value store.
- Holds the authoritative state of the entire cluster (every Pod, Service, Secret, and Deployment).
- Direct access is restricted exclusively to `kube-apiserver`.

### 2.3 `kube-scheduler`
- Watches for newly created Pods that have no assigned node.
- Selects the most optimal Worker Node for the Pod based on resource requirements (CPU/RAM requests), affinity rules, taints, and tolerations.

### 2.4 `kube-controller-manager`
- Runs continuous control loops (reconciliation loops) that compare desired state with current state:
  - **Node Controller**: Detects when worker nodes go offline.
  - **Deployment / ReplicaSet Controller**: Ensures the correct number of pod replicas are alive.
  - **EndpointSlice Controller**: Populates endpoints linking Services to active Pod IPs.

---

## 3. Worker Node Components

Worker nodes host the application pods and execute container processes.

### 3.1 `kubelet`
- The primary agent running on each worker node.
- Receives `PodSpec` instructions from the `kube-apiserver` and ensures that the containers described in those PodSpecs are running and healthy.
- Executes liveness and readiness health checks.

### 3.2 `kube-proxy`
- Maintains network routing rules (using `iptables` or `IPVS`) on each node.
- Translates virtual Service ClusterIPs to individual live Pod IP addresses, enabling load-balanced communication across the cluster.

### 3.3 Container Runtime
- The underlying container engine that pulls container images, creates Linux namespaces/cgroups, and runs containers (standard: **containerd** or **CRI-O** via the Container Runtime Interface).
