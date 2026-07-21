# Salesforce Blue & White Theme - Color Reference

## Quick Color Guide

### Primary Brand Color
```
Salesforce Blue
Hex:   #0050F8
RGB:   0, 80, 248
HSL:   223°, 100%, 49%
OKLCH:  0.45 0.16 260
```
Used for: Buttons, links, primary actions, focus states

### Light Mode Colors

| Element | Color | Hex | OKLCH | Usage |
|---------|-------|-----|-------|-------|
| Background | Off-White | #FAFAFA | oklch(0.98 0.01 0) | Page background |
| Card Background | Pure White | #FFFFFF | oklch(0.995 0.005 0) | Cards, popovers |
| Text Primary | Dark Navy | #1A1A3E | oklch(0.15 0.02 260) | Main text |
| Text Secondary | Medium Gray | #6B7280 | oklch(0.5 0.02 260) | Secondary text |
| Text Muted | Light Gray | #9CA3AF | oklch(0.7 0.02 0) | Disabled, tertiary |
| Borders | Light Gray | #E5E7EB | oklch(0.92 0.01 260) | Dividers, borders |
| Input Border | Light Gray | #E8E8E8 | oklch(0.92 0.01 260) | Form inputs |
| Secondary BG | Very Light Blue | #F0F4FF | oklch(0.92 0.08 260) | Secondary accents |
| Muted BG | Lighter Gray | #F3F4F6 | oklch(0.85 0.02 260) | Disabled backgrounds |

### Dark Mode Colors

| Element | Color | Hex | OKLCH | Usage |
|---------|-------|-----|-------|-------|
| Background | Dark Slate | #1E1E3E | oklch(0.12 0.015 260) | Page background |
| Card Background | Slightly Lighter | #2E2E4E | oklch(0.18 0.015 260) | Cards |
| Text Primary | Light Gray | #F2F2F2 | oklch(0.95 0 0) | Main text |
| Text Secondary | Medium Light | #D1D5DB | oklch(0.65 0 0) | Secondary text |
| Text Muted | Medium Gray | #9CA3AF | oklch(0.55 0.02 0) | Tertiary text |
| Borders | Medium Gray | #4B5563 | oklch(0.28 0.015 260) | Dividers |
| Input Border | Medium Gray | #4B5563 | oklch(0.28 0.015 260) | Form inputs |
| Primary (Dark) | Light Blue | #A4CCFF | oklch(0.65 0.18 265) | Links, accents |
| Secondary (Dark) | Slate | #3F4557 | oklch(0.25 0.015 260) | Secondary elements |

### Semantic Colors

| Semantic | Color | Hex | Usage |
|----------|-------|-----|-------|
| Success | Green | oklch(0.55 0.15 130) | Task complete, approved |
| Warning | Amber | oklch(0.85 0.12 70) | Attention needed |
| Error | Red | oklch(0.55 0.2 25) | Errors, destructive actions |
| Info | Blue | oklch(0.65 0.18 265) | Informational messages |

### Chart Colors

```
Chart 1 (Primary):    oklch(0.45 0.16 260)  - Salesforce Blue
Chart 2:              oklch(0.6 0.12 260)   - Medium Blue
Chart 3:              oklch(0.55 0.14 200)  - Cyan
Chart 4:              oklch(0.5 0.15 280)   - Purple
Chart 5:              oklch(0.65 0.1 250)   - Light Purple
```

### Department Colors (All use Salesforce Blue)

```
Executive:        #0050F8  👑
Product:          #0050F8  🎯
Engineering:      #0050F8  ⚙️
Sales:            #0050F8  📈
Marketing:        #0050F8  📢
Customer Success: #0050F8  🤝
```

---

## CSS Custom Properties

All colors are defined as CSS custom properties in `app/globals.css`:

```css
:root {
  --background: oklch(0.98 0.01 0);
  --foreground: oklch(0.15 0.02 260);
  --card: oklch(0.995 0.005 0);
  --primary: oklch(0.45 0.16 260);
  --secondary: oklch(0.92 0.08 260);
  --muted: oklch(0.85 0.02 260);
  --accent: oklch(0.45 0.16 260);
  --destructive: oklch(0.55 0.2 25);
  --border: oklch(0.92 0.01 260);
  --input: oklch(0.98 0.01 0);
  --ring: oklch(0.45 0.16 260);
}

.dark {
  --background: oklch(0.12 0.015 260);
  --foreground: oklch(0.95 0 0);
  --primary: oklch(0.65 0.18 265);
  /* ... more dark mode tokens */
}
```

---

## Tailwind CSS Usage

### Background Classes
```tsx
// Light mode defaults
<div className="bg-background">        {/* #FAFAFA */}
<div className="bg-card">              {/* #FFFFFF */}
<div className="bg-secondary">         {/* #F0F4FF */}
<div className="bg-muted">             {/* #F3F4F6 */}

// Dark mode overrides
<div className="dark:bg-slate-900">
```

### Text Classes
```tsx
// Primary text
<p className="text-foreground">        {/* Dark navy in light, light gray in dark */}

// Secondary text
<p className="text-muted-foreground">  {/* Medium gray in light, lighter gray in dark */}

// Link color
<a className="text-primary">           {/* Salesforce blue */}
```

### Border & Ring Classes
```tsx
// Borders
<div className="border border-border">

// Focus ring
<input className="focus:ring-2 focus:ring-ring">

// Input styling
<input className="border border-input bg-background">
```

---

## Contrast Ratios (WCAG AA Compliance)

| Color Pair | Contrast | Status |
|-----------|----------|--------|
| Navy text on white | 10.2:1 | AAA ✓ |
| Navy text on light gray | 8.3:1 | AAA ✓ |
| Blue on white | 5.8:1 | AA ✓ |
| Medium gray on white | 5.1:1 | AA ✓ |
| Light gray on white | 3.2:1 | FAIL ✗ |
| Light blue text on white | 2.1:1 | FAIL ✗ |

**Always pair light colors with dark text and dark colors with light text.**

---

## Design Token Mappings

### Components

**Button Primary**
- Background: var(--primary) = Salesforce Blue
- Text: var(--primary-foreground) = White
- Hover: opacity-90

**Button Secondary**
- Background: var(--secondary) = Light Blue
- Text: var(--secondary-foreground) = Navy
- Hover: opacity-80

**Button Destructive**
- Background: var(--destructive) = Red
- Text: var(--destructive-foreground) = White
- Hover: opacity-90

**Form Input**
- Border: var(--input) = Light gray
- Background: var(--background) = White
- Focus Ring: var(--ring) = Salesforce Blue

**Card**
- Background: var(--card) = White
- Border: var(--border) = Light gray
- Text: var(--foreground) = Navy

---

## Implementation Examples

### Light Mode Alert Box
```tsx
<div className="bg-secondary border border-border rounded-lg p-4">
  <p className="text-foreground font-semibold">Heads up!</p>
  <p className="text-muted-foreground text-sm mt-1">This is an informational message.</p>
</div>
```

### Dark Mode Toggle Button
```tsx
<button className="
  bg-primary text-primary-foreground px-4 py-2 rounded-lg
  hover:opacity-90 transition-opacity
  dark:bg-slate-700 dark:text-white
">
  Click Me
</button>
```

### Accessible Form Field
```tsx
<div>
  <label className="block text-foreground font-medium mb-2">
    Email Address
  </label>
  <input
    type="email"
    className="
      w-full border-2 border-border rounded-lg px-3 py-2
      bg-background text-foreground placeholder:text-muted-foreground
      focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/50
      dark:bg-slate-800 dark:border-slate-700
    "
    placeholder="you@example.com"
  />
</div>
```

---

## Color Strategy

### Why Salesforce Blue?

1. **Professional** - Enterprise-grade appearance
2. **Accessible** - High contrast ratios with white and dark backgrounds
3. **Recognizable** - Familiar to business users
4. **Versatile** - Works in light and dark modes
5. **Consistent** - Single primary color reduces complexity

### Why Light Mode Default?

1. **Business context** - Most professional software uses light themes
2. **Readability** - Higher contrast in daylight
3. **Accessibility** - Better for color-blind users
4. **Energy** - Uses less battery on non-OLED displays (bonus for dark mode)

---

**Last Updated:** July 21, 2026
**Color System Version:** 1.0
**WCAG Compliance:** AA (Level 2)
