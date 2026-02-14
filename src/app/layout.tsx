import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { inter, caveat } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praxis AI - Transform Your Business with Intelligent AI",
  description:
    "Expert AI consulting and development services. From strategy to implementation, we transform businesses through intelligent automation, custom AI solutions, and seamless integration.",
  keywords: [
    "AI consulting",
    "artificial intelligence",
    "machine learning",
    "AI development",
    "AI integration",
    "business automation",
  ],
  authors: [{ name: "Praxis AI" }],
  openGraph: {
    title: "Praxis AI - Transform Your Business with Intelligent AI",
    description:
      "Expert AI consulting and development services. Transform your business with intelligent automation and custom AI solutions.",
    type: "website",
    siteName: "Praxis AI",
  },
  twitter: {
    card: "summary",
    title: "Praxis AI - Transform Your Business with Intelligent AI",
    description:
      "Expert AI consulting and development services. Transform your business with intelligent automation and custom AI solutions.",
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
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-charcoal">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
