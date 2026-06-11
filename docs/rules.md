# Project Rules & Decisions

This file is the single source of truth for all project-wide decisions. Update it immediately when any decision is made.

## How to use this file
- Every architecture choice, naming convention, or design pattern we agree on goes here
- Every business rule or constraint gets documented here
- If a decision overrides a previous one, update the entry (don't duplicate)
- Group entries by category for easy scanning

## Categories to track:
- **Architecture** — Tech stack choices, folder structure, state management approach
- **Naming Conventions** — Component names, file names, database columns, API routes
- **Design Patterns** — Reusable patterns, component composition rules, styling approach
- **Business Logic** — Validation rules, access control, feature flags, pricing logic
- **Integrations** — Third-party services, API keys needed, webhook configurations

Keep entries concise. One line per decision when possible.

---

## Current Decisions

### Architecture
- **Tech Stack**: Next.js App Router, React, TypeScript, Vanilla CSS Modules.
- **Backend Services**: Firebase Authentication, Cloud Firestore (NoSQL), Firebase App Hosting.
- **Rendering Strategy**: Server Components (RSC) by default; Server-Side Rendering (SSR) for public guest portals (`app/w/[eventId]/page.tsx`) to optimize LCP and SEO; Client Components (`'use client'`) for state-heavy interactive workflows (multi-step calculator, drag-and-drop seating workspace, uploader interfaces).

### Naming Conventions
- **Routing Structure**: Folder-based routing following dynamic dynamic layout structure (e.g. `app/w/[eventId]/page.tsx`, `app/w/[eventId]/photos/page.tsx`).
- **Firestore Collections**: Standardized plural collections: `users`, `suppliers`, `budgets`, `submissions`, `milestones`, `guests`, `tables`, `timeline_events`, `photos`, `collaborators`.

### Design Patterns
- **Styling System**: CSS Custom Properties (CSS variables) for HSL colors, glassmorphic translucency, and fonts.
- **Key Brand Colors**: Gold/Champagne primary accent (`#C5A880`), Deep Charcoal base text/bg (`#1A1E24`), Warm Cream main background (`#FAF8F5`).
- **Interactive States**: Transitions matching `cubic-bezier(0.4, 0, 0.2, 1)`. Canvas tables are editable via draggable SVG element nodes.

### Business Logic
- **Authentication Entry**: Deferred registration flow. Users submit contact details to save budget; system auto-creates placeholder email accounts.
- **SLA Escalation**: Submissions trigger a timestamped `pending` queue flag that must be responded to by admins within 24 hours.
- **Pricing Engine Formula**: $\text{Total Cost} = \sum (\text{Base Price}) + (\text{Guest Count} \times \sum \text{Price Per Guest})$, scaled dynamically by tier selection and location.
- **Workflow Status Transitions**: Events start as `draft` -> `submitted` -> processed by admin -> transitioned to `ongoing` upon contract execution.
