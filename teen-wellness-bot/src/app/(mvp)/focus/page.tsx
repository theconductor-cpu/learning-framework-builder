'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function FocusPage(){
  const [mins, setMins] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [intent, setIntent] = useState('')
  const [distractions, setDistractions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(!running) return
    const id = setInterval(()=>{
      if(seconds===0){
        if(mins===0){ setRunning(false); clearInterval(id); return }
        setMins(m=>m-1); setSeconds(59)
      } else {
        setSeconds(s=>s-1)
      }
    },1000)
    return ()=>clearInterval(id)
  },[running, mins, seconds])

  const reset = ()=>{ setMins(25); setSeconds(0); setRunning(false); setDistractions([]) }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Focus Session</h1>
      <label className="mt-4 block">
        <span className="text-sm text-neutral-600">Intent</span>
        <input
          ref={inputRef}
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="What will you work on?"
          value={intent}
          onChange={e=>setIntent(e.target.value)}
        />
      </label>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-5xl tabular-nums">{String(mins).padStart(2,'0')}</span>
        <span className="text-5xl">:</span>
        <span className="text-5xl tabular-nums">{String(seconds).padStart(2,'0')}</span>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={()=>setRunning(r=>!r)} className="px-4 py-2 rounded-md bg-black text-white">{running?'Pause':'Start'}</button>
        <button onClick={reset} className="px-4 py-2 rounded-md border">Reset</button>
        <button onClick={()=>{ setMins(5); setSeconds(0); setRunning(false) }} className="px-4 py-2 rounded-md border">Break 5</button>
      </div>

      <div className="mt-6">
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2"
            placeholder="Log a distraction…"
            onKeyDown={(e)=>{
              const t = e.currentTarget
              if(e.key==='Enter' && t.value.trim()){
                setDistractions(d=>[t.value.trim(), ...d]); t.value=''
              }
            }}
          />
          <button
            className="px-3 py-2 rounded-md border"
            onClick={()=>inputRef.current?.focus()}
          >
            Add
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {distractions.map((d,i)=>(<li key={i} className="rounded border px-3 py-2 text-sm">{d}</li>))}
        </ul>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/screener" className="px-4 py-2 rounded-md border">Back to Screener</Link>
        <Link href="/consent" className="px-4 py-2 rounded-md border">Consent</Link>
      </div>
    </main>
  )
}
