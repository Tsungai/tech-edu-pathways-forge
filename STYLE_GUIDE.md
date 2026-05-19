# TechEdu Academy — Style Guide

This document captures the current visual design system used across the TechEdu Academy website and dashboards. All tokens are defined in `src/index.css` and exposed through Tailwind in `tailwind.config.ts`. Components should always reference semantic tokens — never hardcoded colors.

---

## 1. Design Principles

- **Clean & professional** — built for an education brand (LMS + marketing site).
- **Emerald primary, blue secondary** — trust + growth pairing.
- **Light by default, dark mode supported** — both themes share the same primary hue.
- **Semantic tokens only** — no `text-white`, `bg-black`, or raw hex values in components.
- **shadcn/ui + Tailwind** as the component foundation, customized via CSS variables.

---

## 2. Color System

All colors are stored as **HSL triplets** (no `hsl()` wrapper) so they can be composed with Tailwind's opacity modifiers (e.g. `bg-primary/80`).

### 2.1 Light theme (`:root`)

| Token | HSL | Usage |
|---|---|---|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `222.2 47% 11%` | Default text |
| `--card` | `0 0% 100%` | Card surfaces |
| `--card-foreground` | `222.2 47% 11%` | Text on cards |
| `--popover` | `0 0% 100%` | Popovers, dropdowns |
| `--popover-foreground` | `222.2 47% 11%` | Text in popovers |
| `--primary` | `160 84% 39%` | Emerald — CTAs, brand accents |
| `--primary-foreground` | `0 0% 100%` | Text on primary |
| `--secondary` | `220 70% 50%` | Blue — secondary actions |
| `--secondary-foreground` | `0 0% 100%` | Text on secondary |
| `--muted` | `210 40% 96%` | Subtle backgrounds |
| `--muted-foreground` | `215 16% 47%` | Secondary text |
| `--accent` | `160 60% 97%` | Light emerald wash |
| `--accent-foreground` | `160 84% 39%` | Emerald text on accent |
| `--destructive` | `0 84% 60%` | Errors, delete actions |
| `--destructive-foreground` | `0 0% 100%` | Text on destructive |
| `--border` | `214 32% 91%` | Dividers, card borders |
| `--input` | `214 32% 91%` | Input borders |
| `--ring` | `160 84% 39%` | Focus ring (emerald) |

### 2.2 Dark theme (`.dark`)

| Token | HSL |
|---|---|
| `--background` | `222 47% 11%` |
| `--foreground` | `0 0% 100%` |
| `--card` | `217 33% 17%` |
| `--popover` | `217 33% 17%` |
| `--primary` | `160 84% 39%` *(unchanged — brand consistency)* |
| `--secondary` | `220 70% 50%` |
| `--muted` | `217 33% 17%` |
| `--muted-foreground` | `215 20% 65%` |
| `--accent` | `217 33% 20%` |
| `--destructive` | `0 63% 31%` |
| `--border` / `--input` | `217 33% 17%` |
| `--ring` | `160 84% 39%` |

### 2.3 Sidebar tokens

Used by the dashboard `Sidebar` component (admin, teacher, student, student-admin layouts).

| Token (light → dark) |
|---|
| `--sidebar-background` `0 0% 98%` → `240 5.9% 10%` |
| `--sidebar-foreground` `240 5.3% 26.1%` → `240 4.8% 95.9%` |
| `--sidebar-primary` `240 5.9% 10%` → `224.3 76.3% 48%` |
| `--sidebar-primary-foreground` `0 0% 98%` → `0 0% 100%` |
| `--sidebar-accent` `240 4.8% 95.9%` → `240 3.7% 15.9%` |
| `--sidebar-accent-foreground` `240 5.9% 10%` → `240 4.8% 95.9%` |
| `--sidebar-border` `220 13% 91%` → `240 3.7% 15.9%` |
| `--sidebar-ring` `217.2 91.2% 59.8%` |

### 2.4 Usage examples

```tsx
// ✅ Do
<button className="bg-primary text-primary-foreground hover:bg-primary/90" />
<div className="border-border bg-card text-card-foreground" />

// ❌ Don't
<button className="bg-emerald-500 text-white" />
<div className="border-gray-200 bg-white text-slate-900" />
```

---

## 3. Typography

- **Font family:** Tailwind/system default stack (no custom Google Font currently loaded). Headings rely on weight + size, not a display face.
- **Base size:** 16px (Tailwind default), `text-foreground` for body copy.
- **Hierarchy** (typical usage in marketing components):
  - Hero headline: `text-4xl md:text-6xl font-bold`
  - Section title: `text-3xl md:text-4xl font-bold`
  - Card title (`CardTitle`): `text-2xl font-semibold leading-none tracking-tight`
  - Card description: `text-sm text-muted-foreground`
  - Body: `text-base` / `text-sm`
  - Micro/labels: `text-xs font-medium`

### Sticky header sample
```tsx
<span className="text-xl font-bold text-primary-foreground">TechEdu Academy</span>
<a className="text-muted-foreground hover:text-primary transition-colors">Courses</a>
```

---

## 4. Spacing, Radius & Layout

- **Radius scale** (from `--radius: 0.5rem`):
  - `rounded-sm` → `calc(0.5rem - 4px)`
  - `rounded-md` → `calc(0.5rem - 2px)`
  - `rounded-lg` → `0.5rem`
  - `rounded-full` for pills, badges, avatars.
- **Container:** centered, `px-2rem`, `2xl` capped at `1400px` (`tailwind.config.ts`).
- **Section padding:** `py-16 md:py-24` is the standard rhythm on marketing sections.
- **Card padding:** `p-6` header / `p-6 pt-0` content (shadcn default).
- **Grid gaps:** `gap-6` for card grids, `gap-4` for tight clusters.

---

## 5. Elevation & Borders

- **Borders:** always `border-border` (light) / inherits in dark.
- **Shadow scale:** Tailwind defaults — `shadow-sm` for cards, `shadow-lg` for dialogs/popovers, `shadow-xl` for hero CTAs.
- **Backdrop blur:** sticky header uses `backdrop-blur-md` over a translucent slate gradient.

---

## 6. Components (shadcn/ui variants in use)

### Button (`src/components/ui/button.tsx`)
Variants: `default` (primary), `destructive`, `outline`, `secondary`, `ghost`, `link`.
Sizes: `default` (h-10), `sm` (h-9), `lg` (h-11), `icon` (10×10).
Focus ring uses `--ring`. Always icon size 16px via `[&_svg]:size-4`.

### Badge
Variants: `default`, `secondary`, `destructive`, `outline`. Rounded-full, `text-xs font-semibold`.

### Card
`rounded-lg border bg-card text-card-foreground shadow-sm`. Compose with `CardHeader / CardTitle / CardDescription / CardContent / CardFooter`.

### Dialog
Overlay `bg-black/80` + content `bg-background border shadow-lg`, animated with `data-[state=open]:animate-in` patterns. Max width `max-w-lg` by default.

### Alert
Two variants: `default` and `destructive` (uses `--destructive` for border + icon).

---

## 7. Motion

- **Accordion:** `accordion-down` / `accordion-up` keyframes (0.2s ease-out).
- **Dialog / popover:** shadcn's `data-[state=open]:animate-in` + `fade-in-0`, `zoom-in-95`, `slide-in-from-top-[48%]`.
- **Sticky header:** `translate-y` + `opacity` transition over `300ms`.
- **Hover:** primary buttons darken to `bg-primary/90`; links shift from `text-muted-foreground` → `text-primary`.

Keep motion subtle — 150–300 ms, ease-out. No bouncing or large parallax on production marketing pages.

---

## 8. Iconography

- **Library:** [`lucide-react`](https://lucide.dev).
- **Default size:** 16px inside buttons (`[&_svg]:size-4`), 20–28px in headers (`h-7 w-7`), 16–20px in nav items.
- **Color:** inherits `currentColor` — pair with `text-primary`, `text-muted-foreground`, etc.

---

## 9. Branding Surfaces

- **Sticky header** (`src/components/StickyHeader.tsx`) uses a custom dark gradient:
  ```
  bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/80
  backdrop-blur-md border-b border-slate-800/50
  ```
  This is an intentional brand surface and the **only** place where slate-* utilities are used directly.
- **Course cards** use soft tinted gradients (`bg-gradient-to-br from-<color>-50 to-<color>-50 border-<color>-300`) to differentiate programs. These are decorative per-card accents, not part of the global token system.

---

## 10. Dark Mode

- Toggled by applying the `.dark` class on `<html>` (Tailwind `darkMode: ["class"]`).
- All semantic tokens have a dark counterpart — components automatically adapt; no `dark:` variants needed for color.
- Use `dark:` variants only for **non-color** changes (e.g. swapping an illustration).

---

## 11. Do / Don't Cheatsheet

✅ Do
- Use semantic tokens: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-muted-foreground`.
- Add new colors by extending `src/index.css` (HSL) **and** `tailwind.config.ts`.
- Reuse shadcn primitives; customize via `cva` variants rather than ad-hoc class strings.
- Keep focus states visible — rely on `focus-visible:ring-ring`.

❌ Don't
- Don't hardcode hex/rgb in components.
- Don't introduce a new font without updating this guide.
- Don't add slate-/emerald-/blue- utilities outside the few branded surfaces listed above.
- Don't disable focus rings.

---

_Last updated: 2026-05-19. Source of truth: `src/index.css` and `tailwind.config.ts`._
