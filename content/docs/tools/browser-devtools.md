---
title: "Browser DevTools: Elements, Network, Performance & Debugging"
description: Complete guide to Chrome DevTools and Firefox Developer Tools, covering DOM inspection, network waterfall analysis, JavaScript debugging, and performance profiling.
category: tools
topic: browser-devtools
type: guide
level: beginner
tags:
  - browser
  - devtools
  - chrome
  - debugging
  - performance
platforms:
  - browser
  - all
tested:
  chrome: "129.x"
lastVerified: "2026-09-30"
---

**Browser DevTools** is a suite of web authoring and debugging tools built directly into Google Chrome, Firefox, Safari, and Microsoft Edge.

---

## DevTools Panels Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Chrome DevTools Core Panels                                 │
├───────────────┬───────────────┬──────────────┬──────────────┤
│ Elements      │ Console       │ Sources      │ Network      │
│ Inspect DOM   │ Run JS, logs  │ Breakpoints  │ HTTP, Timing │
│ & CSS styles  │ & errors      │ & Stepping   │ & Payloads   │
├───────────────┼───────────────┼──────────────┼──────────────┤
│ Performance   │ Memory        │ Application  │ Lighthouse   │
│ Flame graphs  │ Heap snapshots│ Cookies,     │ Audits & Core│
│ & 60fps frame │ & memory leaks│ LocalStorage │ Web Vitals   │
└───────────────┴───────────────┴──────────────┴──────────────┘
```

---

## 1. Elements Panel (DOM & CSS)
- **Live CSS Editing**: Edit styles inline, toggle hover/focus pseudo-classes (`:hover`, `:focus-visible`).
- **Computed Styles**: Trace exact CSS inheritance and Box Model margins/paddings.
- **Scroll into View / Inspect**: Right click any element on the page $\rightarrow$ **Inspect**.

---

## 2. Console Panel
- **`console.table(data)`**: Renders arrays of objects as interactive tables.
- **`console.time('label')` & `console.timeEnd('label')`**: Benchmarks execution duration of code blocks.
- **`$0`**: Returns the currently selected DOM node in the Elements panel.
- **`$$('selector')`**: Shorthand for `document.querySelectorAll()`.

---

## 3. Network Panel (Traffic & Waterfalls)
- **Throttling**: Simulate **Slow 3G** or **Fast 3G** to test poor mobile connectivity.
- **Disable Cache**: Forces browser to bypass disk cache on every reload.
- **Fetch/XHR Filter**: Inspect API request headers, request payloads, response bodies, and TTFB (Time to First Byte).
- **Copy as cURL**: Right-click any network request $\rightarrow$ **Copy** $\rightarrow$ **Copy as cURL** to replay in your terminal!

---

## 4. Sources Panel (JavaScript Breakpoints)
- **Line-of-code Breakpoints**: Click the line number in your source file to pause execution.
- **Conditional Breakpoints**: Pause only when an expression evaluates to true (e.g. `user.id === 42`).
- **Logpoints**: Log variables without modifying source code or triggering rebuilds.
- **Call Stack & Scope Inspection**: Inspect closure variables and call chain at runtime.

---

## Related Guides

- [React DevTools Extension](/docs/tools/chrome-extensions)
- [Debugging Fundamentals](/docs/fundamentals/debugging)
- [Web Performance Concepts](/docs/fundamentals/http-https)
