---
title: "Container & Kubernetes Networking Fundamentals"
description: Understand Docker bridge and host networks, veth pairs, iptables packet forwarding, Kubernetes CNI plugins, and Service Mesh.
category: devops
topic: devops-networking
type: concept
level: intermediate
tags:
  - devops
  - docker
  - kubernetes
  - cni
  - container-networking
platforms:
  - linux
tested:
  docker: "27.x"
  kubernetes: "1.30.x"
lastVerified: "2026-09-30"
---

## 1. Docker Network Drivers

| Driver | Description | Use Case |
| :--- | :--- | :--- |
| **`bridge` (Default)** | Creates a private virtual software bridge (`docker0`). Containers get private IPs (`172.17.0.x`) and communicate via port mapping (`-p 3000:3000`). | Standalone multi-container apps on single host |
| **`host`** | Bypasses network isolation; container shares host machine's network stack directly. | Maximum network throughput ($>10\text{Gbps}$), low latency |
| **`overlay`** | Multi-host distributed network connecting Docker Swarm nodes across different physical machines. | Multi-host container clustering |
| **`none`** | Disables all external networking (loopback interface only). | Isolated batch computation / security sandboxes |

---

## 2. How Docker Bridge Networking Works

```
[ Container 1 (172.17.0.2) ]          [ Container 2 (172.17.0.3) ]
             │ (eth0)                              │ (eth0)
             ▼                                     ▼
        (veth_abc123)                         (veth_def456)
             └──────────────────┬──────────────────┘
                                ▼
                   [ docker0 Linux Bridge ]
                                │ (NAT / iptables forwarding)
                                ▼
                   [ Host Physical NIC (eth0) ]
```

Each container connects to the `docker0` software bridge via a **Virtual Ethernet Pair (`veth`)**. Outbound internet traffic from containers is translated using Linux kernel `iptables` NAT (Masquerading).

---

## 3. Kubernetes Networking Model & CNI

In Kubernetes:
1. **Every Pod gets its own unique IP address**.
2. **Pods can communicate with all other Pods across nodes without NAT**.
3. Networking is implemented by a **Container Network Interface (CNI)** plugin (e.g. Cilium with eBPF, Calico, Flannel, AWS VPC CNI).

---

## 4. Service Mesh Introduction (Istio / Linkerd)

A **Service Mesh** injects a lightweight sidecar proxy (Envoy) next to every application container to provide:
- **Mutual TLS (mTLS)**: Automatic end-to-end encryption between microservices.
- **Observability**: Distributed tracing and latency metrics.
- **Traffic Shifting**: Canary deployments (e.g. route 5% of traffic to v2).
