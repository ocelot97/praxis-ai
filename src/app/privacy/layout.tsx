import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Praxis AI",
  description: "Privacy policy for Praxis AI website and services.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
