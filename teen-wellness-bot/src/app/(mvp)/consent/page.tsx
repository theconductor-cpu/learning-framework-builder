'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ConsentPage() {
  const [accepted, setAccepted] = useState(false)
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Welcome</h1>
      <p className="mt-3 text-sm text-neutral-600">
        Educational tool, not medical advice. No diagnosis or treatment. Data stays on this device unless you choose to export it.
      </p>

      <label className="mt-6 flex items-start gap-3">
        <input type="checkbox" className="mt-1" checked={accepted} onChange={e=>setAccepted(e.target.checked)} />
        <span>I understand and consent to use the app.</span>
      </label>

      <div className="mt-6 flex gap-3">
        <Link
          href="/screener"
          className={`px-4 py-2 rounded-md text-white ${accepted ? 'bg-black' : 'bg-neutral-300 pointer-events-none'}`}
        >
          Continue to Screener
        </Link>
        <Link href="/focus" className="px-4 py-2 rounded-md border">Start a Focus Session</Link>
      </div>
    </main>
  )
}
