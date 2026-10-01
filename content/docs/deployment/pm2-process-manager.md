---
title: "PM2: Production Process Management for Node.js"
description: Complete guide to using PM2 in production, cluster mode, ecosystem.config.js, zero-downtime reload, log rotation, and server boot startup scripts.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - pm2
  - nodejs
  - process-manager
  - cluster
  - production
platforms:
  - linux
  - macos
  - windows
tested:
  pm2: "5.4.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

**PM2** is an advanced, production-proven process manager for Node.js applications with built-in load balancer cluster mode, runtime metrics, zero-downtime reloads, and log rotation.

---

## Installation

```bash
npm install -g pm2
```

---

## Production Configuration (`ecosystem.config.js`)

Create `ecosystem.config.js` in your project root:

```javascript
module.exports = {
  apps: [
    {
      name: "web-api",
      script: "./dist/server.js",
      instances: "max",       // Spawns 1 worker per CPU core
      exec_mode: "cluster",   // Enables Node.js cluster mode
      autorestart: true,
      max_memory_restart: "1G", // Auto-restarts if memory leak exceeds 1GB
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: "staging",
        PORT: 3001,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
```

---

## Essential PM2 Commands

```bash
# Start application using ecosystem file
pm2 start ecosystem.config.js --env production

# Zero-Downtime Reload (restarts workers sequentially)
pm2 reload web-api

# Live terminal monitoring dashboard
pm2 monit

# View real-time logs
pm2 logs web-api --lines 50

# Restart or stop processes
pm2 restart web-api
pm2 stop web-api
pm2 delete web-api
```

---

## Auto-Start on System Boot

To automatically restore PM2 processes after a Linux server reboot:

```bash
# 1. Save currently running process list
pm2 save

# 2. Generate and run the OS startup systemd hook
pm2 startup
# (Copy and run the sudo command output by the above line)
```

---

## Automatic Log Rotation (`pm2-logrotate`)

Prevent log files from exhausting disk space:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 50M
pm2 set pm2-logrotate:retain 7
```

---

## Related Guides

- [Deploying Node.js to a Linux VPS](/docs/deployment/deploy-nodejs-vps)
- [systemd vs PM2 Comparison](/docs/deployment/process-managers)
- [Rollback Strategies](/docs/deployment/rollback-strategies)
