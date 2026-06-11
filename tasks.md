# Implementation Checklist — One Minute Event

This checklist is the source of truth for the implementation order of the One Minute Event platform. It maps out each development phase and sub-task in sequence.

## Phase 1: Environment Setup & Foundation (Next.js) ✅
- [x] Initialize Next.js project with App Router, TypeScript, and ESLint in `./`
- [x] Define global design tokens in `app/globals.css` (custom HSL variables, glassmorphism templates, typography)
- [x] Set up App Router folders for pages:
  - [x] Home (`app/page.tsx`)
  - [x] Questionnaire (`app/calculator/page.tsx`)
  - [x] Login (`app/login/page.tsx`)
  - [x] Dashboard (`app/dashboard/page.tsx`)
  - [x] Guest Portal / Wedding Website (`app/w/[eventId]/page.tsx` - SSR)
  - [x] Guest Photo Upload (`app/w/[eventId]/photos/page.tsx`)
  - [x] Admin Panel (`app/admin/page.tsx`)
  - [x] About Page (`app/about/page.tsx`)
  - [x] Legal Disclaimer (`app/disclaimer/page.tsx`)

## Phase 2: Budget Questionnaire & Calculator (Core Flow) ✅
- [x] Create mock suppliers data model (local JSON structure for offline testing)
- [x] Build multi-step Questionnaire component skeleton
- [x] Implement step-by-step form navigation with validation:
  - [x] Step 1: Location & Guest range
  - [x] Step 2: Venue ownership status & setting (conditional) + Tent type (conditional)
  - [x] Step 3: Cocktail Area & Dining furniture toggles
  - [x] Step 4: Flower arrangement checkbox lists
  - [x] Step 5: Catering, Lighting, and Other Services checklists
- [x] Build the Pricing Engine (calculate totals using location, tier, and guest size)
- [x] Build Step 6: Review Page (dynamic cost breakdown summary + SVG donut chart)

## Phase 3 — Internationalization (i18n) ✅

- [x] Restructure Next.js App Router for dynamic `[lang]` routing
- [x] Implement locale detection and redirection middleware
- [x] Set up JSON dictionaries for PT and EN
- [x] Refactor Homepage and Calculator to use translated dictionaries
- [x] Add Language Switcher to the Navigation bar

## Phase 4 — Firebase Integration & Submissions Flow (IN PROGRESS)
- [ ] Connect Firebase SDK (Auth and Firestore) to the React application
- [ ] Implement Firebase Auth system (Email/Password & password-reset flow)
- [x] Build Lead Submission modal (collect Name, Email, Phone) and send email via Resend
- [ ] Save lead details securely in Firestore with proper Security Rules
  - [ ] Create `submissions` and `budgets` documents in Firestore on submit
  - [ ] Trigger deferred account registration (create placeholder account with email)
  - [ ] Automatically log user in and display credentials setup dashboard instructions
- [ ] Write Firestore security rules (restrict users to their own data, allow admins read/write access)

## Phase 4: Client Personalized Space (Dashboard) & Planning Tools
- [ ] Build `/dashboard` grid layout structure & sidebar navigation
- [ ] Implement Countdown Widget (days/hours/minutes until wedding date)
- [ ] Build Milestone Checklist widget:
  - [ ] Add milestone complete/incomplete toggle with check animations
  - [ ] Initialize default system milestones (e.g., "Review contract", "Initial payment") on account creation
- [ ] Build Vendor Booking summary module (displays details of selected vendors)
- [ ] Create client preference editor (allows clients to tweak selections and dynamically update budget estimate)

### Guest List & RSVP Management
- [ ] Define guest schema in Firestore (Name, Group, RSVP Status, Food Preferences, Table Assignment)
- [ ] Build Guest List Management grid in dashboard:
  - [ ] Add, edit, and delete guest records
  - [ ] CSV import/export utility for guest contacts
  - [ ] RSVP status breakdown widgets (Attending, Declined, Pending)
- [ ] Build Guest RSVP Portal & Public Wedding Website (`app/w/[eventId]/page.tsx`):
  - [ ] Customizable theme picker for couple (Modern, Rustic, Minimal, Floral)
  - [ ] Public sections: Love Story, Event Details, Photo Gallery, Gift Registry links
  - [ ] Interactive Guest RSVP form (collects RSVP status, meal preferences, and song requests)
  - [ ] Real-time synchronization (RSVP submissions instantly update client dashboard)

### Interactive Seating Chart Builder
- [ ] Create seating workspace canvas:
  - [ ] Add round, rectangular, or banquet tables to canvas
  - [ ] Scale tables by seat count (e.g., 6-seater, 8-seater, 10-seater)
- [ ] Implement drag-and-drop seating logic:
  - [ ] Sidebar containing guest list filtered by "Unassigned" status
  - [ ] Drag guests onto specific seats at tables
  - [ ] Auto-group guests by family/group properties
  - [ ] Export seating chart as printable PDF/PNG

### Wedding Day Itinerary (Timeline) Builder
- [ ] Build chronological timeline editor:
  - [ ] Add events with times, durations, and vendor assignments
  - [ ] Drag-and-drop timeline reordering
  - [ ] Print/Export day-of timeline for vendors and coordinator

### Shared Photo Album & Collaborators
- [ ] Build Event Gallery module:
  - [ ] Generate unique QR code for the wedding site
  - [ ] Mobile web upload interface (`app/w/[eventId]/photos/page.tsx`) where guests upload photos from their phones
  - [ ] Photo grid with password-protected galleries
- [ ] Implement Collaborator invite system:
  - [ ] Invite co-planners (partner, coordinator) via invite token links
  - [ ] Manage collaborator edit permissions in Firestore rules

## Phase 5: Admin Workstation
- [ ] Secure `/admin` route with role-based checks (redirect non-admins to `/dashboard` or `/`)
- [ ] Build Submissions Queue grid (shows submissions list with status, tier, and dates)
- [ ] Build Submission Details panel (slides out/opens modal):
  - [ ] Allow admins to edit specific budget selection line items
  - [ ] Create Response input box for admin notes
  - [ ] Add status transition options (e.g., moving state to `contacted` or `ongoing`)
- [ ] Implement "Ongoing" event logic (lock selections, generate payment milestones)

## Phase 6: Design Polish & Accessibility (A11y)
- [ ] Implement micro-animations:
  - [ ] Smooth slide transition between calculator steps
  - [ ] Scale-up and hover glow on selection cards
  - [ ] SVG drawing path checkmark animation on complete milestones
- [ ] Conduct accessibility (a11y) check:
  - [ ] Ensure all body and accent text achieves a contrast ratio $\ge 4.5:1$
  - [ ] Add descriptive aria labels to all toggles, ranges, and selectors
  - [ ] Enable full keyboard tab-navigation and focus outline indicators
- [ ] Verify responsive layouts on mobile, tablet, and desktop viewports
