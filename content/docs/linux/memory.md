---
title: "Linux Memory Management & Swap"
description: Monitor system RAM and Swap with free, understand Linux buffer/cache allocation, vmstat metrics, and prevent Out-Of-Memory (OOM) kills.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - memory
  - ram
  - swap
  - oom-killer
  - devops
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Checking RAM & Swap with `free -h`

```bash
free -h
```

Output:
```
               total        used        free      shared  buff/cache   available
Mem:            15Gi       4.2Gi       1.8Gi       120Mi       9.0Gi        10Gi
Swap:          4.0Gi       512Mi       3.5Gi
```

### Understanding the Columns:
- **`used`**: Memory currently allocated by running application processes.
- **`free`**: Memory completely untouched.
- **`buff/cache`**: Unused memory used by Linux kernel as high-speed disk cache (automatically freed instantly if applications request more memory).
- **`available`**: **The most important metric.** Real estimate of how much memory is available for starting new applications without swapping.

---

## 2. Swap Memory

Swap acts as overflow virtual memory on the hard drive when physical RAM fills up.

```bash
# Check active swap partitions and files
swapon --show

# Create a 4GB swapfile
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## 3. Real-Time Virtual Memory Monitoring (`vmstat`)

```bash
# Sample system memory, swap, and CPU every 2 seconds
vmstat -w 2
```
- High **`si` (swap in)** and **`so` (swap out)** rates indicate the server is memory-constrained and actively thrashing disk I/O.

---

## 4. The Linux OOM Killer (Out-Of-Memory Killer)

When the Linux kernel runs completely out of available RAM and swap, it invokes the **OOM Killer** to terminate memory-hungry processes (like Node.js, Java, or databases) to prevent a full OS kernel panic.

Check if your process was terminated by the OOM Killer:
```bash
sudo dmesg -T | grep -i oom
# or
journalctl -k | grep -i -E 'killed process|out of memory'
```
