"use client";

import { Section } from "@/components/ui/section";
import { useLocale } from "@/lib/i18n";

export default function PrivacyPage() {
  const { locale } = useLocale();

  return (
    <main>
      <Section variant="cream">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-charcoal mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-lg font-sans text-mid space-y-6">
            {locale === "it" ? (
              <>
                <p>Ultimo aggiornamento: Febbraio 2026</p>
                <h2 className="text-2xl font-semibold text-charcoal">Raccolta dei dati</h2>
                <p>
                  Raccogliamo solo le informazioni che ci fornisci direttamente tramite il modulo di contatto:
                  nome, email, azienda e messaggio.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Utilizzo dei dati</h2>
                <p>
                  Utilizziamo i tuoi dati esclusivamente per rispondere alle tue richieste e fornirti
                  informazioni sui nostri servizi.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Conservazione</h2>
                <p>
                  I dati vengono conservati in modo sicuro tramite Supabase e non vengono condivisi con
                  terze parti.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Contatti</h2>
                <p>
                  Per qualsiasi domanda sulla privacy, contattaci tramite la pagina{" "}
                  <a href="/contact" className="text-terracotta hover:underline">Contatti</a>.
                </p>
              </>
            ) : (
              <>
                <p>Last updated: February 2026</p>
                <h2 className="text-2xl font-semibold text-charcoal">Data Collection</h2>
                <p>
                  We only collect information that you provide directly through our contact form:
                  name, email, company, and message.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Use of Data</h2>
                <p>
                  We use your data exclusively to respond to your inquiries and provide information
                  about our services.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Storage</h2>
                <p>
                  Data is stored securely via Supabase and is not shared with third parties.
                </p>
                <h2 className="text-2xl font-semibold text-charcoal">Contact</h2>
                <p>
                  For any privacy-related questions, reach out via our{" "}
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
