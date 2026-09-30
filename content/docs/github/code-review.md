---
title: "Effective Code Reviews on GitHub"
description: "Conducting constructive code reviews: inline diff comments, suggestion blocks, review states (Approve, Request Changes), and review etiquette."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - code-review
  - pull-requests
  - quality
platforms:
  - all
lastVerified: "2026-09-30"
---

# Effective Code Reviews on GitHub

Code review is a collaborative quality assurance process where peers inspect pull requests to identify bugs, ensure architectural consistency, share knowledge, and mentor team members.

---

## 1. The Three Review Responses

When submitting a formal review on a Pull Request:

1. **Comment**: Submit general feedback without explicitly approving or blocking the merge.
2. **Approve**: Confirm that the code meets project standards, passes tests, and is ready to merge.
3. **Request Changes**: Block merging until required bug fixes, test additions, or architectural adjustments are resolved.

---

## 2. Using GitHub Suggestion Blocks

Reviewers can propose exact one-click diff changes directly within review comments using Markdown suggestion blocks:

````markdown
```suggestion
const timeoutMs = Number(process.env.TIMEOUT_MS) || 5000;
```
````

The author can click **Apply suggestion** on GitHub to instantly commit the change.

---

## 3. Reviewer Checklist

- [ ] **Functionality**: Does the code achieve the intended goal without breaking edge cases?
- [ ] **Tests**: Are there automated tests verifying the fix or feature?
- [ ] **Security**: Are inputs sanitized? Are any secrets or sensitive credentials exposed?
- [ ] **Performance**: Are there N+1 queries, memory leaks, or un-debounced event listeners?
- [ ] **Readability & Standards**: Are variables well-named? Does code conform to repository conventions?

---

## Related Topics

- [Pull Requests Workflow](/docs/github/pull-requests)
- [Branch Protection Rules](/docs/github/branch-protection)
- [GitHub Actions CI Automation](/docs/github/github-actions)
