import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Praxis AI",
  description:
    "Get in touch with Praxis AI. Tell us about your project and we'll get back to you within 24 hours.",
  openGraph: {
    title: "Contact Us - Praxis AI",
    description:
      "Get in touch with Praxis AI to discuss your AI project.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
