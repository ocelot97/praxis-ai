"use client";

import { Section } from "@/components/ui/section";
import { useLocale } from "@/lib/i18n";

export default function TermsPage() {
  const { locale } = useLocale();

  return (
    <main>
      <Section variant="cream">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-charcoal mb-8">
            {locale === "it" ? "Termini di Servizio" : "Terms of Service"}
          </h1>
          <div className="prose prose-lg font-sans text-mid space-y-6">
            {locale === "it" ? (
              <>
                <p>Ultimo aggiornamento: Febbraio 2026</p>
                <h2 className="text-2xl font-semibold text-charcoal">Accettazione dei termini</h2>
                <p>
                  Utilizzando il sito web di Praxis AI, accetti di essere vincolato da questi termini
                  di servizio.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Servizi</h2>
                <p>
                  Praxis AI fornisce servizi di consulenza e sviluppo AI. I dettagli specifici del
                  servizio vengono definiti in accordi individuali con i clienti.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Proprietà intellettuale</h2>
                <p>
                  Tutti i contenuti del sito, inclusi testi, grafica e codice, sono di proprietà di
                  Praxis AI e protetti dalle leggi sul copyright.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Limitazione di responsabilità</h2>
                <p>
                  Praxis AI non sarà responsabile per danni indiretti derivanti dall&apos;uso dei nostri
                  servizi o del sito web.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Contatti</h2>
                <p>
                  Per domande sui termini di servizio, contattaci tramite la pagina{" "}
                  <a href="/contact" className="text-terracotta hover:underline">Contatti</a>.
                </p>
              </>
            ) : (
              <>
                <p>Last updated: February 2026</p>
                <h2 className="text-2xl font-semibold text-charcoal">Acceptance of Terms</h2>
                <p>
                  By using the Praxis AI website, you agree to be bound by these terms of service.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Services</h2>
                <p>
                  Praxis AI provides AI consulting and development services. Specific service details
                  are defined in individual client agreements.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Intellectual Property</h2>
                <p>
                  All site content, including text, graphics, and code, is owned by Praxis AI and
                  protected by copyright laws.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Limitation of Liability</h2>
                <p>
                  Praxis AI shall not be liable for any indirect damages arising from the use of our
                  services or website.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Contact</h2>
                <p>
                  For questions about these terms, reach out via our{" "}
                  <a href="/contact" className="text-terracotta hover:underline">Contact</a> page.
                </p>
              </>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
