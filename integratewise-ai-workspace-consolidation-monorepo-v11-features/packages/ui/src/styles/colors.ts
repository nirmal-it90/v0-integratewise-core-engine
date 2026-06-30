/**
 * IntegrateWise Official Color Palette
 * Single Source of Truth for Design System
 *
 * Palette (authoritative):
 * - Primary Blue: #3F51B5 (indigo-blue)
 * - Light Gray: #F3F4F6 (soft gray for text/surfaces)
 * - Dark Navy: #1E2A4A (deep background)
 * - Accent Pink: #F54476 (action/accent)
 *
 * DISALLOWED: #0A1833 (must not appear anywhere)
 */
export const colors = {
  primary: {
    indigo: '#3F51B5',
    darkNavy: '#1E2A4A',
    white: '#FFFFFF',
    silver: '#C0C0C0',
    softGray: '#F3F4F6',
  },
  accent: {
    pink: '#F54476',
    pinkHover: '#CF2C5E',
    gold: '#D4AF37',
    pastelGreen: '#8BC4B8',
    red: '#E63946',
    coolBlue: '#5F51B5',
    teal: '#44A069',
    skyBlue: '#F5F4F6',
  },
  semantic: {
    bg: '#FFFFFF',
    bgMuted: '#F3F4F6',
    bgDark: '#1E2A4A',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FAFC',
    surfaceDark: '#19243F',
    textPrimary: '#1E2A4A',
    textSecondary: '#4B5563',
    textOnPrimary: '#FFFFFF',
    textInverse: '#F3F4F6',
    border: '#E5E7EB',
    borderDark: '#2B3A5F',
    link: '#3F51B5',
    linkHover: '#35449A',
    linkDark: '#8FA1FF',
    linkDarkHover: '#7A8BE6',
    focus: '#3F51B5',
    focusDark: '#8FA1FF',
  },
} as const;

/**
 * CSS variable references for use in components
 * These map to the CSS variables defined in globals.css
 */
export const cssVars = {
  primary: 'var(--iw-color-primary)',
  primary50: 'var(--iw-color-primary-50)',
  primary600: 'var(--iw-color-primary-600)',
  primary700: 'var(--iw-color-primary-700)',
  accent: 'var(--iw-color-accent)',
  accent600: 'var(--iw-color-accent-600)',
  accent700: 'var(--iw-color-accent-700)',
  bg: 'var(--iw-color-bg)',
  bgMuted: 'var(--iw-color-bg-muted)',
  surface: 'var(--iw-color-surface)',
  surfaceAlt: 'var(--iw-color-surface-alt)',
  textPrimary: 'var(--iw-color-text-primary)',
  textSecondary: 'var(--iw-color-text-secondary)',
  textOnPrimary: 'var(--iw-color-text-on-primary)',
  border: 'var(--iw-color-border)',
  focusRing: 'var(--iw-focus-ring)',
  link: 'var(--iw-link)',
  linkHover: 'var(--iw-link-hover)',
} as const;
