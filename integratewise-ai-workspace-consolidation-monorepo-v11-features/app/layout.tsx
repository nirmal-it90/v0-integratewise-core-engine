import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Inter as V0_Font_Inter, JetBrains_Mono as V0_Font_JetBrains_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], variable: '--v0-font-inter' })
const _jetbrainsMono = V0_Font_JetBrains_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800"], variable: '--v0-font-geist-mono' })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"], variable: '--v0-font-source-serif-4' })
const _v0_fontVariables = `${_inter.variable} ${_jetbrainsMono.variable} ${_sourceSerif_4.variable}`

export const viewport: Viewport = {
  themeColor: '#1E2A4A',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'IntegrateWise — Load in one click. Store it in your Spine. Think in your IQ Hub.',
  description:
    'Your tools and AI conversations—finally in one connected place. Capture scattered work data, organize into your Spine, and think in your IQ Hub powered by your IQ Clone.',
  generator: 'IntegrateWise',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_v0_fontVariables}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
