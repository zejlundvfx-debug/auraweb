'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, FileText, Download, Check, ExternalLink, Paperclip } from 'lucide-react'

const INVOICE_DATA = {
  vendor: 'Adobe Systems',
  amount: '1.299,00 kr',
  due: '15. april 2026',
  invoiceNo: 'INV-2026-04847',
  vat: '259,80 kr',
  category: 'Software',
}

type Phase = 'idle' | 'scanning' | 'done'

export default function SmartInvoice() {
  const [phase, setPhase] = useState<Phase>('idle')

  const handleExtract = () => {
    if (phase !== 'idle') return
    setPhase('scanning')
    setTimeout(() => setPhase('done'), 1800)
  }

  const handleReset = () => setPhase('idle')

  return (
    <div className="neu-window overflow-hidden select-none" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-[#f8fafc]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 flex items-center gap-1.5">
            <Sparkles size={11} className="text-indigo-400" />
            <span className="text-[11px] text-slate-400 font-medium">Smart Faktura</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Email snippet */}
      <div className="bg-white border-b border-slate-100">
        {/* Sticky-style toolbar row */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-50">
          <span className="text-[12px] font-semibold text-slate-800 truncate">Faktura for Creative Cloud — april 2026</span>
          <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1">
            <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors">
              <Paperclip size={10} className="text-slate-400" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors">
              <ExternalLink size={10} className="text-slate-400" />
            </button>
          </div>
        </div>
        {/* Message row */}
        <div className="flex items-start gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
            Ad
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-800">Adobe Systems</span>
              <span className="text-[11px] text-slate-400">i dag, 10:22</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">til mig</div>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Kære kunde, vedhæftet finder du faktura for dit Creative Cloud abonnement. Forfaldsdato: 15. april 2026. Beløb: 1.299,00 kr inkl. moms...
            </p>
            {/* Attachment chip */}
            <div className="flex items-center gap-1.5 mt-2 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg w-fit">
              <FileText size={11} className="text-indigo-500 shrink-0" />
              <span className="text-[10px] font-semibold text-slate-600">faktura-adobe-apr2026.pdf</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action area */}
      <div className="bg-[#f8fafc] px-4 py-3">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <FileText size={14} className="text-indigo-500" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-700">Faktura fundet</div>
                  <div className="text-[11px] text-slate-400">Klik for at udtrække data</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExtract}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 3px 12px rgba(99,102,241,0.4)' }}
              >
                <Sparkles size={12} />
                Udtræk
              </motion.button>
            </motion.div>
          )}

          {phase === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent flex-shrink-0"
                />
                <span className="text-[12px] font-semibold text-indigo-600">Aura scanner faktura...</span>
              </div>
              {/* Scanning shimmer rows */}
              <div className="space-y-2">
                {[80, 60, 70].map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.4 }}
                    className="h-2.5 rounded-full shimmer origin-left"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Success header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check size={9} className="text-emerald-500" />
                  </span>
                  <span className="text-[12px] font-bold text-emerald-700">Data udtrukket</span>
                </div>
                <button onClick={handleReset} className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors">Nulstil</button>
              </div>

              {/* Data grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: 'Leverandør', value: INVOICE_DATA.vendor },
                  { label: 'Faktura nr.', value: INVOICE_DATA.invoiceNo },
                  { label: 'Beløb', value: INVOICE_DATA.amount },
                  { label: 'Forfaldsdato', value: INVOICE_DATA.due },
                  { label: 'Moms', value: INVOICE_DATA.vat },
                  { label: 'Kategori', value: INVOICE_DATA.category },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white border border-slate-100 rounded-xl px-3 py-2">
                    <div className="text-[10px] text-slate-400 font-medium mb-0.5">{label}</div>
                    <div className="text-[12px] font-bold text-slate-800 truncate">{value}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' }}
                >
                  <Download size={12} />
                  Gem til regnskab
                </button>
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 transition-colors">
                  <ExternalLink size={12} />
                  Åbn PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}