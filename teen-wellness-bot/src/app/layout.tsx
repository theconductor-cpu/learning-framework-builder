import './globals.css'
import { ThemeProvider } from '@/lib/theme-provider'
import { ToggleBtn } from '@/components/toggle-btn'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Teen Wellness Bot',
  description: 'ADHD support tools for teens - screener, focus timer, and wellness resources',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0b0b0b',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-neutral-950 dark:text-neutral-100">
        <ThemeProvider>
          <header className="mx-auto max-w-3xl px-4 py-3 flex justify-end">
            <ToggleBtn/>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
