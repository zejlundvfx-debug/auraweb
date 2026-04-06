'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, RefreshCw, BellOff, Zap, Search, ExternalLink } from 'lucide-react'

const SUBS = [
  { id: 1, sender: 'Medium Daily Digest',    email: 'noreply@medium.com',       count: 47, lastDate: '3. apr', color: '#0ea5e9', initials: 'M'  },
  { id: 2, sender: 'LinkedIn Notifikationer', email: 'messages@linkedin.com',    count: 23, lastDate: '2. apr', color: '#0077b5', initials: 'in' },
  { id: 3, sender: 'Zalando',                email: 'info@zalando.dk',           count: 31, lastDate: '1. apr', color: '#ff6900', initials: 'Z'  },
  { id: 4, sender: 'Google Alerts',          email: 'no-reply@google.com',       count: 8,  lastDate: '31. mar', color: '#34a853', initials: 'G' },
  { id: 5, sender: 'Trustpilot',             email: 'no-reply@trustpilot.com',   count: 5,  lastDate: '30. mar', color: '#00b67a', initials: 'T' },
]

export default function SmartClean() {
  const [removed, setRemoved] = useState<Set<number>>(new Set())
  const [sweeping, setSweeping] = useState(false)
  const [done, setDone] = useState(false)

  const totalEmails = SUBS.reduce((s, e) => s + e.count, 0)
  const removedCount = SUBS.filter(s => removed.has(s.id)).reduce((acc, e) => acc + e.count, 0)
  const visible = SUBS.filter(s => !removed.has(s.id))

  const handleSweep = async () => {
    if (sweeping || done) return
    setSweeping(true)
    for (let i = 0; i < SUBS.length; i++) {
      await new Promise(r => setTimeout(r, 240))
      setRemoved(prev => new Set([...Array.from(prev), SUBS[i].id]))
    }
    setSweeping(false)
    setDone(true)
  }

  const handleReset = () => { setRemoved(new Set()); setDone(false) }

  return (
    <div className="neu-window overflow-hidden select-none" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-[#f8fafc]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 flex items-center gap-1.5">
            <Sparkles size={11} className="text-indigo-400" />
            <span className="text-[11px] text-slate-400 font-medium">Smart Clean</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#f8fafc] border-b border-slate-100">
        <div>
          <span className="text-[13px] font-bold text-slate-700">Abonnementer</span>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {totalEmails} emails fundet · {removedCount > 0 ? `${removedCount} afmeldt` : 'vælg hvad du vil fjerne'}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.button
              key="reset"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RefreshCw size={11} />
              Prøv igen
            </motion.button>
          ) : (
            <motion.button
              key="sweep"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleSweep}
              disabled={sweeping}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-white transition-all disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 2px 10px rgba(99,102,241,0.4)' }}
            >
              {sweeping ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}>
                  <Sparkles size={11} />
                </motion.div>
              ) : (
                <Zap size={11} />
              )}
              {sweeping ? 'Afmelder...' : 'Afmeld alle'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Search row */}
      <div className="px-4 py-2 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
          <Search size={12} className="text-slate-400 shrink-0" />
          <span className="text-[11px] text-slate-300">Søg i abonnementer...</span>
        </div>
      </div>

      {/* Subscription list */}
      <div className="bg-[#f8fafc] min-h-[160px]">
        <AnimatePresence initial={false}>
          {visible.map((sub) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 56, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-100/80 bg-white hover:bg-slate-50/50 transition-colors overflow-hidden"
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ background: sub.color }}
              >
                {sub.initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px] font-semibold text-slate-800 truncate">{sub.sender}</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                    {sub.count}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 truncate block">{sub.email}</span>
              </div>

              {/* Date */}
              <span className="text-[10px] text-slate-400 shrink-0">{sub.lastDate}</span>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <ExternalLink size={10} className="text-slate-400" />
                </button>
                <button
                  onClick={() => setRemoved(prev => new Set([...Array.from(prev), sub.id]))}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors"
                >
                  <BellOff size={9} />
                  Afmeld
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Done state */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-8 gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-sm">
              <Check size={22} className="text-emerald-500" />
            </div>
            <div className="text-center">
              <p className="text-[13px] font-bold text-slate-700">{removedCount} emails afmeldt</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Din indbakke er ren ✦</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}