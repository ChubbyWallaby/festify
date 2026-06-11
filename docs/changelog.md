# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Lead Submission Step (Step 7) in the Calculator to collect user details (Name, Email, Phone)
- Resend API integration via Next.js Server Action (`submit-lead.ts`) to email the lead's estimate and details
- Internationalization (i18n) support with dynamic `/[lang]/` routing
- English (`en`) and Portuguese (`pt`) dictionary files
- Locale detection middleware defaulting to Portuguese (`pt`)
- Language toggle switch in `SiteNav` component

## [Phase 2] — 2026-06-11

### Added
- Created foundational Product Requirement Documents (PRDs):
  - `docs/masterplan.md`: Defines product vision, value proposition, and success metrics.
  - `docs/implementation.md`: Technical architecture, database schemas, and gantt roadmaps.
  - `docs/design.md`: Custom CSS properties styling system and design component tokens.
  - `docs/app-flow.md`: User journeys, screen maps, navigation states, and dynamic page rules.
- Created `docs/rules.md`: Single source of truth for architectural choices, naming conventions, and logic.
- Created `tasks.md` in the root: Implementation order checklist for engineering.
- Added feature specifications matching `planning.wedding/pt` (Seating chart workspace canvas, Guest list manager, RSVP portal, Day-of timeline, QR code photo uploads, Collaborator permissions).

### Changed
- Transitioned technical architecture foundation from Vite React SPA to Next.js App Router and React Server Components (RSC) to support SSR on guest-facing pages.
- Dynamic route URLs in `app-flow.md` and `tasks.md` converted to Next.js App Router paths (e.g., `/w/[eventId]`).

### Fixed
- (none yet)

---

**Format for new entries:**
- **Added** for new features
- **Changed** for changes in existing functionality
- **Fixed** for bug fixes
- **Removed** for removed features
- **Security** for security improvements

**Rules:**
- Add a new entry after every completed task or group of related tasks
- Include the date, a short description, and files affected
- This is a historical log — never edit or delete past entries
