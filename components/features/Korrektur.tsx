'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, X, ChevronRight, Wand2 } from 'lucide-react'

const ORIGINAL = `Hej Thomas,

Jeg ville bare lige høre om du har kigget på det materiale jeg sendte i forgårs? Håber det er ok med dig at vi mødes fredag, men jeg er også fint med en anden dag hvis det ikke passer dig.`

const SUGGESTIONS = [
  {
    id: 1,
    type: 'tone',
    label: 'Tone',
    color: 'indigo',
    original: 'ville bare lige høre',
    replacement: 'vil høre',
    reason: 'Mere direkte og professionel',
  },
  {
    id: 2,
    type: 'grammar',
    label: 'Grammatik',
    color: 'violet',
    original: 'i forgårs',
    replacement: 'for to dage siden',
    reason: 'Korrekt dansk formulering',
  },
  {
    id: 3,
    type: 'clarity',
    label: 'Klarhed',
    color: 'emerald',
    original: 'er også fint med en anden dag',
    replacement: 'er fleksibel med datoen',
    reason: 'Tydeligere og mere professionelt',
  },
]

const COLOR_MAP = {
  indigo: { badge: 'badge-indigo', bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', del: 'bg-red-50 text-red-500 line-through', ins: 'bg-emerald-50 text-emerald-600' },
  violet: { badge: 'badge-violet', bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-600', del: 'bg-red-50 text-red-500 line-through', ins: 'bg-emerald-50 text-emerald-600' },
  emerald: { badge: 'badge-emerald', bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', del: 'bg-red-50 text-red-500 line-through', ins: 'bg-emerald-50 text-emerald-600' },
}

export default function Korrektur() {
  const [accepted, setAccepted] = useState<Set<number>>(new Set())
  const [rejected, setRejected] = useState<Set<number>>(new Set())
  const pending = SUGGESTIONS.filter(s => !accepted.has(s.id) && !rejected.has(s.id))
  const allDone = pending.length === 0

  return (
    <div className="neu-window overflow-hidden select-none" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-[#f8fafc]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 flex items-center gap-1.5">
            <Sparkles size={11} className="text-violet-400" />
            <span className="text-[11px] text-slate-400 font-medium">Korrektur</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Email body */}
      <div className="bg-white border-b border-slate-100">
        {/* Mini email header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-50">
          <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">TH</div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-slate-800">Thomas Holm</span>
            <span className="text-[10px] text-slate-400 ml-2">Møde fredag kl. 14?</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 border border-violet-100 text-[9px] font-semibold text-violet-600">
            <Wand2 size={9} />
            Korrektur aktiv
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] text-slate-400 font-medium mb-1.5">Dit udkast:</div>
          <p className="text-[12px] text-slate-600 leading-relaxed">{ORIGINAL}</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-[#f8fafc] px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={12} className="text-violet-500" />
          <span className="text-[12px] font-bold text-slate-700">
            {allDone ? 'Alle forslag behandlet' : `${pending.length} forslag fra Aura`}
          </span>
          {!allDone && (
            <span className="text-[10px] bg-violet-100 text-violet-600 font-bold px-2 py-0.5 rounded-full ml-auto">
              {accepted.size} accepteret
            </span>
          )}
        </div>

        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {SUGGESTIONS.map(s => {
              const c = COLOR_MAP[s.color as keyof typeof COLOR_MAP]
              const isAccepted = accepted.has(s.id)
              const isRejected = rejected.has(s.id)
              const isDone = isAccepted || isRejected

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`rounded-xl border overflow-hidden transition-all ${
                    isDone ? 'opacity-50' : `bg-white ${c.border}`
                  }`}
                  style={{ borderColor: isDone ? '#e2e8f0' : undefined }}
                >
                  <div className={`px-3 py-2.5 ${isDone ? 'bg-slate-50' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className={c.badge}>{s.label}</span>
                        <span className="text-[11px] text-slate-400">{s.reason}</span>
                      </div>
                      {!isDone && (
                        <div className="flex items-center gap-1">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setAccepted(prev => new Set([...Array.from(prev), s.id]))}
                            className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                          >
                            <Check size={11} className="text-emerald-600" />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setRejected(prev => new Set([...Array.from(prev), s.id]))}
                            className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                          >
                            <X size={11} className="text-red-400" />
                          </motion.button>
                        </div>
                      )}
                      {isAccepted && <span className="text-[10px] text-emerald-600 font-bold">✓ Accepteret</span>}
                      {isRejected && <span className="text-[10px] text-slate-400 font-bold">Afvist</span>}
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-500 line-through font-mono">{s.original}</span>
                      <ChevronRight size={10} className="text-slate-300 flex-shrink-0" />
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-mono font-medium">{s.replacement}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check size={11} className="text-white" />
              </span>
              <span className="text-[12px] font-semibold text-emerald-700">
                {accepted.size} ændringer anvendt — email er klar til afsendelse
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}