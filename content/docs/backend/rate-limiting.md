---
title: API Rate Limiting & Throttling
description: Prevent DoS attacks, defend against brute force, and implement Redis-backed sliding window rate limiters.
category: backend
topic: backend-concepts
type: guide
level: intermediate
tags:
  - backend
  - rate-limiting
  - redis
  - security
  - api
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Why Implement Rate Limiting?

1. **Denial-of-Service (DoS) Mitigation**: Protect backend servers and database connection pools from traffic spikes and malicious floods.
2. **Brute Force Protection**: Block automated credential stuffing on `/login` and password reset endpoints.
3. **Cost Control & Monetization**: Tier API usage for commercial subscriptions (e.g. Free Tier: 60 req/min; Pro Tier: 1,000 req/min).

---

## Rate Limiting Algorithms

### 1. Fixed Window Counter
Counts requests in discrete time intervals (e.g. 00:00 to 00:01). Simple, but susceptible to double-limit traffic bursts at window boundaries.

### 2. Sliding Window Counter (Industry Standard)
Blends the request count of the previous window with the current window based on elapsed time percentage, smoothing out boundary bursts with minimal memory footprint.

### 3. Token Bucket
Tokens are added to a bucket at a constant rate. Each request consumes one token. Allows short bursts up to bucket capacity while enforcing an average rate limit.

---

## Standard Rate Limit HTTP Headers

When responding to API requests, return standard headers to inform the client:

```http
HTTP/1.1 200 OK
RateLimit-Limit: 100
RateLimit-Remaining: 42
RateLimit-Reset: 1727745000
```

When the client exceeds the limit, return **`429 Too Many Requests`**:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again in 30 seconds."
}
```

---

## Redis Sliding Window Counter Implementation

```javascript
// Using Redis sorted sets (ZSET)
async function isRateLimited(redis, userId, limit = 100, windowSec = 60) {
  const now = Date.now();
  const clearBefore = now - (windowSec * 1000);
  const key = `ratelimit:${userId}`;

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, clearBefore); // Remove expired timestamps
  pipeline.zadd(key, now, `${now}-${Math.random()}`); // Add current request
  pipeline.zcard(key); // Count requests in current window
  pipeline.expire(key, windowSec); // Set TTL

  const results = await pipeline.exec();
  const requestCount = results[2][1];

  return requestCount > limit;
}
```
