---
title: "Updates were rejected: non-fast-forward push"
description: Safely resolve Git rejected push errors by rebasing and reconciling divergent remote history without data loss.
category: git
topic: git
type: troubleshooting
level: beginner
tags:
  - git
  - push
  - rebase
  - non-fast-forward
platforms:
  - all
tested:
  git: "2.44+"
lastVerified: "2026-09-30"
---

## Error Message

```text
To https://github.com/iamtashanto/OpenDevDocs.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/iamtashanto/OpenDevDocs.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

---

## Symptoms

- `git push origin <branch>` fails with `[rejected] (non-fast-forward)`.
- Git warns that the tip of your local branch is behind the remote counterpart.

---

## Why It Happens

Git prevents you from overwriting commits on the remote branch that you do not have locally in your commit history. This happens when:
1. A teammate pushed new commits to the remote branch while you were working.
2. A PR was merged on GitHub directly into the branch.
3. You previously amended or rebased local commits that were already pushed.

---

## Quick Fix (Recommended)

Fetch the remote commits and replay your local commits on top using **Rebase**:

```bash
# 1. Fetch remote changes and rebase your commits on top
git pull --rebase origin main

# 2. Push your rebased branch cleanly
git push origin main
```

---

## Step-by-Step Resolution

<Steps>
  <Step step={1} title="Pull and Rebase">
    ```bash
    git pull --rebase origin main
    ```
  </Step>

  <Step step={2} title="Resolve Conflicts (If Any)">
    If Git pauses due to conflicting file lines, inspect the conflicts:
    ```bash
    git status
    ```
    Open the conflicted files, resolve the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), stage the files:
    ```bash
    git add <resolved-file>
    git rebase --continue
    ```
  </Step>

  <Step step={3} title="Push Upstream">
    ```bash
    git push origin main
    ```
  </Step>
</Steps>

---

## What NOT to Do: Dangerous Force Pushing

<Danger title="Avoid Blind 'git push --force'">
Running `git push --force` or `git push -f` will silently overwrite and permanently delete your teammates' pushed commits on the remote repository. If you must force push your own isolated feature branch after an intentional rebase, always use the safer option:
```bash
git push --force-with-lease
```
`--force-with-lease` will fail if anyone else pushed to the remote branch since your last fetch.
</Danger>
