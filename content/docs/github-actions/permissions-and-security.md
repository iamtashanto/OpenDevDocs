---
title: "GitHub Actions Permissions & Security Best Practices"
description: "Harden your CI/CD pipelines with least-privilege token permissions, commit SHA pinning, script injection defense, and OIDC authentication."
category: devops
topic: github-actions
type: guide
level: advanced
tags:
  - github-actions
  - security
  - permissions
  - oidc
  - hardening
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Permissions & Security Best Practices

Securing CI/CD pipelines is critical. A compromised workflow can leak proprietary source code, publish malicious npm packages, or compromise production servers.

---

## 1. Least-Privilege Permissions

By default, the automatic `GITHUB_TOKEN` may have broad write permissions. You should always enforce **least privilege** by declaring minimal scopes at the top of every workflow:

```yaml
# Restrict workflow to read-only permissions by default
permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm lint

  publish-comment:
    runs-on: ubuntu-latest
    # Grant elevated permissions ONLY to the specific job that needs it
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - run: gh pr comment --body "CI checks passed!"
```

### Common Permission Scopes

| Scope | Read | Write | Common Use Case |
| :--- | :--- | :--- | :--- |
| `contents` | Clone repo | Push commits, create tags | Standard checkout (`read`), Release publishing (`write`) |
| `pull-requests` | View PR metadata | Add PR comments, approve PRs | Automated review bots, size checks |
| `packages` | Pull container images | Push to GitHub Container Registry | `ghcr.io` Docker publishing |
| `id-token` | None | Mint OIDC tokens | Passwordless authentication to AWS / GCP / Azure |
| `security-events`| View alerts | Upload SARIF scan results | CodeQL, Trivy, Snyk scanners |

---

## 2. Pin Actions to Immutable Commit SHAs

Action tags (like `@v4`) are mutable Git tags that can be updated or hijacked if an upstream maintainer account is compromised.

Pin actions by their **40-character full commit SHA** and document the semantic version in a trailing comment:

```yaml
# ❌ Mutable tag: vulnerable to upstream tag hijacking
- uses: actions/checkout@v4

# ✅ Immutable Commit SHA: tamper-proof
- uses: actions/checkout@b4ffde65f46336ab851534e0da3b0bc18a105b33 # v4.1.1
```

> [!TIP]
> Use **Dependabot** (`dependabot.yml`) to automatically submit PRs updating these commit SHAs when new action versions release.

---

## 3. Preventing Script Injection Attacks

Untrusted user input (such as issue titles, PR branch names, or commit messages) must **never** be interpolated directly into shell command strings.

### ❌ Vulnerable to Shell Injection
```yaml
- name: Print PR Title
  # Attacker submits PR titled: test"; rm -rf /; echo "
  run: echo "Processing PR: ${{ github.event.pull_request.title }}"
```

### ✅ Secure: Passed via Environment Variable
```yaml
- name: Print PR Title
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
  run: echo "Processing PR: $PR_TITLE"
```

---

## 4. `pull_request` vs `pull_request_target`

- `pull_request`: Runs in the context of the fork/untrusted PR code. Secrets are **not** accessible from fork PRs.
- `pull_request_target`: Runs in the context of the target base repository and has access to repository secrets. **Never checkout untrusted PR code in `pull_request_target` workflows.**

---

## 5. Passwordless Cloud Auth via OpenID Connect (OIDC)

Never store long-lived static AWS Access Keys or GCP service account JSON files as GitHub Secrets. Use OIDC to exchange short-lived tokens:

```yaml
jobs:
  deploy-aws:
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Required for requesting the JWT OIDC token
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS Credentials with OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubDeployRole
          aws-region: us-east-1
```
