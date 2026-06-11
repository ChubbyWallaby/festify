# Original User Request

## Initial Request — 2026-06-11T16:04:01+01:00

Build Phase 2 of **One Minute Event** — a Next.js wedding planning web app.
Phase 1 (routing, global CSS design tokens, layout shell) is already complete.
Phase 2 adds the entire interactive budget calculator: a 5-step questionnaire,
a pricing engine, and an animated review/summary page.

Working directory: /Users/ctw03023/festify
Integrity mode: development

---

## Context

The project uses:
- **Next.js 16 App Router** with TypeScript (strict mode)
- **Vanilla CSS Modules** for styling (no Tailwind — global tokens already defined in `app/globals.css`)
- **React hooks** (`useState`, `useReducer`) for state — no external state library
- Global design tokens already exist: `--color-primary` (Champagne Gold), `--color-dark`, glassmorphic card class `.glass-card`, button classes `.btn .btn-primary`, etc.
- The calculator shell lives at `app/calculator/page.tsx` — replace its placeholder content

**Key docs to read before coding:**
- `/Users/ctw03023/festify/docs/implementation.md` — full data schemas and feature spec
- `/Users/ctw03023/festify/docs/design.md` — brand colors, glassmorphism patterns, typography rules
- `/Users/ctw03023/festify/docs/rules.md` — architectural decisions
- `/Users/ctw03023/festify/tasks.md` — source of truth; mark Phase 2 tasks `[x]` when done

---

## Requirements

### R1. Mock Supplier Data Model
Create a local TypeScript data file (e.g. `lib/data/suppliers.ts` or `lib/data/mockSuppliers.json`) that provides static pricing data for the calculator engine. It must include base prices and per-guest prices for: venue, catering, decor/flowers, lighting, tent, photography, videography, DJ/band, and furniture — covering at least two pricing tiers (standard and premium) and at least three locations (matching the schema in `docs/implementation.md`). No external API calls — this is offline mock data only. Use realistic-ish Portuguese wedding market figures (e.g. catering ~€80–120/guest, venues €5k–20k, photography €2k–5k, etc.).

### R2. Multi-Step Budget Questionnaire (5 Steps)
Build an interactive `'use client'` multi-step form at `app/calculator/page.tsx` (or composed from `components/calculator/`). The form must implement all 5 steps defined in `docs/implementation.md` Section 3.1:

- **Step 1**: Location selector (North, Center, Lisbon, Alentejo, Algarve) + guest count range picker (50-100, 100-150, 150-200, 200-250, 250, 300, more than 300)
- **Step 2**: Venue ownership toggle (Yes/No); if No → venue setting selector (Country Place, Palace/Castle/Convent, Beach, City/Urban, Garden, Mountain/Highland, Resort/Hotel); tent toggle + tent type (Tarki, 2-sided, Indian, other) — conditionally shown
- **Step 3**: Cocktail Area furniture toggle + Dining/Party Area furniture toggle
- **Step 4**: Flowers toggle; if Yes → multi-select checklist of flower arrangement types (Bouquet, Boutonnieres, Petal Basket, Sacrarium Arrangement, Altar Arrangement, Exterior Church Arrangement, Cocktail Area, Round Table Centerpieces, Rectangular Table Centerpieces, Buffets)
- **Step 5**: Catering toggle + Lighting toggle + multi-select checklist of other services (Photographer, Videographer, DJ, Entertainment Service, Band, Designer/Graphic)

Each step must validate required fields before allowing forward navigation. A horizontal stepper progress bar must be visible at all times showing the current step (1–5) with completed steps marked.

### R3. Pricing Engine
Implement a pure TypeScript function (e.g. `lib/pricing/engine.ts`) that takes the completed questionnaire selections and the mock supplier data, and returns a detailed cost breakdown object. The formula is:

```
Total Cost = Σ(Base Price per selected service) + (Guest Count × Σ(Price Per Guest for applicable services))
```

The engine must return per-category line items (venue, catering, decor, lighting, entertainment, etc.) as well as a grand total. Location and tier selection must influence the pricing multiplier.

### R4. Review Page (Step 6 — Summary)
After Step 5, display a summary/review page that shows:
- A **dynamic SVG donut chart** animating in on mount, with each segment representing a budget category and its percentage of the total
- An **itemised cost breakdown table** listing each selected service, its unit cost, and its subtotal
- The **grand total** displayed prominently
- A **"Get My Quote"** call-to-action button (clicking it will open a modal in Phase 3 — for now it can show a placeholder toast/alert)
- The design must use the existing glassmorphic card patterns and gold accent tokens from `globals.css`

---

## Acceptance Criteria

### Multi-Step Form
- [ ] All 5 steps render and are navigable (Next / Back buttons functional)
- [ ] Step 2 conditional fields (venue setting, tent type) only appear when relevant toggle is active
- [ ] Step 4 flower checklist only appears when the flowers toggle is Yes
- [ ] Clicking Next on an incomplete required field shows a visible inline validation error
- [ ] The stepper bar updates to reflect the current and completed steps at every navigation action

### Pricing Engine
- [ ] Changing location or guest count produces a different total cost
- [ ] Selecting additional services (e.g. photographer, band) increases the total
- [ ] Deselecting a service removes its cost from the total
- [ ] The per-category breakdown sums correctly to the grand total (no rounding discrepancy > €1)

### Review Page
- [ ] SVG donut chart renders with at least 2 visible segments when 2+ categories are selected
- [ ] Each segment is labelled (either inline or via a legend) with the category name and percentage
- [ ] The itemised table rows match the selected services — no phantom or missing line items
- [ ] Grand total displayed matches the sum of all line item subtotals

### Code Quality
- [ ] TypeScript compiles with zero errors (`npx tsc --noEmit` from `/Users/ctw03023/festify`)
- [ ] No hardcoded magic numbers in components — all pricing logic lives in the engine file
- [ ] Styling uses CSS Modules or existing global utility classes — no inline `style={{}}` for layout (inline style only acceptable for dynamic values like SVG paths/dimensions)
- [ ] After completing all Phase 2 tasks, mark them `[x]` in `/Users/ctw03023/festify/tasks.md`
- [ ] Update `/Users/ctw03023/festify/docs/changelog.md` with a Phase 2 entry
