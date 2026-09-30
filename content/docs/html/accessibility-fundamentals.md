---
title: "Web Accessibility (a11y) Fundamentals"
description: "Core web accessibility principles: WCAG standards, ARIA attributes, keyboard navigation, focus management, color contrast, and screen reader testing."
category: frontend
topic: html
type: guide
level: beginner
tags:
  - a11y
  - accessibility
  - html
  - aria
  - wcag
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# Web Accessibility (a11y) Fundamentals

**Web Accessibility (a11y)** ensures that websites and applications are usable by everyone, including people with visual, auditory, motor, or cognitive disabilities.

---

## 1. The Four WCAG Principles (POUR)

The Web Content Accessibility Guidelines (WCAG 2.1 AA) are built upon four fundamental principles:

1. **Perceivable**: Information must be presentable to users in ways they can perceive (text alternatives for images, captions for video).
2. **Operable**: UI components and navigation must be operable via keyboard alone (no mouse traps, sufficient focus states).
3. **Understandable**: Text must be readable, predictable, and provide clear error recovery instructions.
4. **Robust**: Content must be interpretable by a wide variety of user agents, including assistive screen readers.

---

## 2. Essential Accessibility Rules

### 1. Meaningful Alt Text
Every image must have an `alt` attribute:
```html
<!-- Informative image -->
<img src="chart.png" alt="Bar chart showing a 45% increase in monthly active developers." />

<!-- Decorative image (ignored by screen readers) -->
<img src="decorative-blob.svg" alt="" role="presentation" />
```

### 2. Buttons vs. Links
- **Use `<a>` (Links)** when navigating to a new URL or page anchor.
- **Use `<button>`** when triggering an action (opening a modal, submitting a form, toggling dark mode).
- **Never** place `onclick` handlers on `<div>` or `<span>` without keyboard handlers (`Enter` / `Space`).

### 3. Visible Keyboard Focus States
Never remove CSS focus outlines with `outline: none` without providing an alternative high-contrast `:focus-visible` style:
```css
/* ✅ Accessible focus ring */
button:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

### 4. ARIA Roles and Labels
Use ARIA (Accessible Rich Internet Applications) only when semantic HTML5 elements are insufficient:
```html
<!-- Icon-only button needs an accessible name -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Live regions announce dynamic updates to screen readers -->
<div role="status" aria-live="polite">
  Copied command to clipboard!
</div>
```

---

## 3. Color Contrast Ratios (WCAG AA)

- **Normal Text (< 18pt)**: Requires a minimum contrast ratio of **4.5:1** against the background.
- **Large Text (≥ 18pt or 14pt bold)**: Requires a minimum contrast ratio of **3:1**.
- **UI Components & Icons**: Requires **3:1** contrast against adjacent colors.

---

## Related Topics

- [Semantic HTML5 Elements](/docs/html/semantic-html)
- [HTML Forms & Input Accessibility](/docs/html/forms)
- [CSS Layouts & Responsive Design](/docs/css/responsive-design)
