---
title: "How to Add a Developer Roadmap"
description: "Guidelines and schema documentation for contributing structured learning paths to OpenDevDocs."
category: docs
topic: getting-started
type: guide
level: intermediate
tags:
  - contributing
  - roadmaps
  - schema
  - documentation
platforms:
  - all
lastVerified: "2026-10-01"
---

# How to Add a Developer Roadmap

OpenDevDocs roadmaps are data-driven, interactive learning paths that guide developers step-by-step from beginner fundamentals to production engineering.

Every topic node in an OpenDevDocs roadmap links directly to real documentation guides, terminal commands, or recipes.

---

## 1. Roadmap Schema Architecture

Roadmap definitions live in `lib/roadmaps/definitions/` and must conform to the `RoadmapDefinition` TypeScript interface:

```typescript
import type { RoadmapDefinition } from "../types";

export const myNewRoadmap: RoadmapDefinition = {
  slug: "my-technology",
  title: "My Technology Roadmap",
  subtitle: "Step-by-step path to mastering My Technology in production",
  description: "Comprehensive guide from basic setup to enterprise deployment.",
  category: "framework", // "role" | "skill" | "framework" | "language" | "database" | "devops" | "tools"
  featured: false,
  icon: "code", // "code" | "server" | "cloud" | "database" | "layers" | "cpu" | "shield"
  level: "Beginner → Production",
  estimatedDuration: "3 - 5 Months",
  relatedRoadmaps: ["frontend", "javascript", "full-stack"],
  sections: [
    { id: "foundations", title: "1. Core Foundations", order: 1 },
    { id: "advanced", title: "2. Production & Scaling", order: 2 },
  ],
  nodes: [
    {
      id: "my-tech-basics",
      title: "Syntax & Fundamentals",
      description: "Core syntax, data types, and execution model.",
      docsHref: "/docs/my-technology/overview",
      type: "primary", // "primary" | "topic" | "optional" | "alternative" | "advanced" | "coming_soon"
      level: "beginner",
      sectionId: "foundations",
      keyConcepts: ["Variables", "Functions", "Scope"],
    },
  ],
  edges: [
    { source: "my-tech-basics", target: "my-tech-advanced", type: "primary" },
  ],
};
```

---

## 2. Node Types & Visual Roles

| Node Type | Purpose | Visual Styling |
| :--- | :--- | :--- |
| `primary` | Core milestone on the main learning path | Prominent card surface with brand border |
| `topic` | Standard learning topic | Standard card |
| `alternative` | Choice branch (e.g. React vs Angular) | Dashed border with "Alternative" badge |
| `optional` | Helpful but not strictly required | Dotted border with "Optional" badge |
| `advanced` | Production & deep runtime concepts | "Advanced" indicator tag |
| `coming_soon` | Planned topic without active docs | Muted card with "Coming Soon" badge |

---

## 3. Registering the Roadmap

Add your new definition to `lib/roadmaps/registry.ts`:

```typescript
import { myNewRoadmap } from "./definitions/my-technology";

export const roadmapsRegistry = {
  // ...
  "my-technology": myNewRoadmap,
};
```

---

## 4. Validating Your Roadmap

Run the automated validator before submitting:

```bash
npx -y tsx scripts/validate-roadmaps.mjs
```

The validator verifies:
- Unique lowercase slug.
- Unique node IDs within the roadmap.
- Valid section ID references.
- Valid edge source and target node connections.
- Verified `docsHref` paths (must start with `/docs/`, `/commands/`, `/recipes/`, `/errors/`, or `/vs/`).
