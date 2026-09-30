---
title: "Generate ED25519 SSH Key (ssh-keygen)"
description: Create a secure, modern Ed25519 elliptic-curve SSH keypair for GitHub, GitLab, and remote server access.
category: tools
topic: ssh
type: reference
level: beginner
tags:
  - ssh
  - security
  - keys
  - git
platforms:
  - linux
  - macos
  - windows
tested:
  openssh: "9.x"
lastVerified: "2026-09-30"
---

## Command

<Command>ssh-keygen -t ed25519 -C "your_email@example.com"</Command>

---

## Short Description

`ssh-keygen` generates and authenticates SSH cryptographic keys. Using the modern `ed25519` elliptic curve algorithm produces shorter keys with superior security and faster signature generation than legacy RSA.

---

## Step-by-Step Generation

<Steps>
  <Step step={1} title="Generate the Keypair">
    Run the command and specify your email comment:
    ```bash
    ssh-keygen -t ed25519 -C "developer@example.com"
    ```
  </Step>

  <Step step={2} title="Specify File Path & Passphrase">
    Press `Enter` to accept the default location (`~/.ssh/id_ed25519`). Optionally type a secure passphrase.
  </Step>

  <Step step={3} title="Copy Public Key to Clipboard">
    <OSTabs
      macos="pbcopy < ~/.ssh/id_ed25519.pub"
      linux="xclip -selection clipboard < ~/.ssh/id_ed25519.pub"
      windows="type ~/.ssh/id_ed25519.pub | clip"
    />
  </Step>
</Steps>
