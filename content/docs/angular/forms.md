---
title: "Angular Reactive Forms"
description: "Build robust, strongly typed reactive forms with custom validation in Angular."
category: docs
topic: angular
type: guide
level: intermediate
tags:
  - angular
  - forms
  - validation
platforms:
  - web
tested:
  angular: "18.x"
lastVerified: "2026-10-01"
---

# Angular Reactive Forms

Angular Reactive Forms provide a model-driven approach to handling form inputs whose values change over time.

---

## FormBuilder Example

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <input formControlName="email" type="email" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Password" />
      <button type="submit" [disabled]="signupForm.invalid">Register</button>
    </form>
  `
})
export class SignupFormComponent {
  private fb = inject(FormBuilder);

  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form data:', this.signupForm.value);
    }
  }
}
```
