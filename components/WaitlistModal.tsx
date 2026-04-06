'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check, Sparkles, Loader2 } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  lang: 'da' | 'en'
}

const copy = {
  da: {
    title: 'Prøv Aura beta',
    sub: 'Tilmeld dig waitlisten og vær blandt de første til at prøve Aura helt gratis.',
    name_label: 'Dit navn',
    name_placeholder: 'Anders Andersen',
    email_label: 'Din email',
    email_placeholder: 'anders@virksomhed.dk',
    cta: 'Tilmeld mig waitlisten',
    loading: 'Tilmelder...',
    success_title: 'Du er med!',
    success_sub: 'Du vil modtage adgang via mail inden længe. Vi glæder os til at vise dig Aura.',
    already_title: 'Du er allerede tilmeldt!',
    already_sub: 'Vi har din email på listen. Du vil modtage adgang via mail inden længe.',
    close: 'Luk',
    disclaimer: 'Ingen spam. Vi skriver kun, når der er nyt fra Aura.',
  },
  en: {
    title: 'Try Aura beta',
    sub: 'Join the waitlist and be among the first to try Aura completely free.',
    name_label: 'Your name',
    name_placeholder: 'John Smith',
    email_label: 'Your email',
    email_placeholder: 'john@company.com',
    cta: 'Join the waitlist',
    loading: 'Joining...',
    success_title: "You're in!",
    success_sub: 'You will receive access via email shortly. We look forward to showing you Aura.',
    already_title: 'Already registered!',
    already_sub: 'We already have your email on the list. You will receive access via email shortly.',
    close: 'Close',
    disclaimer: 'No spam. We only write when there is news from Aura.',
  },
}

export default function WaitlistModal({ open, onClose, lang }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const c = copy[lang]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (res.status === 409) { setStatus('already'); return }
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Noget gik galt. Prøv igen.')
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setName('')
      setEmail('')
      setErrorMsg('')
    }, 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden">

              {/* Header gradient strip */}
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)' }} />

              <div className="px-8 pt-7 pb-8">
                {/* Close */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.4)]">
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-[18px] font-bold text-slate-900 leading-tight">{c.title}</h2>
                      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-full">BETA</span>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                  >
                    <X size={14} className="text-slate-500" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {(status === 'success' || status === 'already') ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-6 text-center"
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${status === 'already' ? 'bg-amber-50 border-2 border-amber-100' : 'bg-emerald-50 border-2 border-emerald-100'}`}>
                        <Check size={28} className={status === 'already' ? 'text-amber-500' : 'text-emerald-500'} />
                      </div>
                      <h3 className="text-[20px] font-bold text-slate-900 mb-2">
                        {status === 'already' ? c.already_title : c.success_title}
                      </h3>
                      <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
                        {status === 'already' ? c.already_sub : c.success_sub}
                      </p>
                      <button
                        onClick={handleClose}
                        className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[14px] font-semibold text-slate-700 transition-colors"
                      >
                        {c.close}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <p className="text-[14px] text-slate-500 leading-relaxed -mt-1 mb-5">{c.sub}</p>

                      <div>
                        <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">{c.name_label}</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder={c.name_placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[14px] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">{c.email_label}</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder={c.email_placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[14px] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-[12px] text-red-500 font-medium">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[15px] font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed mt-2"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            {c.loading}
                          </>
                        ) : (
                          <>
                            {c.cta}
                            <ArrowRight size={15} />
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-slate-400 text-center">{c.disclaimer}</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}