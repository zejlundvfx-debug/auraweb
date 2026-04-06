'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, Search, TrendingUp, Flame, AlertCircle, CheckCircle2, Archive, Trash2, Reply } from 'lucide-react'

const BRIEFING_ITEMS = [
  { Icon: Flame,        cls: 'text-red-500',     bg: 'bg-red-50/80',     text: 'Mads venter svar — præsentation feedback' },
  { Icon: AlertCircle,  cls: 'text-indigo-500',  bg: 'bg-indigo-50/80',  text: 'Faktura #2847 forfaldsdato i morgen' },
  { Icon: CheckCircle2, cls: 'text-emerald-500', bg: 'bg-emerald-50/80', text: 'Thomas møde bekræftet fredag 14:00' },
]

const THREADS = [
  { id: 1, from: 'Mads Kjærgaard',  initials: 'MK', color: '#6366f1', subject: 'Re: Projekt Aura — feedback',     preview: 'Rigtig flot præsentation, et par komm...', time: '9:41',  unread: true,  priority: true,  tag: 'Klient',  tagCls: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  { id: 2, from: 'Sofie Andersen',  initials: 'SA', color: '#10b981', subject: 'Faktura #2847 — forfaldsdato',     preview: 'Vedhæftet finder du faktura for april...', time: '8:15',  unread: true,  priority: false, tag: 'Faktura', tagCls: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { id: 3, from: 'Thomas Holm',     initials: 'TH', color: '#8b5cf6', subject: 'Møde fredag kl. 14?',              preview: 'Kan du mødes fredag eftermiddag...',        time: 'I går', unread: false, priority: false, tag: 'Møde',    tagCls: 'text-violet-600 bg-violet-50 border-violet-100' },
]

const MSG_BODY = `Hej Adam,

Jeg har kigget igennem præsentationen og det ser rigtig flot ud! Konceptet er stærkt og designet er professionelt.

Jeg har et par kommentarer til slide 4 — kan vi tage en snak i næste uge?

Mange hilsner,
Mads`

export default function SmartInbox() {
  const [selected, setSelected] = useState(1)
  const [starred, setStarred] = useState<Set<number>>(new Set([1]))
  const thread = THREADS.find(t => t.id === selected) ?? THREADS[0]

  return (
    <div
      className="neu-window overflow-hidden select-none flex flex-col"
      style={{ fontFamily: 'Inter, system-ui, sans-serif', height: 400 }}
    >
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-[#f8fafc] shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 flex items-center gap-1.5">
            <Sparkles size={11} className="text-indigo-400" />
            <span className="text-[11px] text-slate-400 font-medium">Smart Indbakke</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Two-column body */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* ── LEFT PANEL ── */}
        <div className="w-[42%] bg-white border-r border-slate-200 flex flex-col min-h-0">

          {/* Search row */}
          <div className="h-10 px-3 border-b border-slate-100 flex items-center gap-2 shrink-0">
            <Search size={12} className="text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-300 flex-1">Søg i emails...</span>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-500 text-white text-[9px] font-semibold">
              <Sparkles size={8} />
              AI aktiv
            </div>
          </div>

          {/* Aura Briefing card — exact real-app style */}
          <div className="p-2 border-b border-slate-100 shrink-0">
            <div className="bg-white rounded-2xl border border-indigo-100/40 p-3 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="p-1 bg-indigo-600 rounded text-white shadow-sm">
                  <TrendingUp size={8} />
                </div>
                <span className="font-bold text-[9px] text-slate-900 uppercase tracking-wider">Aura Briefing</span>
              </div>
              <div className="space-y-1">
                {BRIEFING_ITEMS.map(({ Icon, cls, bg, text }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className={`flex items-center gap-1.5 px-1.5 py-1 rounded-lg ${bg}`}
                  >
                    <Icon size={9} className={`shrink-0 ${cls}`} />
                    <span className="text-[9.5px] text-slate-600 leading-tight">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Thread list */}
          <div className="flex-1 overflow-y-auto">
            {THREADS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 + 0.35 }}
                onClick={() => setSelected(t.id)}
                className={`cursor-pointer px-3 py-2.5 border-b border-slate-50 transition-colors ${
                  selected === t.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1">
                        {t.unread && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                        <span className={`text-[10px] truncate max-w-[80px] ${t.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-500'}`}>
                          {t.from}
                        </span>
                        {t.priority && (
                          <span className="text-[8px] bg-red-500 text-white px-1 py-0.5 rounded font-bold shrink-0">!</span>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 shrink-0">{t.time}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-slate-700 truncate mb-0.5">{t.subject}</div>
                    <span className={`text-[8.5px] font-semibold px-1.5 py-0.5 rounded border ${t.tagCls}`}>{t.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL — open thread ── */}
        <div className="flex-1 bg-white flex flex-col min-h-0 overflow-hidden">
          {/* Toolbar */}
          <div className="h-10 px-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <span className="text-[11px] font-semibold text-slate-800 truncate max-w-[160px]">{thread.subject}</span>
            <div className="flex items-center gap-0.5 bg-slate-50 rounded-lg p-1">
              <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors">
                <Archive size={10} className="text-slate-500" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors">
                <Trash2 size={10} className="text-slate-500" />
              </button>
              <button
                onClick={() => setStarred(s => { const n = new Set(s); n.has(thread.id) ? n.delete(thread.id) : n.add(thread.id); return n })}
                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors"
              >
                <Star size={10} className={starred.has(thread.id) ? 'text-amber-400 fill-amber-400' : 'text-slate-400'} />
              </button>
            </div>
          </div>

          {/* Message content */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <div className="flex items-start gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ background: thread.color }}
              >
                {thread.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-900">{thread.from}</span>
                  <span className="text-[10px] text-slate-400">{thread.time}</span>
                </div>
                <span className="text-[10px] text-slate-400">til mig</span>
              </div>
            </div>
            <pre className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap font-sans px-1">{MSG_BODY}</pre>
          </div>

          {/* Reply bar */}
          <div className="px-3 py-2 border-t border-slate-100 shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 2px 10px rgba(99,102,241,0.35)' }}
            >
              <Reply size={11} />
              Svar med Aura
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}