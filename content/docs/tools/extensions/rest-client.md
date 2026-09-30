---
title: "REST Client: In-Editor HTTP Testing"
description: Complete guide to the REST Client VS Code extension, executing HTTP requests directly inside .http and .rest files, environment variables, and response history.
category: tools
topic: extensions
type: reference
level: beginner
tags:
  - rest-client
  - vscode
  - http
  - api
  - extensions
platforms:
  - linux
  - macos
  - windows
tested:
  extension: "0.25.x"
lastVerified: "2026-09-30"
---

## What It Does

The **REST Client** extension (`humao.rest-client`) enables developers to write, execute, and inspect HTTP requests directly inside VS Code using plain text `.http` or `.rest` files.

---

## Why Use It

1. **Git-Versioned API Requests**: Keep executable API calls alongside your project code and commit them to Git.
2. **Zero External Software**: Eliminates switching between VS Code and external desktop clients like Postman.
3. **Environment & Variable Chaining**: Easily chain responses (e.g. using the JWT returned from a login request in subsequent authenticated requests).

---

## Installation

- **VS Code Marketplace**: Search for `humao.rest-client` and click **Install**.
- **CLI**:
  ```bash
  code --install-extension humao.rest-client
  ```

---

## Configuration

In `.vscode/settings.json`:

```json
{
  "rest-client.environmentVariables": {
    "$shared": {
      "version": "v1"
    },
    "local": {
      "baseUrl": "http://localhost:3000",
      "authToken": "test-token-local"
    },
    "production": {
      "baseUrl": "https://api.example.com",
      "authToken": "prod-secret-token"
    }
  }
}
```

---

## Use Cases & Examples

Create a file named `requests.http`:

```http
### 1. Variables
@baseUrl = http://localhost:3000/api

### 2. User Login (Captures Response)
# @name login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "developer@example.com",
  "password": "password123"
}

### 3. Authenticated Request using Captured Token
@token = {{login.response.body.token}}

GET {{baseUrl}}/users/profile
Authorization: Bearer {{token}}

### 4. Create Resource
POST {{baseUrl}}/posts
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "title": "Learning OpenDevDocs",
  "content": "Step-by-step developer guides"
}
```

Clicking **"Send Request"** above any block opens a response preview panel displaying status code, response time, headers, and formatted JSON.

---

## Alternatives

- **Bruno**: Git-friendly standalone desktop app.
- **Postman / Insomnia**: Full-featured API client suites.
- **Thunder Client**: Alternative GUI-based VS Code extension.

---

## Performance & Security Considerations

- **Secrets in `.http` Files**: Never hardcode production API keys or passwords directly in committed `.http` files. Use environment variables defined in `.vscode/settings.json` or `.env` files.
- **Lightweight**: Pure JavaScript extension with near-zero idle CPU and memory consumption.

---

## Related Guides

- [API Clients Overview](/docs/tools/api-clients)
- [HTTP and HTTPS Fundamentals](/docs/fundamentals/http-https)
