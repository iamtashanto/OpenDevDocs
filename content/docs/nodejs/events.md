---
title: Node.js Event Emitter (node:events)
description: Build decoupled, event-driven architectures using Node.js EventEmitter, custom events, and listener management.
category: backend
topic: nodejs
type: guide
level: intermediate
tags:
  - nodejs
  - events
  - eventemitter
  - architecture
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

Much of the Node.js core API (such as HTTP servers, streams, and sockets) is built around the **EventEmitter** pattern. `EventEmitter` allows objects to emit named events that cause registered listener functions to execute.

---

## Basic EventEmitter Usage

```javascript
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

// Register a listener
emitter.on('user:registered', (user) => {
  console.log(`Sending welcome email to ${user.email}`);
});

emitter.on('user:registered', (user) => {
  console.log(`Creating default workspace for ${user.id}`);
});

// Emit the event
emitter.emit('user:registered', { id: 'u_123', email: 'alice@example.com' });
```

---

## One-Time Listeners & Cleanup

```javascript
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

// Listen only once
emitter.once('app:ready', () => {
  console.log('Application initialized successfully');
});

// Remove listener
function onOrderCreated(order) {
  console.log('Order:', order.id);
}

emitter.on('order:created', onOrderCreated);
emitter.off('order:created', onOrderCreated); // or emitter.removeListener
```

---

## Custom Service Class Extending EventEmitter

```javascript
import { EventEmitter } from 'node:events';

export class PaymentService extends EventEmitter {
  async processPayment(orderId, amount) {
    this.emit('payment:started', { orderId, amount });

    try {
      // Simulate payment gateway call
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.emit('payment:success', { orderId, amount, transactionId: 'tx_999' });
    } catch (err) {
      this.emit('payment:failed', { orderId, error: err.message });
    }
  }
}
```

Usage:

```javascript
const payments = new PaymentService();

payments.on('payment:success', ({ orderId, transactionId }) => {
  console.log(`Payment confirmed for order ${orderId}: ${transactionId}`);
});

await payments.processPayment('ord_456', 99.00);
```

---

## Critical: Handling the `error` Event

If an `EventEmitter` emits an `'error'` event and has no listeners registered for `'error'`, Node.js will throw an unhandled exception and crash the entire process.

```javascript
// ✅ Always register an error listener
emitter.on('error', (err) => {
  console.error('Handled EventEmitter error:', err);
});
```
