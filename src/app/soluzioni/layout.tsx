import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluzioni AI per Studi Professionali - Praxis AI",
  description: "Soluzioni di intelligenza artificiale per avvocati, commercialisti, consulenti del lavoro, dentisti, architetti e geometri.",
};

export default function SoluzioniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
