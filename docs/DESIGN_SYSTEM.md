# IntegrateWise Design System

## Theme: Salesforce Blue & White

The IntegrateWise OS uses a professional, clean design system inspired by Salesforce's enterprise design language. This ensures accessibility, readability, and a professional appearance across all departments.

## Color Palette

### Primary Colors

- **Salesforce Blue** `oklch(0.45 0.16 260)` / `#0050F8` - Primary actions, buttons, links
- **Background White** `oklch(0.98 0.01 0)` / `#FAFAFA` - Main background (light mode)
- **Card White** `oklch(0.995 0.005 0)` / `#FFFFFF` - Card and popover backgrounds

### Secondary Colors

- **Light Blue** `oklch(0.92 0.08 260)` - Secondary backgrounds, accents
- **Light Gray** `oklch(0.85 0.02 260)` - Muted content, disabled states
- **Border Gray** `oklch(0.92 0.01 260)` - Dividers and borders

### Text Colors

- **Dark Navy** `oklch(0.15 0.02 260)` - Primary text
- **Medium Gray** `oklch(0.5 0.02 260)` - Secondary text, muted foreground
- **Light Gray** `oklch(0.7 0.02 260)` - Tertiary text

### Semantic Colors

- **Success** `oklch(0.55 0.15 130)` - Green - Task complete, active status
- **Warning** `oklch(0.85 0.12 70)` - Amber - Attention needed
- **Destructive** `oklch(0.55 0.2 25)` - Red - Errors, deletions
- **Info** `oklch(0.65 0.18 265)` - Blue - Informational messages

### Dark Mode

- **Dark Background** `oklch(0.12 0.015 260)` - Main background
- **Dark Card** `oklch(0.18 0.015 260)` - Card backgrounds
- **Light Text** `oklch(0.95 0 0)` - Primary text
- **Muted Text** `oklch(0.65 0 0)` - Secondary text

## Typography

### Font Family
- **Headings**: Inter (Variable)
- **Body**: Inter (Variable)
- **Monospace**: Geist Mono

### Font Sizes & Weights

- **h1**: 32px, 700 (bold)
- **h2**: 28px, 600 (semibold)
- **h3**: 24px, 600 (semibold)
- **h4**: 20px, 600 (semibold)
- **Body Large**: 16px, 400 (regular)
- **Body**: 14px, 400 (regular)
- **Small**: 12px, 400 (regular)
- **Caption**: 11px, 500 (medium)

### Line Height
- **Headings**: 1.2
- **Body**: 1.5 (leading-relaxed)
- **Tight**: 1.3

## Spacing Scale

Uses Tailwind's default spacing scale (multiples of 0.25rem):
- `px` = 0.0625rem = 1px
- `2` = 0.5rem = 8px
- `4` = 1rem = 16px
- `6` = 1.5rem = 24px
- `8` = 2rem = 32px
- `12` = 3rem = 48px
- `16` = 4rem = 64px

## Border Radius

- **sm**: 0.125rem (2px)
- **md**: 0.25rem (4px)
- **lg**: 0.5rem (8px)
- **xl**: 0.75rem (12px)
- **full**: 9999px (rounded)

## Shadow System

- **xs**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **sm**: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

## Component Guidelines

### Buttons

- **Primary**: Salesforce Blue background, white text
- **Secondary**: Light blue background, navy text
- **Tertiary**: Transparent, navy text
- **Destructive**: Red background, white text
- **Disabled**: Light gray background, medium gray text

### Cards

- **Background**: White (light mode) or dark gray (dark mode)
- **Border**: Subtle light gray
- **Padding**: 20px (lg) or 16px (md)
- **Radius**: 8px

### Forms

- **Input Border**: Light gray (`oklch(0.92 0.01 260)`)
- **Input Focus**: Blue ring
- **Label**: Navy text, 14px medium
- **Validation**: Green (success), amber (warning), red (error)

### Navigation

- **Sidebar Background**: White (light) or dark gray (dark)
- **Active Link**: Salesforce Blue text or background
- **Hover**: Light blue background

### Charts

- **Primary Series**: `oklch(0.45 0.16 260)` - Salesforce Blue
- **Series 2**: `oklch(0.6 0.12 260)` - Medium blue
- **Series 3**: `oklch(0.55 0.14 200)` - Cyan
- **Series 4**: `oklch(0.5 0.15 280)` - Purple
- **Series 5**: `oklch(0.65 0.1 250)` - Light purple

## Implementation

### Tailwind Classes

Use semantic classes for consistency:

```tsx
// Light backgrounds
<div className="bg-background">     {/* Page background */}
<div className="bg-card">           {/* Cards, popovers */}

// Text
<h1 className="text-foreground">   {/* Primary text */}
<p className="text-muted-foreground"> {/* Secondary text */}

// Interactive
<button className="bg-primary text-primary-foreground">
<a className="text-primary">

// Borders
<div className="border border-border">
<input className="border border-input focus:ring-2 ring-ring">
```

### Dark Mode

Use the `dark:` prefix for dark mode overrides:

```tsx
<div className="bg-background dark:bg-slate-900 text-foreground dark:text-slate-50">
```

Or leverage CSS custom properties:

```css
:root {
  --background: white;
}

.dark {
  --background: dark-color;
}
```

## Department Color System

Each department maintains the primary Salesforce Blue but uses emoji for visual distinction:

- **Executive** 👑 - Leadership color
- **Product** 🎯 - Strategy color
- **Engineering** ⚙️ - Technical color
- **Sales** 📈 - Performance color
- **Marketing** 📢 - Communication color
- **Customer Success** 🤝 - Relationship color

## Accessibility

- **Contrast Ratio**: All text meets WCAG AA (4.5:1 minimum)
- **Focus States**: Visible 2px ring around interactive elements
- **Keyboard Navigation**: All elements accessible via keyboard
- **Color Independence**: Don't rely on color alone; use labels, text, and icons
- **Reduced Motion**: Respect `prefers-reduced-motion` in animations

## Responsive Breakpoints

- **sm**: 640px (tablet)
- **md**: 768px (small laptop)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large)

Use mobile-first approach: base styles for mobile, add `sm:`, `md:`, etc. for larger screens.

## Usage Examples

### Clean Card Layout
```tsx
<div className="bg-card border border-border rounded-lg p-6 shadow-sm">
  <h2 className="text-foreground font-semibold">Title</h2>
  <p className="text-muted-foreground text-sm mt-2">Description</p>
</div>
```

### Button Styles
```tsx
// Primary
<button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">
  Action
</button>

// Secondary
<button className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-opacity-80">
  Secondary
</button>
```

### Form Input
```tsx
<input
  type="text"
  className="w-full border border-input rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
  placeholder="Enter value..."
/>
```

## References

- Tailwind CSS: https://tailwindcss.com
- Salesforce Design System: https://www.lightningdesignsystem.com
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
