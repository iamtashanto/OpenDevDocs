---
title: Node.js Logging & Telemetry
description: Implement structured JSON logging, log levels, correlation IDs, and high-performance loggers like Pino in Node.js.
category: backend
topic: nodejs
type: guide
level: intermediate
tags:
  - nodejs
  - logging
  - pino
  - telemetry
  - json
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Why `console.log` is Bad in Production

- **Synchronous Bottleneck**: Direct `console.log` to stdout is blocking in certain operating system environments, reducing server throughput under heavy load.
- **Unstructured Text**: Plain text strings cannot be easily queried, indexed, or filtered by centralized log collectors (Datadog, Elastic, Grafana Loki, CloudWatch).
- **Missing Context**: Lacks timestamp metadata, log levels, error stack traces, and request correlation IDs.

---

## High-Performance Structured Logging with Pino

[Pino](https://getpino.io/) is one of the fastest JSON loggers available for Node.js:

```bash
pnpm add pino
pnpm add -D pino-pretty
```

```javascript
// src/logger.js
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Pretty-print only in local development
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: { colorize: true },
  } : undefined,
});
```

---

## Standard Log Levels

| Level | When to Use |
| :--- | :--- |
| **`fatal`** | Catastrophic failure causing application exit (e.g. database unconnectable). |
| **`error`** | Operation failed (e.g. payment gateway timeout, uncaught route rejection). |
| **`warn`** | Abnormal condition that didn't stop execution (e.g. deprecated API call). |
| **`info`** | Normal operational events (e.g. server booted on port 3000, batch job started). |
| **`debug`** | Diagnostic data for local troubleshooting (e.g. resolved config values). |
| **`trace`** | Extremely granular execution details (e.g. SQL query payloads). |

---

## Adding Request Correlation IDs

Attaching a unique `correlationId` or `reqId` to every log line allows you to trace a single user request across distributed microservices:

```javascript
// Middleware example
import crypto from 'node:crypto';
import { logger } from './logger.js';

export function requestLogger(req, res, next) {
  const reqId = req.headers['x-request-id'] || crypto.randomUUID();
  const childLogger = logger.child({ reqId, path: req.url, method: req.method });

  req.log = childLogger;
  childLogger.info('Incoming request');

  res.on('finish', () => {
    childLogger.info({ statusCode: res.statusCode }, 'Request completed');
  });

  next();
}
```
