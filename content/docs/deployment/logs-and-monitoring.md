---
title: "Production Logs, Metrics & Health Monitoring"
description: Complete introduction to production observability, structured JSON logging with Pino/Winston, error tracking with Sentry, system metrics, and uptime monitoring.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - monitoring
  - logging
  - observability
  - sentry
  - metrics
platforms:
  - linux
  - cloud
tested:
  pino: "9.x"
lastVerified: "2026-09-30"
---

Observability in production relies on three core pillars: **Logs** (what happened), **Metrics** (how system resources perform), and **Traces / Errors** (where failures occurred).

---

## 1. Structured JSON Logging

Avoid `console.log("user logged in " + userId)`. In production, log structured JSON objects to `stdout` so log aggregators (Datadog, Loki, Better Stack) can index fields:

```javascript
// Using Pino (High-Performance Node.js logger)
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

logger.info({
  event: 'user_login',
  userId: 'usr_42',
  ip: req.ip,
  responseTimeMs: 45
}, 'User successfully authenticated');
```

---

## 2. Real-Time Application Error Tracking (Sentry / GlitchTip)

Capture unhandled exceptions, promise rejections, and full stack traces automatically:

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // Sample 10% of transactions for performance
});
```

---

## 3. Server & Infrastructure Metrics

Monitor key resource saturation metrics:
- **CPU Utilization**: Alert if sustained >80% for 5 minutes.
- **Memory (RAM) & Swap Usage**: Alert if available RAM drops below 15%.
- **Disk Space**: Alert if root filesystem exceeds 85% full.
- **Tools**: Prometheus + Grafana, Datadog Agent, Netdata, or CloudWatch.

---

## 4. Synthetic Uptime Monitoring

Configure external ping probes (e.g. Uptime Kuma, Better Uptime, Pingdom) that poll your `/api/health` endpoint every 60 seconds from multiple geographic regions.

---

## Related Guides

- [Docker Logs Reference](/docs/docker/logs)
- [Linux Diagnostic Commands (top, df, free)](/docs/linux/processes)
- [Production Best Practices](/docs/deployment/dev-vs-prod)
