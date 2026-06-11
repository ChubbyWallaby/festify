# Brand & Design Guidelines

## 1. Design System & Color Palette

The brand identity of **One Minute Event** is defined by sophistication, clarity, and emotional connection. The design must feel high-end, invoking the celebratory atmosphere of a wedding while maintaining clean, structural utility.

We utilize a modern, high-contrast palette highlighting warm metallic accents, deep structural shadows, and light organic backgrounds.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Brand Colors                              │
├───────────────────┬───────────────────┬────────────────────────────────┤
│  Champagne Gold   │  Deep Charcoal    │  Warm Cream (Base)             │
│  #C5A880          │  #1A1E24          │  #FAF8F5                        │
│  HSL(35, 38%, 64%)│  HSL(216, 17%, 12%)│  HSL(36, 20%, 98%)              │
├───────────────────┼───────────────────┼────────────────────────────────┤
│  Blush Pink       │  Sage Green       │  Alabaster White               │
│  #D4A5A5          │  #A8B5A2          │  #FFFFFF                       │
│  HSL(0, 34%, 74%) │  HSL(99, 11%, 67%)│  HSL(0, 0%, 100%)              │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

### CSS Custom Properties (`index.css` setup)
```css
:root {
  /* Color Tokens */
  --color-primary: hsl(35, 38%, 64%);       /* Champagne Gold */
  --color-primary-hover: hsl(35, 38%, 54%);
  --color-dark: hsl(216, 17%, 12%);          /* Deep Charcoal */
  --color-light: hsl(36, 20%, 98%);          /* Warm Cream */
  --color-white: hsl(0, 0%, 100%);
  --color-blush: hsl(0, 34%, 74%);           /* Blush Pink Accent */
  --color-success: hsl(142, 72%, 29%);       /* Forest Success */
  --color-error: hsl(347, 77%, 45%);         /* Crimson Error */

  /* Structural Tokens */
  --glass-bg: rgba(255, 255, 255, 0.45);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.04);
  --border-radius-sm: 8px;
  --border-radius-md: 16px;
  --border-radius-lg: 24px;
  
  /* Fonts */
  --font-serif: 'Cormorant Garamond', 'Playfair Display', serif;
  --font-sans: 'Outfit', 'Inter', sans-serif;
  
  /* Animation Speeds */
  --transition-fast: 0.15s ease-out;
  --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 2. Typography

Our typography balances editorial, luxury headers with highly legible structural data.

*   **Display / Headings (h1, h2, h3)**: Use Serif fonts. Set font weight to light or regular (300/400). Apply a subtle letter-spacing for premium editorial tone.
*   **Body & UI Controls (labels, inputs, buttons, body)**: Use Sans-Serif fonts. Set weight to regular/medium (400/500) for screen readability.

```css
h1, h2, h3 {
  font-family: var(--font-serif);
  color: var(--color-dark);
  letter-spacing: -0.02em;
}

body, button, input, select {
  font-family: var(--font-sans);
  color: var(--color-dark);
}
```

---

## 3. UI Component Patterns

### 3.1 Glassmorphic Selection Cards
*   Cards for selecting venues, catering, and decor must feel light and layered.
*   **Default State**:
    ```css
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    border-radius: var(--border-radius-md);
    transition: transform var(--transition-smooth), border-color var(--transition-fast);
    ```
*   **Hover State**: Scale card up slightly (`scale(1.02)`), darken border, and elevate shadow.
*   **Selected State**: Replace border-color with `var(--color-primary)` (Champagne Gold), and show a custom SVG checkmark drawn in the top right corner.

### 3.2 Navigation Stepper
*   A horizontal bar mapping progress (Guests -> Venue -> Catering -> Extras -> Summary).
*   Completed steps show a solid green/gold check mark.
*   Current step exhibits an pulsing gold glow.
*   Future steps remain low-opacity gray.

### 3.3 Interactive Dashboard Widgets
*   **Checklist**: Items appear as lists. When clicked, a strike-through line expands dynamically, and the checkbox completes with a scale-up pop.
*   **Donut Chart**: Transparent base SVG ring with path-animation calculating dashboard categories in real-time.

---

## 4. Responsive Rules & Accessibility (A11y)

### Responsive Layouts:
*   Use CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for card layouts.
*   Implement container queries for list widgets (e.g., inside the dashboard sidebar) so metadata rearranges smoothly when resized.
*   Use mobile-first layout design for step forms; stack vendor cards vertically on smaller viewports.

### Accessibility Standards:
*   **Contrast**: Keep all text elements above a $4.5:1$ contrast ratio relative to their background. For gold accents, use dark background layers or darken the gold text value (`var(--color-primary-hover)`).
*   **Focus States**: Never suppress outline indicators. Custom focus rings must use:
    ```css
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
    ```
*   **Tab Navigation**: All interactive stepper points, card option buttons, and form inputs must have descriptive tags (`aria-label`, `aria-describedby`) and tab-indices for keyboard navigation.
*   **ARlA Live Zones**: Implement `aria-live="polite"` on the final budget summary card, ensuring screen readers announce updated pricing when guest counts or tiers change.
