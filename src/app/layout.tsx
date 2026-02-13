import type { Metadata } from "next";
import { inter, caveat } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
