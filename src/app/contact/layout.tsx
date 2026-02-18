import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contattaci - Praxis AI",
  description:
    "Contatta Praxis AI per discutere del tuo progetto con studi professionali. Ti risponderemo entro 24 ore.",
  openGraph: {
    title: "Contattaci - Praxis AI",
    description:
      "Contatta Praxis AI per discutere del tuo progetto di AI con studi professionali.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
