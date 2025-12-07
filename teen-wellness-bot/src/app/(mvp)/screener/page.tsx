'use client'
import { useMemo, useState } from 'react'
import { items } from '@/lib/screener-items'
import Link from 'next/link'

const choices = [
  { label:'Never', val:0 },
  { label:'Rarely', val:1 },
  { label:'Sometimes', val:2 },
  { label:'Often', val:3 },
  { label:'Very often', val:4 },
]

function bucketFromScore(score:number){
  if(score >= 14) return 'Consistent'       // rough ASRS‑6 guidance bucket
  if(score >= 9)  return 'Possible'
  return 'Unlikely'
}

export default function ScreenerPage() {
  const [answers, setAnswers] = useState<number[]>(Array(items.length).fill(0))
  const score = useMemo(()=>answers.reduce((a,b)=>a+b,0),[answers])
  const bucket = bucketFromScore(score)

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold">ADHD Self‑Screen (ASRS‑6)</h1>
      <p className="mt-2 text-sm text-neutral-600">This is educational only and not a diagnosis.</p>

      <ol className="mt-6 space-y-5">
        {items.map((q, i)=>(
          <li key={i} className="rounded-lg border p-4">
            <p className="font-medium">{i+1}. {q}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {choices.map(c=>(
                <button
                  key={c.label}
                  onClick={()=>setAnswers(a=>a.map((v,idx)=> idx===i?c.val:v))}
                  className={`px-3 py-1 rounded-md border text-sm ${answers[i]===c.val?'bg-black text-white':'bg-white'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-lg border p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-neutral-600">Score</span>
          <span className="text-2xl font-semibold">{score}</span>
        </div>
        <p className="mt-2">Result: <span className="font-medium">{bucket}</span> indicators.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/focus" className="px-4 py-2 rounded-md bg-black text-white">Start Focus Tools</Link>
          <button
            onClick={()=>{
              const run = {
                id: crypto.randomUUID(),
                at: Date.now(),
                answers,
                score,
                bucket: bucket as 'Unlikely'|'Possible'|'Consistent',
              }
              // lightweight local export
              const blob = new Blob([JSON.stringify(run,null,2)],{type:'application/json'})
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = `asrs6-${run.id}.json`; a.click()
              URL.revokeObjectURL(url)
            }}
            className="px-4 py-2 rounded-md border"
          >
            Export result
          </button>
        </div>
      </div>
    </main>
  )
}
