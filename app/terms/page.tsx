import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Vilkår for brug — Aura',
  description: 'Auras vilkår og betingelser for brug af tjenesten.',
}

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Vilkår for brug</h1>
          <p className="text-sm text-white/30">Sidst opdateret: 3. april 2026</p>
        </div>

        <div className="space-y-8 text-sm text-white/60 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">1. Accept af vilkår</h2>
            <p>
              Ved at downloade, installere eller bruge Aura accepterer du disse vilkår. Hvis du ikke accepterer, bedes du ikke bruge tjenesten.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">2. Tjenestens omfang</h2>
            <p>
              Aura er en desktop-applikation til Mac og Windows, der via OAuth forbinder til din Gmail- og/eller Outlook-konto og tilbyder AI-assisterede funktioner til emailhåndtering.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">3. Konto og adgang</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Du skal være mindst 16 år for at oprette en konto.</li>
              <li>Du er ansvarlig for sikkerheden af din adgang og dine loginoplysninger.</li>
              <li>Én licens gælder pr. bruger. Deling af konti er ikke tilladt.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">4. Gratis prøveperiode og betaling</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Aura tilbyder 15 dages gratis adgang til alle Pro-funktioner uden kreditkort.</li>
              <li>Pro-planen koster 99 kr/md eller 799 kr/år og fornyes automatisk.</li>
              <li>Du kan opsige dit abonnement når som helst. Betaling for igangværende periode refunderes ikke.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">5. Tilladte og forbudte handlinger</h2>
            <p>Du må ikke:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li>Bruge Aura til ulovlige eller skadelige formål</li>
              <li>Forsøge at reverse-engineere, kopiere eller distribuere Aura-softwaren</li>
              <li>Overbelaste vores API-infrastruktur med automatiserede scripts</li>
              <li>Videresælge adgang til tjenesten</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">6. Immaterielle rettigheder</h2>
            <p>
              Alt indhold, kode og design i Aura tilhører udvikleren. Du tildeles en begrænset, ikke-eksklusiv licens til personlig brug.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">7. Ansvarsfraskrivelse</h2>
            <p>
              Aura leveres &quot;som den er&quot;. Vi garanterer ikke 100% driftstid og er ikke ansvarlige for tab opstået som følge af brug af tjenesten, herunder fejl i AI-genereret indhold.
            </p>
            <p className="mt-2">
              Du er selv ansvarlig for at gennemlæse og godkende alle emails sendt via Aura, inden de afsendes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">8. Ændringer i vilkår</h2>
            <p>
              Vi forbeholder os retten til at ændre disse vilkår. Væsentlige ændringer kommunikeres via email eller in-app notifikation med mindst 14 dages varsel.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">9. Ophør</h2>
            <p>
              Vi kan suspendere eller lukke din konto ved grov misbrug af tjenesten. Du kan til enhver tid slette din konto via indstillinger.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">10. Lovvalg og værneting</h2>
            <p>
              Disse vilkår er underlagt dansk ret. Eventuelle tvister afgøres ved de danske domstole.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white/80 mb-3">11. Kontakt</h2>
            <p>
              Spørgsmål til disse vilkår: <a href="mailto:zejlund@outlook.com" className="text-violet-400 hover:underline">zejlund@outlook.com</a>
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