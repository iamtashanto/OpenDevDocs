---
title: "Cloudflare WebSockets, gRPC & Real-Time Protocols"
description: "Configure WebSockets, gRPC, and HTTP/3 QUIC through Cloudflare proxy, understand the 100-second idle timeout, and implement ping-pong heartbeats."
category: devops
topic: cloudflare
type: guide
level: intermediate
tags:
  - cloudflare
  - websockets
  - grpc
  - realtime
  - http3
platforms:
  - all
tested:
  cloudflare: "current"
lastVerified: "2026-10-01"
---

# Cloudflare WebSockets, gRPC & Real-Time Protocols

Cloudflare proxies full-duplex TCP WebSockets and gRPC streams through its global Anycast edge network on all plan tiers (Free, Pro, Business, Enterprise) without additional charges.

---

## 1. WebSockets Configuration

WebSockets are automatically enabled globally. You can verify this toggle under **Network -> WebSockets: ON**.

```
[ Browser / App Client ]
           │ (wss://chat.example.com)
           ▼
[ Cloudflare Anycast Edge ]
           │ (wss:// or ws:// to origin)
           ▼
[ Origin Nginx (Proxy Headers) ]
           │ (http://127.0.0.1:4000)
           ▼
[ Node.js / Go WebSocket Server ]
```

---

## 2. The 100-Second Idle Timeout & Heartbeats

> [!IMPORTANT]
> **Cloudflare enforces a strict 100-second timeout on idle WebSocket connections.** If no data is transmitted across the socket for 100 seconds, Cloudflare will terminate the connection.

### How to Prevent Socket Disconnections:
Implement an application-level **ping-pong heartbeat** every 30 to 45 seconds:

#### In Node.js / ws / Socket.io:
```javascript
// Socket.io handles pingInterval automatically:
const io = new Server(server, {
  pingInterval: 30000, // Send ping every 30 seconds
  pingTimeout: 20000,   // Wait 20 seconds for pong response
});
```

#### In Go (Gorilla WebSocket):
```go
ticker := time.NewTicker(30 * time.Second)
go func() {
    for range ticker.C {
        if err := conn.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
            return
        }
    }
}()
```

---

## 3. Enabling gRPC & HTTP/3 (QUIC)

In the Cloudflare Dashboard under **Network**:
- **gRPC**: Toggle **ON** to allow bidirectional gRPC HTTP/2 streams to your origin APIs.
- **HTTP/3 (with QUIC)**: Toggle **ON** to enable UDP-based HTTP/3 for ultra-low latency mobile connections.
- **0-RTT Connection Resumption**: Enables near-instant reconnection for repeat visitors.
