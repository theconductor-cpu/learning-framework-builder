'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Ctx = { dark:boolean; toggle:()=>void }
const ThemeCtx = createContext<Ctx>({ dark:false, toggle: ()=>{} })
export const useTheme = ()=>useContext(ThemeCtx)

export function ThemeProvider({children}:{children:React.ReactNode}){
  const [dark,setDark] = useState(false)
  useEffect(()=>{
    const saved = localStorage.getItem('twb-dark') === '1'
    setDark(saved)
    document.documentElement.classList.toggle('dark', saved)
  },[])
  const toggle = ()=>{
    setDark(d=>{
      const next = !d
      localStorage.setItem('twb-dark', next?'1':'0')
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }
  return <ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>
}
