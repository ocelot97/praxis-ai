import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Praxis AI",
  description: "Terms of service for Praxis AI website and services.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
