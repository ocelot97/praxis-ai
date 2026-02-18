import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROFESSION_SLUGS } from "@/lib/professions";
import ProfessionPage from "./profession-page";

const professionMeta: Record<string, { title: string; description: string }> = {
  avvocati: {
    title: "AI per Avvocati - Praxis AI",
    description:
      "Soluzioni di intelligenza artificiale per studi legali. Analisi contrattuale, ricerca giurisprudenziale e gestione scadenze processuali.",
  },
  commercialisti: {
    title: "AI per Commercialisti - Praxis AI",
    description:
      "Soluzioni AI per studi commercialisti. Elaborazione fatture, automazione fiscale e comunicazione clienti.",
  },
  "consulenti-del-lavoro": {
    title: "AI per Consulenti del Lavoro - Praxis AI",
    description:
      "Soluzioni AI per consulenti del lavoro. Automazione buste paga, conformita normativa e comunicazioni amministrative.",
  },
  odontoiatri: {
    title: "AI per Odontoiatri - Praxis AI",
    description:
      "Soluzioni AI per studi odontoiatrici. Gestione appuntamenti, documentazione clinica e comunicazione pazienti.",
  },
  "architetti-ingegneri": {
    title: "AI per Architetti e Ingegneri - Praxis AI",
    description:
      "Soluzioni AI per studi di architettura e ingegneria. Documentazione progettuale, pratiche edilizie e gestione commesse.",
  },
  geometri: {
    title: "AI per Geometri - Praxis AI",
    description:
      "Soluzioni AI per geometri. Automazione catastale, perizie e pratiche presso Agenzia del Territorio.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return professionMeta[slug] ?? { title: "Praxis AI" };
}

export default async function ProfessionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PROFESSION_SLUGS.includes(slug)) {
    notFound();
  }
  return <ProfessionPage slug={slug} />;
}
