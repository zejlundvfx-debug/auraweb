'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Bold, Italic, Underline, Link2, List, Wand2, ChevronDown, CheckCheck } from 'lucide-react'

const TONES: Array<{ key: string; label: string }> = [
  { key: 'professional', label: 'Professionel' },
  { key: 'shorter',      label: 'Kortere'      },
  { key: 'friendly',     label: 'Mere venlig'  },
  { key: 'formal',       label: 'Formel'       },
]

const DRAFTS: Record<string, string> = {
  professional: `Hej Mads,

Mange tak for din positive feedback — det betyder virkelig meget!

Jeg har opdateret præsentationen i henhold til dine forslag. Lad os aftale et opfølgningsmøde — hvad passer dig bedst, tirsdag eller torsdag formiddag?

Med venlig hilsen,
Adam`,
  shorter: `Hej Mads,

Tak for feedbacken! Præsentation er opdateret.

Kan vi mødes tirsdag eller torsdag?

/ Adam`,
  friendly: `Hej Mads! 😊

Tusind tak — det varmer virkelig at høre!

Jeg har taget dine inputs til mig. Vi skal bare finde et tidspunkt — tirsdag eller torsdag?

Mange hilsner,
Adam`,
  formal: `Kære Mads Kjærgaard,

Tak for din tilbagemelding vedrørende præsentationen. Jeg har foretaget de nødvendige justeringer i overensstemmelse med dine kommentarer.

Jeg foreslår et opfølgningsmøde tirsdag eller torsdag formiddag.

Med venlig hilsen,
Adam`,
}

export default function DraftWithAura() {
  const [activeKey, setActiveKey] = useState('professional')
  const [displayed, setDisplayed] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    const timer = setTimeout(() => {
      setIsTyping(true)
      const target = DRAFTS[activeKey]
      let i = 0
      const iv = setInterval(() => {
        i++
        setDisplayed(target.slice(0, i))
        if (i >= target.length) {
          clearInterval(iv)
          setIsTyping(false)
          setDone(true)
        }
      }, 16)
      return () => clearInterval(iv)
    }, 400)
    return () => clearTimeout(timer)
  }, [activeKey])

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
            <span className="text-[11px] text-slate-400 font-medium">Nyt svar</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Compose header — To / Subject */}
      <div className="bg-white border-b border-slate-100">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-50">
          <span className="text-[11px] text-slate-400 font-medium w-10 shrink-0">Til</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-medium">
              Mads Kjærgaard
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="text-[11px] text-slate-400 font-medium w-10 shrink-0">Emne</span>
          <span className="text-[12px] text-slate-700 font-medium">Re: Projekt Aura — feedback</span>
        </div>
      </div>

      {/* Aura AI tone bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-50/70 to-violet-50/40 border-b border-indigo-100/50">
        <div className="flex items-center gap-1.5 shrink-0">
          <Wand2 size={12} className="text-indigo-500" />
          <span className="text-[11px] font-bold text-indigo-600">Aura tone:</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {TONES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0 transition-all ${
                activeKey === key
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Body — typewriter */}
      <div className="bg-white min-h-[155px] px-4 py-3 relative">
        <pre className="text-[12px] text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
          {displayed}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.65 }}
              className="inline-block w-0.5 h-3.5 bg-indigo-500 ml-0.5 align-middle"
            />
          )}
        </pre>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold"
            >
              <CheckCheck size={13} className="text-emerald-500" />
              Udkast klar — gennemse og send
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Formatting toolbar + Send */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8fafc] border-t border-slate-100">
        <div className="flex items-center gap-0.5">
          {[Bold, Italic, Underline, Link2, List].map((Icon, i) => (
            <button
              key={i}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Icon size={13} className="text-slate-400" />
            </button>
          ))}
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100">
            <Wand2 size={10} />
            Skriv med Aura
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 3px 12px rgba(99,102,241,0.4)' }}
        >
          <Send size={12} />
          Send
          <ChevronDown size={11} className="opacity-60" />
        </motion.button>
      </div>
    </div>
  )
}