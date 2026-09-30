---
title: "Linux Logs & journalctl Troubleshooting"
description: Inspect Linux system logs, query systemd services with journalctl, filter by time and priority, and manage logrotate.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - logs
  - journalctl
  - troubleshooting
  - devops
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Querying systemd Logs with `journalctl`

`journalctl` is the centralized log query tool for all systemd services and kernel events.

```bash
# Follow logs for a specific service in real time (like tail -f)
sudo journalctl -u my-api.service -f

# View logs from the current boot only
sudo journalctl -u nginx.service -b

# View logs generated within the last 1 hour
sudo journalctl --since "1 hour ago"

# View logs within an exact timestamp window
sudo journalctl --since "2026-10-01 00:00:00" --until "2026-10-01 02:00:00"

# Show only error and critical priority logs
sudo journalctl -p err -u postgresql.service
```

---

## 2. Standard `/var/log` Directory Files

| Log File | Contains |
| :--- | :--- |
| **`/var/log/syslog`** (Debian/Ubuntu) | General system activity and background services |
| **`/var/log/messages`** (RHEL/CentOS) | General operating system event messages |
| **`/var/log/auth.log`** / **`secure`** | Authentication logs, SSH logins, and `sudo` attempts |
| **`/var/log/nginx/`** | Web server `access.log` and `error.log` |
| **`dmesg`** | Kernel ring buffer messages (hardware, OOM kills, device drivers) |

---

## 3. Investigating SSH Brute Force Attempts

```bash
# View recent failed login attempts
sudo grep "Failed password" /var/log/auth.log | tail -n 20
```

---

## 4. Automatic Log Rotation (`logrotate`)

Log files are automatically compressed and rotated daily or weekly via `/etc/logrotate.conf` and `/etc/logrotate.d/*` to prevent disks from filling up with unbounded text logs.
