'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * Theme Provider for IntegrateWise dark mode support
 *
 * Usage in layout.tsx:
 * <ThemeProvider
 *   attribute="data-theme"
 *   defaultTheme="light"
 *   enableSystem
 * >
 *   {children}
 * </ThemeProvider>
 *
 * The IntegrateWise color system uses [data-theme="dark"] selector
 * for dark mode tokens (see globals.css).
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
