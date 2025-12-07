import './globals.css'
import { ThemeProvider, useTheme } from '@/lib/theme-provider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teen Wellness Bot',
  description: 'ADHD support tools for teens - screener, focus timer, and wellness resources',
  manifest: '/manifest.json',
  themeColor: '#0b0b0b',
}

function ToggleBtn(){
  const {dark, toggle} = useTheme()
  return (
    <button onClick={toggle} className="rounded-md border px-3 py-1 text-sm">
      {dark? 'Light' : 'Dark'} mode
    </button>
  )
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
