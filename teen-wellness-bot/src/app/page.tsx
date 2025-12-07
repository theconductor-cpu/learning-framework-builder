export default function Home(){
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Teen Wellness Bot</h1>
      <ul className="mt-6 list-disc pl-6 space-y-2">
        <li><a className="underline" href="/consent">Start at Consent</a></li>
        <li><a className="underline" href="/screener">ADHD Screener</a></li>
        <li><a className="underline" href="/focus">Focus Timer</a></li>
      </ul>
    </main>
  )
}
