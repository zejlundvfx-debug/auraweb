'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles, ChevronDown, Check, ArrowRight,
  Inbox, PenLine, SpellCheck, Trash2, FileText,
  Plus, Clock, ShieldCheck, X,
  Users, Building2, Mail, BrainCircuit, EyeOff,
  Timer, TrendingDown, BadgePercent, Lock
} from 'lucide-react'
import SmartInbox from '@/components/features/SmartInbox'
import DraftWithAura from '@/components/features/DraftWithAura'
import Korrektur from '@/components/features/Korrektur'
import SmartClean from '@/components/features/SmartClean'
import SmartInvoice from '@/components/features/SmartInvoice'
import AuraTax from '@/components/features/AuraTax'
import AutoTimeTracker from '@/components/features/AutoTimeTracker'
import WaitlistModal from '@/components/WaitlistModal'

// Translations

const T = {
  da: {
    nav_features: 'Features', nav_about: 'Om Aura', nav_pricing: 'Priser', nav_cta: 'Prøv beta',
    beta_banner: 'Aura er i offentlig beta. Gratis for alle. Hjælp os med at forme fremtidens email',
    hero_badge: 'Åben beta. Gratis nu',
    hero_h1a: 'Din AI-email assistent',
    hero_h1b: 'er klar til dig',
    hero_sub: 'Aura sorterer, skriver og optimerer dine emails med AI. Spar timer hver uge og vær med til at forme fremtidens email i vores åbne beta.',
    hero_cta: 'Prøv betaen gratis',
    hero_cta_sub: 'Ingen kreditkort. Ingen binding. Gratis i hele betaperioden',
    stats: [
      { val: '2 timer', lbl: 'sparet pr. dag', sub: 'i gennemsnit pr. bruger', color: 'indigo' },
      { val: '95%',     lbl: 'reduceret email-stress', sub: 'rapporteret af betabrugere', color: 'violet' },
      { val: '0 kr.',   lbl: 'i betaperioden', sub: 'ingen kreditkort krævet', color: 'emerald' },
    ],
    about_section: 'Din usynlige assistent',
    about_sub: 'Aura arbejder stille i baggrunden. Du mærker det ikke, men din indbakke er altid under kontrol.',
    about_cards: [
      {
        icon: Mail,
        title: 'Hvem er Aura til?',
        body: 'Freelancere, konsulenter, selvstændige og mindre virksomheder med 3-100 medarbejdere der bruger for meget tid i indbakken. Aura er bygget til dig der vil arbejde smartere uden at ofre overblikket.',
      },
      {
        icon: BrainCircuit,
        title: 'Hvad kan Aura?',
        body: 'Aura prioriterer, skriver, retter og rydder op i dine emails med AI. Den registrerer fakturaer, tracker din tid og finder skattefradrag, alt automatisk.',
      },
      {
        icon: EyeOff,
        title: 'Hvordan virker det?',
        body: 'Aura kører lokalt på din computer og har adgang til din Gmail. Den lærer dine vaner og agerer som en assistent der aldrig sover og aldrig glemmer noget.',
      },
    ],
    feat_section: 'Alt hvad du behøver',
    feat_sub: 'Syv kraftfulde AI-funktioner integreret i ét email-arbejdsflow.',
    pricing_section: 'Simpel og ærlig prissætning',
    pricing_sub: 'Prøv Aura helt gratis i betaperioden. Når vi lancerer, vælger du den plan der passer til dig.',
    pricing_beta_note: 'Priser aktiveres efter beta. Tilmeld dig waitlisten for at sikre dig de bedste priser.',
    plus_name: 'Aura Plus', plus_price: '99', plus_period: 'kr./md',
    plus_trial: '15 dages gratis prøveperiode. Ingen kreditkort',
    plus_cta: 'Kommer snart',
    plus_annual: 'eller 79 kr./md ved årlig betaling',
    plus_features: [
      'Smart Indbakke med AI-prioritering',
      'Svar med Aura. 4 intelligente toner',
      'Korrektur og sprogtjek i realtid',
      'Smart Clean. Afmeld abonnementer med ét klik',
      'Smart Faktura. Udtræk data automatisk',
      'Aura Tax Specialist. Find dine fradrag',
      'Auto Time Tracker. Ingen manuel registrering',
      'Op til 3 email-konti',
    ],
    ent_name: 'Aura Enterprise', ent_price: '60', ent_period: 'kr./md pr. medarbejder',
    ent_min: 'Minimum 3 medarbejdere',
    ent_cta: 'Kommer snart',
    ent_features: [
      'Alt i Aura Plus',
      'Team admin og brugeradministration',
      'Prioriteret support (under 4 timers responstid)',
      'Dedikeret onboarding og opsætning',
      'SSO og avanceret sikkerhedsstyring',
      'Mængderabat ved 10+ medarbejdere',
      'Dedikeret Account Manager',
      'SLA-garanti og driftsstatus',
    ],
    cta_section: 'Vær med til at bygge Aura',
    cta_sub: 'Vi er i åben beta og dit input er uvurderligt. Tilmeld dig waitlisten, prøv Aura gratis og send os din feedback, så bygger vi Aura sammen.',
    cta_btn: 'Tilmeld dig waitlisten',
    cta_sub2: 'Gratis i hele betaperioden. Ingen kreditkort. Kun til Windows',
    faq_title: 'Ofte stilte spørgsmål',
    faqs: [
      { q: 'Hvad er Aura beta?', a: 'Aura er pt. i åben beta. Det betyder at alle kan downloade og bruge appen helt gratis, mens vi fortsat udvikler og forbedrer den. Dit feedback hjælper os med at prioritere de rigtige funktioner.' },
      { q: 'Kræver betaen et kreditkort?', a: 'Nej. Du kan downloade og bruge Aura betaen 100% gratis. Ingen kortoplysninger, ingen binding, ingen skjulte gebyrer.' },
      { q: 'Hvornår kommer betalingsplanerne?', a: 'Vi lancerer Aura Plus og Aura Enterprise når vi er ude af beta. Som betabruger får du altid de bedste priser og tidlig adgang til nye funktioner.' },
      { q: 'Hvilke email-tjenester understøtter Aura?', a: 'Aura understøtter Gmail og Google Workspace. Support for Outlook og Microsoft 365 er under udvikling.' },
      { q: 'Er mine emails sikre?', a: 'Ja. Aura kører som en desktop-app og dine emails forlader aldrig din computer. Al AI-behandling sker lokalt eller via krypterede API-kald.' },
    ],
    privacy_href: '/privacy', terms_href: '/terms',
    footer_tagline: 'AI-email til det moderne arbejdsliv.',
  },
  en: {
    nav_features: 'Features', nav_about: 'About', nav_pricing: 'Pricing', nav_cta: 'Try beta',
    beta_banner: 'Aura is in public beta. Free for everyone. Help us shape the future of email',
    hero_badge: 'Open beta. Free now',
    hero_h1a: 'Your AI email assistant',
    hero_h1b: 'is ready for you',
    hero_sub: 'Aura sorts, writes and optimises your emails with AI. Save hours every week and help shape the future of email in our open beta.',
    hero_cta: 'Try the beta for free',
    hero_cta_sub: 'No credit card. No commitment. Free during the entire beta',
    stats: [
      { val: '2 hours', lbl: 'saved per day', sub: 'on average per user', color: 'indigo' },
      { val: '95%',     lbl: 'reduction in email stress', sub: 'reported by beta users', color: 'violet' },
      { val: '0 kr.',   lbl: 'during beta', sub: 'no credit card required', color: 'emerald' },
    ],
    about_section: 'Your invisible assistant',
    about_sub: 'Aura works quietly in the background. You barely notice it, but your inbox is always under control.',
    about_cards: [
      {
        icon: Mail,
        title: 'Who is Aura for?',
        body: 'Freelancers, consultants, self-employed people and smaller businesses with 3-100 employees who spend too much time in their inbox. Aura is built for those who want to work smarter without losing the overview.',
      },
      {
        icon: BrainCircuit,
        title: 'What can Aura do?',
        body: 'Aura prioritises, writes, corrects and cleans up your emails with AI. It detects invoices, tracks your time and finds tax deductions, all automatically.',
      },
      {
        icon: EyeOff,
        title: 'How does it work?',
        body: 'Aura runs locally on your computer and connects to your Gmail. It learns your habits and acts as an assistant that never sleeps and never forgets anything.',
      },
    ],
    feat_section: 'Everything you need',
    feat_sub: 'Seven powerful AI features integrated into one email workflow.',
    pricing_section: 'Simple, honest pricing',
    pricing_sub: 'Try Aura completely free during the beta. When we launch, pick the plan that fits you.',
    pricing_beta_note: 'Pricing activates after beta. Join the waitlist to secure the best prices.',
    plus_name: 'Aura Plus', plus_price: '99', plus_period: 'kr./mo',
    plus_trial: '15-day free trial. No credit card required',
    plus_cta: 'Coming soon',
    plus_annual: 'or 79 kr./mo billed annually',
    plus_features: [
      'Smart Inbox with AI prioritisation',
      'Reply with Aura. 4 intelligent tones',
      'Proofreading and spell-check in real time',
      'Smart Clean. Unsubscribe with one click',
      'Smart Invoice. Extract data automatically',
      'Aura Tax Specialist. Find your deductions',
      'Auto Time Tracker. No manual logging',
      'Up to 3 email accounts',
    ],
    ent_name: 'Aura Enterprise', ent_price: '60', ent_period: 'kr./mo per user',
    ent_min: 'Minimum 3 users',
    ent_cta: 'Coming soon',
    ent_features: [
      'Everything in Aura Plus',
      'Team admin and user management',
      'Priority support (under 4 hour response)',
      'Dedicated onboarding and setup',
      'SSO and advanced security controls',
      'Volume discount for 10+ users',
      'Dedicated Account Manager',
      'SLA guarantee and status page',
    ],
    cta_section: 'Help us build Aura',
    cta_sub: "We're in open beta and your input is invaluable. Join the waitlist, try Aura for free and send us feedback. Let's build Aura together.",
    cta_btn: 'Join the waitlist',
    cta_sub2: 'Free during beta. No credit card. Windows only',
    faq_title: 'Frequently asked questions',
    faqs: [
      { q: 'What is Aura beta?', a: 'Aura is currently in open beta. Everyone can download and use the app completely free while we continue developing and improving it. Your feedback helps us prioritise the right features.' },
      { q: 'Does the beta require a credit card?', a: 'No. You can download and use the Aura beta 100% free. No card details, no commitment, no hidden fees.' },
      { q: 'When will paid plans launch?', a: 'We will launch Aura Plus and Aura Enterprise when we exit beta. Beta users always get the best prices and early access to new features.' },
      { q: 'Which email services does Aura support?', a: 'Aura supports Gmail and Google Workspace. Outlook and Microsoft 365 support is in development.' },
      { q: 'Are my emails secure?', a: 'Yes. Aura runs as a desktop app and your emails never leave your computer. All AI processing happens locally or via encrypted API calls.' },
    ],
    privacy_href: '/en/privacy', terms_href: '/en/terms',
    footer_tagline: 'AI email for the modern work life.',
  },
}

// Feature data

const FEATURES_DA = [
  { id: 'inbox',    icon: Inbox,       label: 'Smart Indbakke',    headline: 'AI sorterer mens du sover',             desc: 'Aura prioriterer alle indgående emails automatisk. Vigtige beskeder rykker op, nyhedsbreve ryger ned. Du ser kun det der kræver din opmærksomhed.',       component: SmartInbox       },
  { id: 'draft',    icon: PenLine,     label: 'Svar med Aura',     headline: 'Skriv bedre emails på sekunder',        desc: 'Vælg en tone. Professionel, Kortere, Mere venlig eller Formel. Aura genererer et færdigt udkast. Du redigerer, godkender og sender.',                   component: DraftWithAura    },
  { id: 'proof',    icon: SpellCheck,  label: 'Korrektur',         headline: 'Ingen pinlige stavefejl mere',          desc: 'Aura tjekker tone, grammatik og klarhed i dine emails i realtid og foreslår forbedringer. Du accepterer eller afviser med ét klik.',                   component: Korrektur        },
  { id: 'clean',    icon: Trash2,      label: 'Smart Clean',       headline: 'Ryd ud i abonnementer på sekunder',     desc: 'Aura finder alle nyhedsbreve og reklame-emails og afmelder dem automatisk for dig. Ét tryk og din indbakke er ren.',                                  component: SmartClean       },
  { id: 'invoice',  icon: FileText,    label: 'Smart Faktura',     headline: 'Fakturaer fra email til regnskab',      desc: 'Aura registrerer automatisk fakturaer i din indbakke og udtrækker leverandør, beløb, dato og moms. Klar til dit regnskabsprogram.',                  component: SmartInvoice     },
  { id: 'tax',      icon: ShieldCheck, label: 'Aura Tax',          headline: 'Find dine fradrag automatisk',          desc: 'Aura Tax scanner dine emails og aktivitet for skattemæssige fradrag. Hjemmekontor, telefonabonnement, software og meget mere. Spar penge du ikke vidste du havde.',  component: AuraTax          },
  { id: 'time',     icon: Clock,       label: 'Auto Time Tracker', headline: 'Timesedler uden at løfte en finger',    desc: 'Aura registrerer automatisk dit tidsforbrug per projekt baseret på dine emails og computeraktivitet. Ingen manuel indtastning nogensinde.',              component: AutoTimeTracker  },
]

const FEATURES_EN = [
  { id: 'inbox',    icon: Inbox,       label: 'Smart Inbox',       headline: 'AI sorts while you sleep',              desc: 'Aura automatically prioritises all incoming emails. Important messages move up, newsletters move down. You only see what needs your attention.',       component: SmartInbox       },
  { id: 'draft',    icon: PenLine,     label: 'Reply with Aura',   headline: 'Write better emails in seconds',        desc: 'Choose a tone. Professional, Shorter, Friendlier or Formal. Aura generates a finished draft. You edit, approve and send.',                            component: DraftWithAura    },
  { id: 'proof',    icon: SpellCheck,  label: 'Proofreading',      headline: 'No more embarrassing typos',            desc: 'Aura checks tone, grammar and clarity in your emails in real time and suggests improvements. You accept or reject with one click.',                    component: Korrektur        },
  { id: 'clean',    icon: Trash2,      label: 'Smart Clean',       headline: 'Clear subscriptions in seconds',        desc: 'Aura finds all newsletters and promotional emails and unsubscribes automatically. One tap and your inbox is clean.',                                   component: SmartClean       },
  { id: 'invoice',  icon: FileText,    label: 'Smart Invoice',     headline: 'Invoices from email to accounting',     desc: 'Aura automatically detects invoices in your inbox and extracts vendor, amount, date and VAT. Ready for your accounting software.',                   component: SmartInvoice     },
  { id: 'tax',      icon: ShieldCheck, label: 'Aura Tax',          headline: 'Find your deductions automatically',    desc: "Aura Tax scans your emails and activity for tax deductions. Home office, phone, software and much more. Save money you didn't know you had.",        component: AuraTax          },
  { id: 'time',     icon: Clock,       label: 'Auto Time Tracker', headline: 'Timesheets without lifting a finger',   desc: 'Aura automatically tracks your time per project based on your emails and computer activity. No manual entry, ever.',                                  component: AutoTimeTracker  },
]

const STAT_ICONS = [Timer, TrendingDown, BadgePercent]
const STAT_COLORS = {
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    val: 'text-indigo-600',
    icon: 'text-indigo-400',
    glow: 'shadow-[0_0_40px_rgba(99,102,241,0.12)]',
    dot: 'bg-indigo-400',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    val: 'text-violet-600',
    icon: 'text-violet-400',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.12)]',
    dot: 'bg-violet-400',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    val: 'text-emerald-600',
    icon: 'text-emerald-400',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.12)]',
    dot: 'bg-emerald-400',
  },
}

// Page

export default function Home() {
  const [lang, setLang] = useState<'da' | 'en'>('da')
  const [activeFeature, setActiveFeature] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  const c = T[lang]
  const FEATURES = lang === 'da' ? FEATURES_DA : FEATURES_EN
  const ActiveComponent = FEATURES[activeFeature].component

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased overflow-x-hidden">

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} lang={lang} />

      {/* Beta banner */}
      <AnimatePresence>
        {!bannerDismissed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-indigo-600 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 mx-auto">
                <Sparkles size={13} className="text-indigo-200 shrink-0" />
                <span className="text-[12px] text-white font-medium">{c.beta_banner}</span>
              </div>
              <button onClick={() => setBannerDismissed(true)} className="text-indigo-300 hover:text-white transition-colors shrink-0 ml-4">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Aura logo" width={32} height={32} className="rounded-xl" />
            <span className="font-bold text-[17px] tracking-tight text-slate-900">Aura</span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-full ml-0.5">BETA</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[14px] text-slate-500 hover:text-slate-900 font-medium transition-colors">{c.nav_about}</a>
            <a href="#features" className="text-[14px] text-slate-500 hover:text-slate-900 font-medium transition-colors">{c.nav_features}</a>
            <a href="#pricing" className="text-[14px] text-slate-500 hover:text-slate-900 font-medium transition-colors">{c.nav_pricing}</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-full p-0.5">
              <button
                onClick={() => setLang('da')}
                className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                  lang === 'da' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                DA
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                  lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setWaitlistOpen(true)}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold text-white overflow-hidden group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
            >
              <span className="relative z-10">{c.nav_cta}</span>
              <ArrowRight size={13} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-[100px] pointer-events-none animate-blob-drift" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-100/30 blur-[100px] pointer-events-none animate-blob-drift" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-emerald-50/40 blur-[80px] pointer-events-none animate-blob-drift" style={{ animationDelay: '6s' }} />

        <motion.div style={{ y: heroY }} className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[13px] font-semibold text-indigo-700">{c.hero_badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[64px] sm:text-[80px] font-bold tracking-tight leading-[1.05] text-slate-900 mb-6"
          >
            {c.hero_h1a}
            <br />
            <span className="text-indigo-600">{c.hero_h1b}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[18px] text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {c.hero_sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[16px] font-bold text-white shadow-glow-indigo hover:shadow-glow-violet transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
            >
              {c.hero_cta}
              <ArrowRight size={18} />
            </button>
            <p className="text-[13px] text-slate-400 font-medium">{c.hero_cta_sub}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats — redesigned impact cards */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {c.stats.map(({ val, lbl, sub, color }, i) => {
            const col = STAT_COLORS[color as keyof typeof STAT_COLORS]
            const Icon = STAT_ICONS[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative rounded-3xl border p-7 ${col.bg} ${col.border} ${col.glow} overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm`}>
                    <Icon size={18} className={col.icon} />
                  </div>
                  <span className={`w-2 h-2 rounded-full ${col.dot} opacity-60`} />
                </div>
                <div className={`text-[44px] font-black tracking-tight leading-none mb-2 ${col.val}`}>{val}</div>
                <div className="text-[15px] font-bold text-slate-800 mb-1">{lbl}</div>
                <div className="text-[12px] text-slate-500">{sub}</div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] font-bold tracking-tight text-slate-900 mb-4"
            >
              {c.about_section}
            </motion.h2>
            <p className="text-[17px] text-slate-500 max-w-xl mx-auto">{c.about_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {c.about_cards.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-3xl p-7 shadow-card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <h3 className="text-[16px] font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[42px] font-bold tracking-tight text-slate-900 mb-4"
            >
              {c.feat_section}
            </motion.h2>
            <p className="text-[17px] text-slate-500 max-w-xl mx-auto">{c.feat_sub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-2">
              {FEATURES.map((f, i) => {
                const active = activeFeature === i
                return (
                  <motion.button
                    key={f.id}
                    onClick={() => setActiveFeature(i)}
                    whileHover={{ x: active ? 0 : 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-full text-left px-6 py-5 rounded-2xl transition-all duration-200 ${
                      active
                        ? 'bg-white border border-slate-200 shadow-card'
                        : 'bg-transparent hover:bg-white/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        active ? 'bg-indigo-500 shadow-glow-indigo' : 'bg-slate-100'
                      }`}>
                        <f.icon size={18} className={active ? 'text-white' : 'text-slate-500'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[15px] font-bold ${active ? 'text-slate-900' : 'text-slate-700'}`}>{f.label}</span>
                        </div>
                        <p className={`text-[13px] leading-relaxed transition-colors ${active ? 'text-slate-600' : 'text-slate-400'}`}>
                          {active ? f.desc : f.headline}
                        </p>
                      </div>
                      {active && <ArrowRight size={16} className="text-indigo-400 mt-1 flex-shrink-0" />}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[42px] font-bold tracking-tight text-slate-900 mb-4"
            >
              {c.pricing_section}
            </motion.h2>
            <p className="text-[17px] text-slate-500 max-w-xl mx-auto">{c.pricing_sub}</p>
          </div>

          {/* Beta notice */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-12 px-4 py-3 bg-amber-50 border border-amber-100 rounded-2xl max-w-lg mx-auto"
          >
            <Lock size={13} className="text-amber-500 shrink-0" />
            <span className="text-[13px] text-amber-700 font-medium">{c.pricing_beta_note}</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

            {/* Aura Plus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-card flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-glow-indigo">
                    <Plus size={15} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[18px] font-bold text-slate-900">{c.plus_name}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[48px] font-bold tracking-tight text-slate-900">{c.plus_price}</span>
                  <span className="text-[15px] text-slate-500 font-medium">{c.plus_period}</span>
                </div>
                <p className="text-[13px] text-slate-400">{c.plus_annual}</p>
              </div>

              <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl mb-6">
                <Check size={14} className="text-emerald-500 shrink-0" />
                <span className="text-[13px] font-semibold text-emerald-700">{c.plus_trial}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {c.plus_features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-indigo-500" />
                    </span>
                    <span className="text-[14px] text-slate-600">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[15px] font-bold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed opacity-70"
              >
                <Lock size={14} />
                {c.plus_cta}
              </button>
            </motion.div>

            {/* Aura Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Building2 size={15} className="text-white" />
                  </div>
                  <span className="text-[18px] font-bold text-white">{c.ent_name}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[48px] font-bold tracking-tight text-white">{c.ent_price}</span>
                  <span className="text-[15px] text-slate-400 font-medium">{c.ent_period}</span>
                </div>
                <p className="text-[13px] text-slate-400">{c.ent_min}</p>
              </div>

              <div className="relative flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl mb-6">
                <Users size={14} className="text-violet-400 shrink-0" />
                <span className="text-[13px] font-semibold text-slate-300">
                  {lang === 'da' ? 'Mængderabat fra 10+ medarbejdere' : 'Volume discount from 10+ users'}
                </span>
              </div>

              <ul className="relative space-y-3 mb-8 flex-1">
                {c.ent_features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-violet-400" />
                    </span>
                    <span className="text-[14px] text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="relative w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[15px] font-bold text-slate-500 bg-white/5 border border-white/10 cursor-not-allowed opacity-70"
              >
                <Lock size={14} />
                {c.ent_cta}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a78bfa 0%, transparent 40%)'
        }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
              <Sparkles size={13} className="text-indigo-200" />
              <span className="text-[13px] font-semibold text-white">
                {lang === 'da' ? 'Åben beta. Dit input former Aura' : 'Open beta. Your input shapes Aura'}
              </span>
            </div>
            <h2 className="text-[40px] font-bold text-white tracking-tight mb-6">{c.cta_section}</h2>
            <p className="text-[17px] text-indigo-100 leading-relaxed mb-10">{c.cta_sub}</p>
            <button
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[16px] font-bold text-indigo-700 bg-white hover:bg-indigo-50 transition-all hover:scale-[1.02] shadow-lg"
            >
              {c.cta_btn}
              <ArrowRight size={18} />
            </button>
            <p className="text-[13px] text-indigo-200 mt-5">{c.cta_sub2}</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight mb-12 text-center">{c.faq_title}</h2>
          <div className="space-y-3">
            {c.faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50/60 transition-colors"
                >
                  <span className="text-[15px] font-semibold text-slate-800 pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-slate-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[14px] text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50/50 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Aura logo" width={24} height={24} className="rounded-lg" />
            <span className="font-bold text-[15px] text-slate-900">Aura</span>
            <span className="text-[13px] text-slate-400 ml-2">{c.footer_tagline}</span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-slate-400">
            <a href={c.privacy_href} className="hover:text-slate-600 transition-colors">{lang === 'da' ? 'Privatlivspolitik' : 'Privacy Policy'}</a>
            <a href={c.terms_href} className="hover:text-slate-600 transition-colors">{lang === 'da' ? 'Vilkår' : 'Terms'}</a>
            <a href="mailto:zejlund@outlook.com" className="hover:text-slate-600 transition-colors">zejlund@outlook.com</a>
          </div>
          <p className="text-[12px] text-slate-400">2026 Aura. {lang === 'da' ? 'Fremtiden for email er her' : 'The future of email is here'}</p>
        </div>
      </footer>
    </div>
  )
}