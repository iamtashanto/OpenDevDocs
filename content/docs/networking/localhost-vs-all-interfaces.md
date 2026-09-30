---
title: "localhost (127.0.0.1) vs 0.0.0.0 Binding"
description: Understand network interface binding, why binding to 127.0.0.1 breaks Docker containers and mobile testing, and when to use 0.0.0.0.
category: networking
topic: developer-networking
type: guide
level: beginner
tags:
  - networking
  - localhost
  - docker
  - binding
  - troubleshooting
platforms:
  - web
  - node
  - linux
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## The Common Problem

Developers frequently encounter scenarios where a server runs locally at `http://localhost:3000`, but:
- Other devices on the local Wi-Fi cannot access it via the machine's LAN IP (`http://192.168.1.15:3000`).
- A Docker container mapped with `-p 3000:3000` cannot be reached from the host machine.

The cause is almost always **Interface Binding**.

---

## 127.0.0.1 vs 0.0.0.0 Explained

| Host Binding Address | Accessible From | Inaccessible From |
| :--- | :--- | :--- |
| **`127.0.0.1` (`localhost`)** | Only processes running on the exact same physical machine / loopback interface. | Other devices on LAN, Docker host from container. |
| **`0.0.0.0` ("All Interfaces")** | Loopback (`127.0.0.1`), Local LAN IP (`192.168.x.x`), and Public Internet (if firewall allows). | Nothing (listens on every available network interface). |

---

## The Docker Container Binding Trap

Inside a Docker container, `localhost` refers to the container's own internal loopback interface—**not your host machine**.

```javascript
// ❌ WRONG inside Docker container:
app.listen(3000, 'localhost'); // Only reachable from inside the container itself!

// ✅ CORRECT inside Docker container:
app.listen(3000, '0.0.0.0'); // Reachable from Docker host via port forwarding (-p 3000:3000)
```

In Next.js, configure `HOSTNAME="0.0.0.0"` in Dockerfiles:
```dockerfile
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["node", "server.js"]
```

---

## Testing on Mobile Devices via LAN

To test a web application running on your laptop from a smartphone connected to the same Wi-Fi:

1. Ensure your dev server binds to `0.0.0.0` (e.g. `vite --host` or `next dev -H 0.0.0.0`).
2. Find your laptop's local LAN IP:
   ```bash
   # macOS
   ipconfig getifaddr en0

   # Linux
   ip a | grep "inet 192.168"
   ```
3. Open `http://192.168.1.50:3000` in your smartphone's browser.
