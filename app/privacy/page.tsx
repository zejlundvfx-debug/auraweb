import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Privatlivspolitik — Aura',
  description: 'Auras privatlivspolitik og behandling af persondata.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 mb-8 text-white/40 hover:text-white/70 transition-colors text-sm">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            Aura
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Privatlivspolitik</h1>
          <p className="text-sm text-white/30">Sidst opdateret: 3. april 2026</p>
        </div>

        <div className="space-y-8 text-sm text-white/60 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">1. Dataansvarlig</h2>
            <p>
              Aura er udviklet og drives af Adam (herefter &quot;vi&quot;, &quot;os&quot; eller &quot;Aura&quot;).
              Kontakt: <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">2. Hvilke data indsamler vi?</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>E-mailadresse og navn (ved oprettelse af konto)</li>
              <li>OAuth-tokens til Gmail og/eller Outlook (gemmes krypteret lokalt på din enhed)</li>
              <li>Anonymiseret brugsstatistik (antal AI-handlinger, fejlrapporter) — kun med dit samtykke</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white/70">Vi gemmer ikke indholdet af dine emails på vores servere.</strong> Al emailbehandling sker via de officielle Gmail/Outlook API&apos;er og din lokale enhed.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">3. Formål med databehandling</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>At levere Auras kernefunktioner (AI-svar, sortering, oprydning)</li>
              <li>At forbedre produktet via anonymiserede fejlrapporter</li>
              <li>At sende vigtige servicebeskeder (ikke reklame uden samtykke)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">4. Retsgrundlag (GDPR)</h2>
            <p>
              Vi behandler dine data på baggrund af dit samtykke (GDPR art. 6, stk. 1, litra a) og opfyldelse af aftale (litra b), når du bruger Auras tjenester.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">5. Deling af data</h2>
            <p>Vi deler ikke dine personoplysninger med tredjepart, undtagen:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Google LLC og Microsoft Corporation (via OAuth, kun til autentificering)</li>
              <li>AI-udbyder til tekstgenerering — kun de tekstbidder du aktivt sender til AI-analyse. Ingen hele emails sendes uden din handling.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">6. Opbevaring</h2>
            <p>
              OAuth-tokens slettes automatisk, når du afbryder forbindelsen til din emailkonto. Din konto kan slettes til enhver tid via indstillinger, og alle data fjernes inden for 30 dage.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">7. Dine rettigheder</h2>
            <p>Du har ret til at:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Få indsigt i dine data</li>
              <li>Berigtigelse af ukorrekte oplysninger</li>
              <li>Sletning (&quot;retten til at blive glemt&quot;)</li>
              <li>Dataportabilitet</li>
              <li>Tilbagekalde samtykke til enhver tid</li>
            </ul>
            <p className="mt-3">
              Kontakt: <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">8. Cookies</h2>
            <p>
              Aura-appen bruger ikke cookies. Denne hjemmeside (auraemail.app) bruger udelukkende teknisk nødvendige cookies til sessionshåndtering.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">9. Kontakt og klager</h2>
            <p>
              Spørgsmål? Skriv til <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>.
              Du kan også indgive klage til <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">Datatilsynet</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <Link href="/" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            ← Tilbage til forsiden
          </Link>
        </div>
      </div>
    </main>
  )
}