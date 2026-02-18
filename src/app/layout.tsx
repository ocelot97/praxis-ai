import type { Metadata } from "next";
import { inter, caveat } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleProvider } from "@/lib/i18n";
import { ProfilingProvider } from "@/lib/profiling-context";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praxis AI - Intelligenza Artificiale per Studi Professionali",
  description:
    "Soluzioni AI per studi professionali italiani. Automazione documentale, gestione clienti e ottimizzazione dei processi per avvocati, commercialisti, dentisti, architetti e altri professionisti.",
  keywords: [
    "AI studi professionali",
    "intelligenza artificiale avvocati",
    "automazione commercialisti",
    "AI dentisti",
    "AI architetti",
    "automazione studi legali",
    "gestione documentale AI",
  ],
  authors: [{ name: "Praxis AI" }],
  openGraph: {
    title: "Praxis AI - Intelligenza Artificiale per Studi Professionali",
    description:
      "Soluzioni AI per studi professionali italiani. Automazione documentale, gestione clienti e ottimizzazione dei processi per avvocati, commercialisti, dentisti, architetti e altri professionisti.",
    type: "website",
    siteName: "Praxis AI",
  },
  twitter: {
    card: "summary",
    title: "Praxis AI - Intelligenza Artificiale per Studi Professionali",
    description:
      "Soluzioni AI per studi professionali italiani. Automazione documentale, gestione clienti e ottimizzazione dei processi per avvocati, commercialisti, dentisti, architetti e altri professionisti.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${caveat.variable}`}>
      <body>
        <LocaleProvider>
          <ProfilingProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-navy">
              Skip to content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </ProfilingProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
