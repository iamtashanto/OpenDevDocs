---
title: HTTP Status Codes Reference
description: Master 1xx, 2xx, 3xx, 4xx, and 5xx HTTP response status codes and know exactly when to use each in REST APIs.
category: backend
topic: backend-concepts
type: guide
level: beginner
tags:
  - backend
  - http
  - status-codes
  - rest
  - api
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

HTTP status codes are 3-digit numbers returned by the server to inform the client about the outcome of their request.

---

## Status Code Categories

| Range | Category | Description |
| :--- | :--- | :--- |
| **`1xx`** | Informational | Request received, continuing process |
| **`2xx`** | Success | Action was successfully received, understood, and accepted |
| **`3xx`** | Redirection | Further action must be taken to complete request |
| **`4xx`** | Client Error | Request contains bad syntax or cannot be fulfilled |
| **`5xx`** | Server Error | Server failed to fulfill an apparently valid request |

---

## Essential 2xx Success Codes

- **`200 OK`**: Standard successful response for `GET`, `PUT`, or `PATCH`.
- **`201 Created`**: Resource successfully created (used for `POST`). Includes the created object or a `Location` header.
- **`202 Accepted`**: Request accepted for processing, but processing has not completed (asynchronous batch jobs).
- **`204 No Content`**: Action succeeded, but there is no response body to return (common for `DELETE`).

---

## Essential 3xx Redirection Codes

- **`301 Moved Permanently`**: Target resource has a new permanent URI.
- **`302 Found` (Temporary Redirect)**: Temporary redirection to another URI.
- **`304 Not Modified`**: Cached version on client is still fresh (Conditional `If-None-Match` / `ETag`).

---

## Essential 4xx Client Error Codes

- **`400 Bad Request`**: Malformed syntax, invalid JSON body, or missing required fields.
- **`401 Unauthorized`**: Authentication is required (missing or invalid credentials/token).
- **`403 Forbidden`**: Authenticated, but user lacks permission to access this specific resource.
- **`404 Not Found`**: The requested resource does not exist on the server.
- **`409 Conflict`**: Conflict with current resource state (e.g. duplicate email during registration).
- **`422 Unprocessable Entity`**: Request format is valid, but business validation failed (e.g. password too short).
- **`429 Too Many Requests`**: Client exceeded rate limits.

---

## Essential 5xx Server Error Codes

- **`500 Internal Server Error`**: Unexpected server-side crash or unhandled exception.
- **`502 Bad Gateway`**: Upstream server received an invalid response from a backend dependency.
- **`503 Service Unavailable`**: Server is temporarily overloaded or down for maintenance.
- **`504 Gateway Timeout`**: Upstream proxy/gateway timed out waiting for backend response.
