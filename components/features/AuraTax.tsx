'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Sparkles, Coins, Briefcase, Monitor, TrendingUp, Send } from 'lucide-react'

const INSIGHTS = [
  { id: 1, Icon: Monitor,   label: 'Hjemmekontor',      desc: 'Husleje & el pr. arbejdsdag',  amount: 8400,  saving: 2772, c: { bg: 'bg-indigo-50', border: 'border-indigo-100', icon: 'text-indigo-500', badge: 'bg-indigo-100 text-indigo-700' } },
  { id: 2, Icon: Briefcase, label: 'Telefon & internet', desc: 'Erhvervsmæssig andel 80%',     amount: 3200,  saving: 1056, c: { bg: 'bg-violet-50',  border: 'border-violet-100',  icon: 'text-violet-500',  badge: 'bg-violet-100 text-violet-700'  } },
  { id: 3, Icon: Coins,     label: 'Software licenser',  desc: 'Adobe, Notion, GitHub Pro',    amount: 5160,  saving: 1703, c: { bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'text-emerald-500', badge: 'bg-emerald-100 text-emerald-700' } },
]

const CHAT_LOG = [
  { role: 'user', text: 'Kan jeg trække min bil fra i skat?' },
  { role: 'ai',   text: 'Ja — bruger du bilen erhvervsmæssigt over 25% kan du fratrække den forholdsmæssige andel. Aura har registreret 3 klientmøder denne måned.' },
]

export default function AuraTax() {
  const [chatOpen, setChatOpen] = useState(false)
  const totalSaving = INSIGHTS.reduce((s, i) => s + i.saving, 0)

  return (
    <div className="neu-window overflow-hidden select-none" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-[#f8fafc]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 flex items-center gap-1.5">
            <ShieldCheck size={11} className="text-indigo-500" />
            <span className="text-[11px] text-slate-400 font-medium">Aura Tax</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Header — savings overview */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#f8fafc] border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="p-1 bg-indigo-600 rounded text-white shadow-sm">
              <TrendingUp size={9} />
            </div>
            <span className="text-[13px] font-bold text-slate-800">Skatteoptimering</span>
          </div>
          <p className="text-[11px] text-slate-400">Fundet automatisk i dine emails</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-400 mb-0.5">Potentiel besparelse</div>
          <div className="text-[18px] font-bold text-emerald-600 leading-none">
            +{totalSaving.toLocaleString('da-DK')} kr.
          </div>
          <div className="text-[9px] text-slate-400 mt-0.5">dette år</div>
        </div>
      </div>

      {/* Deduction cards */}
      <div className="bg-[#f8fafc] px-3 py-3 space-y-2">
        {INSIGHTS.map(({ id, Icon, label, desc, amount, saving, c }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.1 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border bg-white ${c.border}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${c.bg}`}>
              <Icon size={14} className={c.icon} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-slate-800">{label}</div>
              <div className="text-[10px] text-slate-400">{desc}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[11px] font-semibold text-slate-600">{amount.toLocaleString('da-DK')} kr.</div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${c.badge}`}>
                spar {saving.toLocaleString('da-DK')} kr.
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ask Aura Tax */}
      <div className="px-3 pb-3">
        <button
          onClick={() => setChatOpen(v => !v)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
        >
          <Sparkles size={11} className="text-indigo-400 shrink-0" />
          <span className="text-[11px] text-slate-400 flex-1 text-left truncate">
            Spørg Aura Tax om dit fradrag...
          </span>
          <Send size={10} className="text-slate-300 shrink-0" />
        </button>

        <AnimatePresence initial={false}>
          {chatOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-2 space-y-2"
            >
              {CHAT_LOG.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white border border-slate-100 text-slate-600'
                  }`}>
                    {msg.role === 'ai' && (
                      <div className="flex items-center gap-1 mb-1">
                        <ShieldCheck size={9} className="text-indigo-400" />
                        <span className="text-[9px] font-bold text-indigo-500">Aura Tax</span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}