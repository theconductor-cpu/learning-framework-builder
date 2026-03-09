'use client'
import { useTheme } from '@/lib/theme-provider'

export function ToggleBtn(){
  const {dark, toggle} = useTheme()
  return (
    <button onClick={toggle} className="rounded-md border px-3 py-1 text-sm">
      {dark? 'Light' : 'Dark'} mode
    </button>
  )
}
