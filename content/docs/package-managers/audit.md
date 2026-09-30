---
title: "Security Auditing (`npm audit`)"
description: Complete guide to vulnerability scanning with npm audit and pnpm audit, severity levels (low, moderate, high, critical), npm audit fix, and handling overrides.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - audit
  - security
  - npm
  - pnpm
  - vulnerabilities
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

The `npm audit` command scans your project's dependency tree against the GitHub Advisory Database to find known security vulnerabilities and security advisories (CVEs).

---

## Running an Audit

```bash
# npm
npm audit

# pnpm
pnpm audit
```

### JSON Output (CI/CD Pipelines)
```bash
npm audit --json > audit-report.json
```

---

## Vulnerability Severity Levels

| Severity | Description | Action Required |
| :--- | :--- | :--- |
| **Low** | Minor risk, difficult to exploit in typical environments | Review during scheduled maintenance |
| **Moderate** | Moderate risk, requires specific configuration or inputs | Update at earliest convenience |
| **High** | Significant security flaw, denial of service, data leakage | Update immediately |
| **Critical** | Remote code execution (RCE), unauthenticated compromise | **Emergency hotfix** |

---

## Fixing Vulnerabilities

### 1. Automatic Non-Breaking Fixes
Updates compatible minor/patch versions:
```bash
npm audit fix
```

### 2. Automatic Major Version Fixes (Use Caution)
Upgrades to breaking major versions if required to resolve the advisory:
```bash
npm audit fix --force
```
> [!CAUTION]
> `--force` can break application code by installing major breaking releases. Always run test suites afterwards!

### 3. Forcing Transitive Fixes via `overrides`
If a vulnerable transitive dependency is nested inside an unmaintained parent package, enforce the safe sub-package version using `overrides` in `package.json`:

```json
{
  "overrides": {
    "axios": "^1.7.7",
    "cookie": "^0.7.0"
  }
}
```

---

## Related Guides

- [Docker Security Basics](/docs/docker/security)
- [Updating Packages](/docs/package-managers/update)
- [Lock Files](/docs/package-managers/lock-files)
