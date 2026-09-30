---
title: "GitHub Personal Access Tokens (PAT)"
description: "Understanding Fine-Grained Personal Access Tokens: HTTPS authentication, token scopes, expiration policies, and automated script access."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - pat
  - tokens
  - authentication
  - security
platforms:
  - all
lastVerified: "2026-09-30"
---

# GitHub Personal Access Tokens (PAT)

GitHub deprecated account password authentication for Git operations over HTTPS in 2021. Today, developers connecting via HTTPS or accessing GitHub REST/GraphQL APIs must authenticate using a **Personal Access Token (PAT)**.

---

## 1. Fine-Grained vs. Classic Tokens

| Token Type | Scope Granularity | Expiration | Recommended? |
| :--- | :--- | :--- | :--- |
| **Fine-Grained Tokens** | Restricted to **specific repositories** with exact read/write permissions per resource (e.g. Issues: Read-Only, Contents: Read & Write). | Mandatory (max 1 year) | ✅ **Yes (Principle of Least Privilege)** |
| **Classic Tokens** | Broad account-wide permissions (`repo` scope grants full read/write to all repositories you own). | Optional expiration | ❌ Deprecated for general daily use |

---

## 2. Generating a Fine-Grained Token

1. Go to **Settings** → **Developer Settings** → **Personal Access Tokens** → **Fine-grained tokens**.
2. Click **Generate new token**.
3. Set a descriptive name and expiration period (e.g. 90 days).
4. Under **Repository access**, select **Only select repositories**.
5. Under **Permissions**, grant only the required permissions (e.g. `Contents: Read and write`).
6. Copy the token string (`github_pat_...`) and store it securely in a password manager.

---

## 3. Best Practices

- **Never commit tokens into code**: Tokens pushed to public repositories will be immediately revoked by GitHub Secret Scanning.
- **Set short expiration dates**: Rotate tokens every 90 days.

---

## Related Topics

- [GitHub SSH Authentication](/docs/github/ssh-authentication)
- [GitHub CLI (gh)](/docs/github/github-cli)
- [GitHub Actions Secrets](/docs/github/github-actions)
