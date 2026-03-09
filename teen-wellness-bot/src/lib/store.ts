import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FocusSession = { id:string; at:number; intent:string; mins:number; distractions:string[] }

type State = {
  privacyMode: boolean
  setPrivacy: (v:boolean)=>void
  screenerRuns: { id:string; at:number; answers:number[]; score:number; bucket:'Unlikely'|'Possible'|'Consistent' }[]
  addScreener: (r: State['screenerRuns'][number])=>void
  sessions: FocusSession[]
  addSession: (s: FocusSession)=>void
}

export const useApp = create<State>()(persist(
  (set)=>({
    privacyMode: true,
    setPrivacy: (v)=>set({ privacyMode: v }),
    screenerRuns: [],
    addScreener: (r)=>set(s=>({ screenerRuns: [r, ...s.screenerRuns] })),
    sessions: [],
    addSession: (s)=>set(st=>({ sessions: [s, ...st.sessions] })),
  }),
  { name: 'twb-store' }
))
