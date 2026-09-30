---
title: "Docker Networks & Service Discovery"
description: Complete guide to Docker networking drivers (bridge, host, overlay, macvlan, none), custom user-defined networks, and DNS-based container service discovery.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - networks
  - dns
  - networking
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

Docker networking enables containers to communicate with each other and with external networks securely.

---

## Network Drivers

| Driver | Description | Common Use Case |
| :--- | :--- | :--- |
| **`bridge`** | Private virtual Ethernet bridge with internal NAT (Default) | Standalone containers on single host |
| **`host`** | Container shares host network namespace directly | Maximum throughput; removes network isolation |
| **`overlay`** | Multi-host network for Swarm / Kubernetes clusters | Distributed multi-node setups |
| **`macvlan`** | Assigns container a real physical MAC address on host LAN | Legacy networking apps needing physical IPs |
| **`none`** | Disables all networking interfaces except loopback | Air-gapped batch compute jobs |

---

## User-Defined Bridge Networks & Automatic DNS

The default `bridge` network does **not** support automatic container name resolution (only IP addresses). **Custom user-defined bridge networks** enable built-in DNS service discovery:

```bash
# 1. Create a custom network
docker network create my-app-net

# 2. Run database container on the network
docker run -d --name postgres-db --network my-app-net \
  -e POSTGRES_PASSWORD=secret \
  postgres:16-alpine

# 3. Run application container on the same network
docker run -d --name web-api --network my-app-net \
  -e DATABASE_URL="postgresql://postgres:secret@postgres-db:5432/postgres" \
  -p 3000:3000 \
  my-api-image
```

Inside `web-api`, resolving the hostname `postgres-db` automatically translates to the internal container IP address!

---

## Network Management Commands

```bash
# List all networks
docker network ls

# Inspect network subnet and attached containers
docker network inspect my-app-net

# Connect an already running container to another network
docker network connect my-app-net container-id

# Disconnect container from network
docker network disconnect my-app-net container-id

# Delete unused networks
docker network prune
```

---

## Related Topics

- [Docker Ports](/docs/docker/ports)
- [Docker Compose Service Discovery](/docs/docker/docker-compose)
- [Troubleshooting: Cannot Connect to Database](/errors/docker/cannot-connect-to-database)
