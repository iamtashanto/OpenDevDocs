---
title: Introduction to Node.js Streams
description: Process massive data files and real-time network payloads with constant memory usage using Node.js Readable, Writable, and Transform streams.
category: backend
topic: nodejs
type: guide
level: intermediate
tags:
  - nodejs
  - streams
  - io
  - performance
  - memory
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What are Streams?

Streams are collections of data—like arrays or strings—that may not be available all at once and don't need to fit in memory. Streams process data piece by piece (in chunks) as it arrives, enabling constant memory usage regardless of file size.

---

## 4 Types of Streams

1. **Readable**: Source of data you can read from (e.g. `fs.createReadStream`, HTTP incoming request `req`).
2. **Writable**: Destination you can write data to (e.g. `fs.createWriteStream`, HTTP response `res`).
3. **Duplex**: Both Readable and Writable (e.g. TCP sockets `net.Socket`).
4. **Transform**: Duplex stream that modifies data as it passes through (e.g. `zlib.createGzip`, crypto cipher streams).

---

## Safe Stream Piping with `stream/promises` (`pipeline`)

The modern and safest way to connect streams is using `pipeline` from `node:stream/promises`. It automatically manages backpressure and cleans up all stream file descriptors on errors:

```javascript
import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

async function compressLogFile() {
  try {
    await pipeline(
      fs.createReadStream('./access.log'),
      zlib.createGzip(),
      fs.createWriteStream('./access.log.gz')
    );
    console.log('File compressed successfully');
  } catch (err) {
    console.error('Pipeline failed:', err);
  }
}

await compressLogFile();
```

---

## Creating a Custom Transform Stream

```javascript
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';

const upperCaseTransform = new Transform({
  transform(chunk, _encoding, callback) {
    // Convert chunk buffer to uppercase string and push to next stream
    const upper = chunk.toString().toUpperCase();
    callback(null, upper);
  },
});

await pipeline(
  fs.createReadStream('./input.txt'),
  upperCaseTransform,
  fs.createWriteStream('./uppercase.txt')
);
```

---

## What is Backpressure?

Backpressure occurs when a Readable stream produces data faster than a Writable stream can consume and write it (e.g. reading from a fast SSD and writing over a slow 3G cellular network).

- **`pipeline` automatically handles backpressure** by pausing the reader until the writer is ready for more data.
- **Never use `.pipe()` without error handlers**: Legacy `.pipe()` does not automatically destroy streams when an error occurs in the middle of the chain. Always prefer `node:stream/promises` `pipeline`.
