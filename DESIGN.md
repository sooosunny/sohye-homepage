# Sohye Bae Academic Site Design System

## 1. Atmosphere & Identity

The site is a quiet tourism-research portfolio: editorial, spacious, and precise. Its signature is a restrained blue-gray accent for navigation and links, with desaturated navy reserved for primary actions and a route-like research motif in the hero. Serif display type for the scholar's name balances a clear sans-serif reading layer for the rest of the interface.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Background | `--color-bg` | `#f5f7f8` | Page and navigation background |
| Surface | `--color-surface` | `#ffffff` | Cards and content surfaces |
| Border | `--color-border` | `#dfe5e9` | Navigation and control borders |
| Border/subtle | `--color-border-light` | `#edf1f3` | Section separators |
| Text/primary | `--color-text` | `#252b30` | Body and headings |
| Text/secondary | `--color-text-secondary` | `#59636b` | Navigation and supporting text |
| Text/muted | `--color-text-muted` | `#7f8a92` | Labels and metadata |
| Accent | `--color-accent` | `#526b7d` | Links, focus, active states |
| Accent/hover | `--color-accent-hover` | `#3e5566` | Interactive hover states |
| Accent/light | `--color-accent-light` | `#eef2f4` | Soft interactive hover surface |
| Navy accent | `--color-navy` | `#3e536d` | Primary buttons and motif highlights |
| Navy/hover | `--color-navy-hover` | `#2d4058` | Primary button hover state |
| Motif/muted | `--color-motif-muted` | `#8798a5` | Secondary visualization marks |

Accent is reserved for interactive elements and status cues. New controls must use existing tokens rather than introduce a new color.

Dark mode preserves the same hierarchy with `#15191d` background, `#1d2328` surfaces, cool white primary text, and lighter blue-gray interaction accents. Navigation uses a theme-specific opaque background token so the sticky header remains readable without glass or blur.

## 3. Typography

| Level | Size | Weight | Usage |
|---|---:|---:|---|
| Hero name | `3.2rem` | 600 | Scholar name on the home page |
| Page title | `2rem` | 700 | Interior page headings |
| Section title | `1.625rem` | 600 | Major section headings |
| Body | `1rem` | 400 | Main reading text |
| Navigation | `0.875rem` | 500 | Header navigation |
| Label | `0.7rem` | 500 | Section labels |

- English sans: Inter with system fallbacks.
- English display: Source Serif 4 with Georgia fallbacks.
- Korean UI and prose: Pretendard Variable with Apple SD Gothic Neo and Noto Sans KR fallbacks.
- Mono labels: IBM Plex Mono.

## 4. Spacing & Layout

Spacing uses the existing 4px-based scale from `--space-1` through `--space-24`. The wide content container is `--max-width-wide` (1000px), the reading container is `--max-width` (760px), and the sticky header uses `--nav-height` (64px desktop, 56px mobile).

## 5. Components

### Header

- **Structure**: sticky `nav` with brand, text-size controls, theme toggle, language switch, page navigation, and mobile menu toggle.
- **Variants**: English and Korean locale; desktop and mobile navigation.
- **Spacing**: `--space-6` desktop gaps, `--space-2` mobile gaps, `--space-8` icon control size. The desktop link group reserves `--nav-links-width` so English and Korean labels do not move adjacent controls.
- **States**: default, hover, active page, focus-visible, expanded mobile menu.
- **Accessibility**: semantic navigation lists, keyboard-reachable links and buttons, localized labels, visible focus ring.
- **Motion**: 150ms color and border transitions only.

### Language switch

- **Structure**: a compact `Link` with a visible `KOR` or `ENG` destination code and a localized destination label for assistive technology.
- **Variants**: target English or Korean route, preserving the current page when a counterpart exists.
- **Spacing**: `--space-8` minimum hit area with `--space-1` vertical and `--space-2` horizontal padding.
- **States**: default, hover, focus-visible.
- **Accessibility**: localized `aria-label` and `title`; the link remains visible in both desktop and mobile headers. English codes use the mono token; Korean pages intentionally inherit Pretendard Variable for typographic consistency.
- **Motion**: 150ms color and background transitions only; no blur or translucent glass treatment.

### Text size control

- **Structure**: labeled group with decrease, reset, and increase buttons.
- **States**: default, hover, focus-visible, disabled.
- **Accessibility**: localized group and button labels; disabled states expose unavailable limits.

### Theme toggle

- **Structure**: a fixed `--space-8` icon button using sun and moon SVGs.
- **States**: light, dark, hover, and focus-visible.
- **Behavior**: follows the operating-system preference on first visit and persists an explicit user choice without a first-paint flash.
- **Accessibility**: localized action label announces the mode the button will activate.

### Link button

- **Structure**: text link or button with outline or filled treatment.
- **States**: default, hover, focus-visible, active.
- **Accessibility**: native link/button semantics and visible focus.

### Hero contact links

- **Structure**: an icon-only contact list placed directly after the Email button in the shared hero action row.
- **Spacing**: the action row and fixed-size icon targets use `--space-3` gaps.
- **States**: default, hover, and focus-visible using the existing text and accent tokens.
- **Accessibility**: every decorative SVG is hidden from assistive technology; localized `aria-label` and `title` text identify each native link and retain the phone number.
- **Responsive**: links wrap naturally without creating horizontal overflow.

### Research card

- **Structure**: numbered research area, concise description, and compact topic list.
- **States**: static informational surface; no decorative hover motion.
- **Responsive**: two-column desktop grid and single-column mobile stack.
- **Accessibility**: semantic article with a labelled topic list.

## 6. Motion & Interaction

Interactive color, border, and background changes use the existing 150ms ease transition. Theme changes use the same color-only transition. The header is sticky so the language and theme controls remain available while reading. No layout properties are animated. Reduced-motion users receive the same final states without non-essential motion.

## 7. Depth & Surface

The system uses subtle blue-neutral borders for structure and an opaque sticky header to preserve context while scrolling without a glass effect. Cards and sections remain editorial and mostly border-led rather than shadow-heavy.

## 8. Accessibility Constraints & Accepted Debt

- Target WCAG 2.2 AA.
- Maintain visible focus indicators on every interactive control.
- Use native links for route changes and native buttons for state changes.
- Keep the language switch keyboard reachable and labeled even though its visual affordance is icon-only.
- Preserve readable Korean line wrapping and the user's text-size control.

No new accessibility debt is accepted by the language-switch change.
