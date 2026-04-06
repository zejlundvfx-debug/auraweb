'use client'
import { motion } from 'framer-motion'
import { Clock, Sparkles, CheckCircle2 } from 'lucide-react'

const PROJECTS = [
  { id: 1, name: 'Projekt Aura',    client: 'Intern',       hours: 3.5,  pct: 87, color: '#6366f1' },
  { id: 2, name: 'Mads Kjærgaard', client: 'Klient',        hours: 1.5,  pct: 37, color: '#10b981' },
  { id: 3, name: 'Trustpilot API', client: 'Side-projekt',  hours: 0.75, pct: 19, color: '#8b5cf6' },
]
const TOTAL = PROJECTS.reduce((s, p) => s + p.hours, 0)

export default function AutoTimeTracker() {
  return (
    <div className="neu-window overflow-hidden select-none" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-[#f8fafc]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 flex items-center gap-1.5">
            <Clock size={11} className="text-indigo-400" />
            <span className="text-[11px] text-slate-400 font-medium">Auto Time Tracker</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Active tracking banner */}
      <div className="px-4 py-3 bg-indigo-600 flex items-center gap-3">
        <div className="relative shrink-0 w-3 h-3">
          <span className="absolute inset-0 rounded-full bg-white opacity-75 animate-ping" />
          <span className="relative block w-3 h-3 rounded-full bg-white" />
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-bold text-white">Sporer nu: {PROJECTS[0].name}</div>
          <div className="text-[10px] text-indigo-200 mt-0.5">Automatisk via emails &amp; aktivitet</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[15px] font-bold text-white tabular-nums">3:27</div>
          <div className="text-[9px] text-indigo-200">i dag</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 bg-white border-b border-slate-100">
        {[
          { label: 'Timer i dag',       value: `${TOTAL.toFixed(1)}t` },
          { label: 'Projekter',          value: `${PROJECTS.length}`  },
          { label: 'Auto-registreret',   value: '100%'                },
        ].map(({ label, value }) => (
          <div key={label} className="px-3 py-2.5 text-center border-r border-slate-100 last:border-r-0">
            <div className="text-[14px] font-bold text-slate-800">{value}</div>
            <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* Project bars */}
      <div className="bg-[#f8fafc] px-4 py-3 space-y-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-slate-700">Tidsforbrug i dag</span>
          <div className="flex items-center gap-1">
            <Sparkles size={10} className="text-indigo-400" />
            <span className="text-[10px] text-indigo-500 font-semibold">AI-estimeret</span>
          </div>
        </div>

        {PROJECTS.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 + 0.1 }}
            className="bg-white rounded-xl border border-slate-100 px-3 py-2.5"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                <span className="text-[11px] font-semibold text-slate-800">{p.name}</span>
                <span className="text-[9px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">{p.client}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 tabular-nums">{p.hours}t</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.pct}%` }}
                transition={{ delay: idx * 0.1 + 0.4, duration: 0.7, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: p.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-100">
        <div className="flex items-center justify-center gap-1.5">
          <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
          <span className="text-[10px] text-slate-500 font-medium text-center">
            Ingen manuel tidsregistrering — Aura registrerer automatisk
          </span>
        </div>
      </div>
    </div>
  )
}