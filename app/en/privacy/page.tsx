import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Aura',
  description: "Aura's privacy policy and personal data processing.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link href="/en" className="flex items-center gap-2 mb-8 text-white/40 hover:text-white/70 transition-colors text-sm">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            Aura
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-white/30">Last updated: April 3, 2026</p>
        </div>

        <div className="space-y-8 text-sm text-white/60 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">1. Data Controller</h2>
            <p>
              Aura is developed and operated by Adam (hereinafter "we", "us" or "Aura").
              Contact: <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">2. What data do we collect?</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Email address and name (upon account creation)</li>
              <li>OAuth tokens for Gmail and/or Outlook (stored encrypted locally on your device)</li>
              <li>Anonymized usage statistics (number of AI actions, error reports) — only with your consent</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white/70">We do not store the content of your emails on our servers.</strong> All email processing occurs via the official Gmail/Outlook APIs and your local device.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">3. Purpose of data processing</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>To deliver Aura's core features (AI replies, sorting, cleanup)</li>
              <li>To improve the product via anonymized error reports</li>
              <li>To send important service messages (no marketing without consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">4. Legal basis (GDPR)</h2>
            <p>
              We process your data based on your consent (GDPR Article 6(1)(a)) and the performance of a contract (Article 6(1)(b)) when you use Aura's services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">5. Data sharing</h2>
            <p>We do not share your personal information with third parties, except:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Google LLC and Microsoft Corporation (via OAuth, for authentication only)</li>
              <li>AI provider for text generation — only the text excerpts you actively send for AI analysis. No entire emails are sent without your action.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">6. Data retention</h2>
            <p>
              OAuth tokens are automatically deleted when you disconnect your email account. Your account can be deleted at any time via settings, and all data is removed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">7. Your rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Access your data</li>
              <li>Rectification of inaccurate information</li>
              <li>Erasure ("the right to be forgotten")</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-3">
              Contact: <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">8. Cookies</h2>
            <p>
              The Aura app does not use cookies. This website (auraemail.app) uses exclusively technically necessary cookies for session management.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">9. Contact and complaints</h2>
            <p>
              Questions? Write to <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>.
              You may also file a complaint with <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">Datatilsynet</a> (the Danish Data Protection Agency).
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <Link href="/en" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  )
}