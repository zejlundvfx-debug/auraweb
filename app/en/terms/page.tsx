import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Aura',
  description: "Aura's terms and conditions for use of the service.",
}

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-white/30">Last updated: April 3, 2026</p>
        </div>

        <div className="space-y-8 text-sm text-white/60 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using Aura, you agree to these terms. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">2. Scope of the Service</h2>
            <p>
              Aura is a desktop application for Mac and Windows that connects to your Gmail and/or Outlook account via OAuth and offers AI-assisted email management features.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">3. Account and Access</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>You must be at least 16 years old to create an account.</li>
              <li>You are responsible for the security of your access and login credentials.</li>
              <li>One license is valid per user. Account sharing is not permitted.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">4. Free Trial and Payment</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Aura offers a 15-day free trial of all Pro features without a credit card.</li>
              <li>The Pro plan costs 99 DKK/month or 799 DKK/year and renews automatically.</li>
              <li>You may cancel your subscription at any time. Payments for an ongoing period are non-refundable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">5. Permitted and Prohibited Actions</h2>
            <p>You may not:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Use Aura for illegal or harmful purposes</li>
              <li>Attempt to reverse-engineer, copy, or distribute the Aura software</li>
              <li>Overload our API infrastructure with automated scripts</li>
              <li>Resell access to the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">6. Intellectual Property</h2>
            <p>
              All content, code, and design in Aura belongs to the developer. You are granted a limited, non-exclusive license for personal use.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">7. Disclaimer of Liability</h2>
            <p>
              Aura is provided "as is". We do not guarantee 100% uptime and are not liable for losses arising from use of the service, including errors in AI-generated content.
            </p>
            <p className="mt-2">
              You are solely responsible for reviewing and approving all emails sent via Aura before they are dispatched.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms. Material changes will be communicated via email or in-app notification with at least 14 days' notice.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">9. Termination</h2>
            <p>
              We may suspend or close your account for gross misuse of the service. You may delete your account at any time via settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">10. Governing Law and Jurisdiction</h2>
            <p>
              These terms are governed by Danish law. Any disputes shall be resolved by the Danish courts.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">11. Contact</h2>
            <p>
              Questions about these terms: <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>
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